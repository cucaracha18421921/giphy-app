import { combineReducers } from 'redux';
import {RECEIVE_GIFS, RECEIVE_GIFS_ERROR, REQUEST_SEARCH} from "../actions/allActions";

//Search Giphy can have two out comes receive results (RECEIVE_GIFS), error (RECEIVE_GIFS_ERROR)
export function searchGiphy(state={},action){
  switch(action && action.type){
    case RECEIVE_GIFS:
      const receivedGifs = action.gifs && action.gifs.map(x=>x.images.original);
      if(state.gifs && state.gifs.length > 0){
        return { gifs: [].concat(state.gifs).concat(receivedGifs), pagination:action.pagination };
      }
      return { gifs:receivedGifs ,pagination:action.pagination};
    case RECEIVE_GIFS_ERROR:
      return {error:action.message};
    default:
      return state;
  }
}

//Request Giphy. While new data is coming render a requesting... message
export function requestGiphy(state={},action){
  switch(action && action.type) {
    case REQUEST_SEARCH:
      return {message: action.message};
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  searchGiphy,
  requestGiphy
});

export default rootReducer;
