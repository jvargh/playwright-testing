import Router from 'next/router';

import * as TYPES from './types';
import localAPI from 'services/localAPI';
import LINKS from 'utils/constants/links';

const getGenreMovies = (genreId, page, sort) => async (
  dispatch,
  getState
) => {
  const { selectedMenuItemName } = getState().general;
  if (!selectedMenuItemName) {
    return;
  }
  try {
    dispatch({type: TYPES.SET_MOVIES_LOADING});
    const response = await localAPI.get('/movies/discover', {
      params: {
        with_genres: genreId,
        page,
        sort_by: sort
      }
    });
    await dispatch({
      type: TYPES.FETCH_GENRE_MOVIES,
      payload: response.data
    });
    dispatch({type: TYPES.UNSET_MOVIES_LOADING});
  } catch (error) {
    console.log('[getGenreMovies] error => ', error);
    dispatch({type: TYPES.INSERT_ERROR, payload: error.response});
    Router.push(LINKS.ERROR.HREF);
  }
};

export default getGenreMovies;
