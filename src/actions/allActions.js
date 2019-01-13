import fetch from 'cross-fetch';

export const REQUEST_SEARCH = 'Request_Search';
export const RECEIVE_GIFS = "Receive_Gifs";
export const RECEIVE_GIFS_ERROR = "Receive_Gifs_error";

//Requesting Data Message
export function searchRequestGiphy() {
  return {
    type: REQUEST_SEARCH,
    message: "Looking for Gifs..."
  }
}

//Receive data from the API
//lastRequestTimestamp: use the timestamp in case you need to force react to Render
//pagination: Shows how many results are still in the server and the current offset
//gis: Results of data
export function receiveGifs(data){
  const gifs = (data && data.data) || [];
  return {
    type: RECEIVE_GIFS,
    lastRequestTimestamp: new Date().getTime(),
    pagination:data.pagination,
    gifs:gifs
  }
}

//Receive Error Message
export function receiveGifsError(){
  return {
    type: RECEIVE_GIFS_ERROR,
    message: "Couldn't receive Gifs anymore,"
  }
}

//If no offset is given make it 0
//Given a search term and an offset requestData.
//While requesting dispatch a message
//When data are retrieved dispatch search Request
//When error return error message
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
