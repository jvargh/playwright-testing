
import Router from 'next/router';

import * as TYPES from './types';
import localAPI from 'services/localAPI';
import getCredits from './getCredits';
import LINKS from 'utils/constants/links';

const getMovie = id => async dispatch => {
  try {
    dispatch({type: TYPES.SET_MOVIE_LOADING});
    const [response] = await Promise.all([
      localAPI.get(`/movies/${id}`),
      dispatch(getCredits(id))
    ]);
    await dispatch({
      type: TYPES.FETCH_MOVIE,
      payload: response.data
    });
    dispatch({type: TYPES.UNSET_MOVIE_LOADING});
  } catch (error) {
    console.log('[getMovie] error => ', error);
    dispatch({type: TYPES.INSERT_ERROR, payload: error.response});
    Router.push(LINKS.ERROR.HREF);
  }
};

export default getMovie;
