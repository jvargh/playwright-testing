import Router from 'next/router';

import * as TYPES from './types';
import localAPI from 'services/localAPI';
import LINKS from 'utils/constants/links';

const getCredits = movieId => async dispatch => {
  try {
    const response = await localAPI.get(`/movies/${movieId}/credits`);
    dispatch({
      type: TYPES.FETCH_CREDITS,
      payload: response.data.cast
    });
  } catch (error) {
    console.log('[getCredits] error => ', error);
    dispatch({type: TYPES.INSERT_ERROR, payload: error.response});
    Router.push(LINKS.ERROR.HREF);
  }
};

export default getCredits;
