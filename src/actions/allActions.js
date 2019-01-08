import fetch from 'cross-fetch';

export const REQUEST_SEARCH = 'Request_Search';
export const RECEIVE_GIFS = "Receive_Gifs";
export const RECEIVE_GIFS_ERROR = "Receive_Gifs_error";
export const DO_SEARCH = 'Do_Search';

export function searchRequestGiphy() {
  return {
    type: REQUEST_SEARCH,
    message: "Looking for Gifs..."
  }
}

export function receiveGifs(data){
  const gifs = (data && data.data) || [];
  return {
    type: RECEIVE_GIFS,
    lastRequestTimestamp: new Date().getTime(),
    pagination:data.pagination,
    gifs:gifs
  }
}

export function receiveGifsError(error,st){
  return {
    type: RECEIVE_GIFS_ERROR,
    message: "Couldn't receive Gifs anymore,"
  }
}

export function searchGiphy(searchTerm,offset){

  offset = offset || 0;
  return (dispatch) => {
    dispatch(searchRequestGiphy());
    return fetch(`https://api.giphy.com/v1/gifs/search?api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6&q=${searchTerm}&offset=${offset}`)
        .then(response => {
          return response.json()
        })
        .then(json => {
          return dispatch(receiveGifs(json))
        })
        .catch(error=>dispatch(receiveGifsError(error,searchTerm)));
  };
}
