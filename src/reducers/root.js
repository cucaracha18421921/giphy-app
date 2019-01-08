import { combineReducers } from 'redux';
import {RECEIVE_GIFS, RECEIVE_GIFS_ERROR, REQUEST_SEARCH} from "../actions/allActions";

export function searchGiphy(state={},action){
  switch(action && action.type){
    case RECEIVE_GIFS:
      const receivedGifs = action.gifs && action.gifs.map(x=>x.images.original);
      if(state.gifs && state.gifs.length > 0){
        return { gifs: [].concat(state.gifs).concat(receivedGifs), pagination:action.pagination };
      }
      return { gifs:receivedGifs ,pagination:action.pagination};
    case RECEIVE_GIFS_ERROR:
      return action.message;
    default:
      return state;
  }
}

export function requestGiphy(state={},action){
  switch(action && action.type) {
    case REQUEST_SEARCH:
      return action.message;
    default:
      return state;
  }
}

// export function selectChampionPerSeason(state={'champions':{}},action){
//   switch(action && action.type){
//     case REQUEST_SEASON_CHAMPION:
//       return action.message;
//     case RECEIVE_SEASON_CHAMPION:
//       const champions = state.champions || {};
//       champions[action.season] = {
//         champion:action.champion,
//         numberOfCircuits:action.numberOfCircuits};
//       return {champions};
//     case RECEIVE_SEASON_CHAMPION_ERROR:
//       return action.message;
//     default:
//       return state;
//   }
// }

const rootReducer = combineReducers({
  searchGiphy,
  requestGiphy
  // selectChampionPerSeason
});

export default rootReducer;
