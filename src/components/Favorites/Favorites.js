import React, { Component } from 'react';
import './Favorites.css';
import store from '../../store';
import { Link } from 'react-router-dom';
class Favorites extends Component {
    state = {
        title: 'Новый список',
        movies: [],
        value: "",
        count: 0,
        show: false,
        id: ""
    }
    handleValue = (e) => {
        this.setState({ value: e.target.value })
    }
    removeMovie(imdbID) {
        store.dispatch({
            type: "REMOVE_MOVIE_FROM_FAVORITE_LIST",
            payload: {
                imdbID: imdbID,
            }
        })
    }
    handleClick = (e) => {
        this.setState({ show: true });
        e.target.style.display = "none";
        const data = {
            "title": this.state.value,
            "movies": this.state.movies
        };
        fetch(`https://acb-api.algoritmika.org/api/movies/list `, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then((data) => this.setState({ id: data.id }))

    }
    componentDidMount() {
        store.subscribe(() => {
            const storeState = store.getState();
            this.setState({ movies: storeState.favoriteList, count: storeState.count })

        })

    }
    render() {
        return (
            <div className="favorites">
                <input disabled={this.state.show} onChange={this.handleValue} value={this.state.value} placeholder="Введите название списка" className="favorites__name" />
                <ul className="favorites__list">
                    {this.state.movies.map((item) =>

                    (<li key={item.imdbID} className="favorites__list-item" >{item.Title} ({item.Year})
                        <button onClick={() => this.removeMovie(item.imdbID)} disabled={this.state.show}>X</button>
                    </li>)


                    )}

                </ul>
                {!this.state.show ? (<button type="button" onClick={this.handleClick} disabled={this.state.value === "" || this.state.count <= 0} className="favorites__save" >Сохранить список</button>) : (<Link to={"/list/" + this.state.id} >Перейти к списку</Link>)
                }
            </div>
        );
    }
}

export default Favorites;