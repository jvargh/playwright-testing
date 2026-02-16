
import Router from 'next/router';

import * as TYPES from './types';
import localAPI from 'services/localAPI';
import LINKS from 'utils/constants/links';

const getGenres = () => async dispatch => {
  try {
    const response = await localAPI.get('/genres');
    dispatch({
      type: TYPES.FETCH_GENRES,
      payload: response.data
    });
  } catch (error) {
    console.log('[getGenres] error => ', error);
    dispatch({type: TYPES.INSERT_ERROR, payload: error.response});
    Router.push(LINKS.ERROR.HREF);
  }
};

export default getGenres;
