import React, {Component} from 'react';
import {searchGiphy} from "../actions/allActions";
import './ResultsContainer.sass';
import ResultsRow from "./ResultsRow";
import CircularProgress from "@material-ui/core/CircularProgress"
import * as utils from "../utils/utils";

//Contains UI that shows the row of Gifs
class ResultsContainer extends Component {

  constructor(props) {
    super(props);
    this.scrollOnContainer = this.scrollOnContainer.bind(this);
  }

  /*
  * When the window height
  * and the new scroll value ( window.scrollY ) is greater than the current document Height, then
  * we reached the bottom of the screen
  * */
   scrollOnContainer() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      const {pagination, searchQuery} = this.props;
      let offset = pagination.offset + pagination.count;
      this.props.dispatch(searchGiphy(searchQuery, offset));
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollOnContainer);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollOnContainer);
  }

  render() {
    if(this.props.error){
      return <></>
    }
    if(this.props.loadingMessage && !this.props.results){
      return <CircularProgress/>;
    }
    const {results, viewColumns} = this.props;
    if (!results) {
      return <></>;
    }
    let chunks = utils.splitInChunks(results,viewColumns);
    return  chunks.map((chunk,chunkIndex)=>
      <ResultsRow results={chunk} key={chunkIndex}/>
    );
  }
}

export default ResultsContainer;
