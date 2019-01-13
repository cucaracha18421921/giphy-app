import ResultsContainer from './ResultsContainer';
import {connect} from "react-redux";

//Grab the loadingMessage or the results that were returned
const mapStateToProps = (state) => {
  const results = state && state.searchGiphy && state.searchGiphy.gifs;
  const pagination = state && state.searchGiphy && state.searchGiphy.pagination;
  let newState = { results,pagination};
  if(state.requestGiphy && state.requestGiphy.message){
    newState.loadingMessage = state.requestGiphy.message;
  }
  return newState;
};

export default connect(mapStateToProps)(ResultsContainer);
