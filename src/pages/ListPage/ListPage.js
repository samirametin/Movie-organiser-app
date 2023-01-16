import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        listName: "",
        link: "https://www.imdb.com/title/",
        movies: []
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
            .then(response => response.json())
            .then(response => {
                this.setState({ listName: response.title })
                response.movies.forEach(movieID => {
                    fetch(`http://www.omdbapi.com/?i=${movieID.imdbID}&apikey=7249d26b`)
                        .then(response => response.json())
                        .then(response => {
                            this.setState({ movies: [...this.state.movies, response] })
                        })
                })
            })
    }
    render() {
        return (
            <div className="list-page">
                <h1 className="list-page__title">{this.state.listName}</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href={this.state.link + item.imdbID} target="_blank" rel="noreferrer"  >{item.Title} ({item.Year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>

        );
    }
}

export default ListPage;