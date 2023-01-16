import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';
import store from '../../store';
class Movies extends Component {
    state = {
        movies: []
    }
    componentDidMount() {

        store.subscribe(() => {
            const stateStore = store.getState();
            this.setState({ movies: stateStore.movies });
        })
    }
    render() {
        if (!this.state.movies) {
            return null;
        }
        return (
            <ul className="movies">
                {this.state.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} />
                    </li>
                ))}
            </ul>
        );
    }
}

export default Movies;