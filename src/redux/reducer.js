/* eslint-disable default-case */


const initialState = {
    movies: [],
    favoriteList: [],
    count: ""
}
let count = 0;

export default function reducer(state = initialState, action) {
    // eslint-disable-next-line default-case

    switch (action.type) {
        case "SEARCH_MOVIE":
            return {
                ...state,
                movies: action.payload.movies

            };
        case "ADD_TO_FAVORITE_LIST":
            let clickedMovie = state.movies.find(movie => movie.imdbID === action.payload.imdbID);
            if (!state.favoriteList.includes(clickedMovie)) {
                const newList = [...state.favoriteList, clickedMovie];
                count++
                return {
                    ...state,
                    favoriteList: newList,
                    count: count
                }
            };
            break;
        case "REMOVE_MOVIE_FROM_FAVORITE_LIST":

            let newFavoriteList = state.favoriteList.filter(movie => movie.imdbID !== action.payload.imdbID)
            count--
            return {
                ...state,
                favoriteList: newFavoriteList,
                count: count
            }


    }
    return state;
}
