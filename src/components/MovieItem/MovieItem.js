import React, { Component } from 'react';
import store from '../../store';

import './MovieItem.css';


class MovieItem extends Component {
    addToCard(imdbID) {
        store.dispatch({
            type: "ADD_TO_FAVORITE_LIST",
            payload: {
                imdbID: imdbID
            }
        })
    }


    render() {
        const { Title, Year, Poster, imdbID } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button onClick={() => this.addToCard(imdbID)} type="button" className="movie-item__add-button">Сохранить список</button>
                </div>
            </article>
        );
    }
}

export default MovieItem;