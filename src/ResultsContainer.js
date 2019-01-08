import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchGiphy} from "./actions/allActions";
import {Grid} from '@material-ui/core';
import './ResultsContainer.css';

class ResultsContainer extends Component {

  constructor(props) {
    super(props);
    this.scrollOnContainer = this.scrollOnContainer.bind(this);
  }

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

    const {results, viewColumns} = this.props;
    if (!results) {
      return <></>;
    }
    if (this.props.viewColumns > 1) {

      let resultsInChunks = [];

      for (let index = 0; index < results.length; index += viewColumns) {
        let chunk = [];
        for (let i = 0; i < viewColumns; i++) {
          if(!results.hasOwnProperty(index+1)){
            continue;
          }
          chunk.push(results[index + i]);
        }
        resultsInChunks.push(chunk);
      }
        return resultsInChunks.map((chunk,chunkIndex)=>
          <Grid container direction={"row"} justify={"center"} alignItems={"flex-start"} key={chunkIndex}>
          {
            chunk.map(x=><Grid spacing={6} item xs key={x.url}><img className="image" src={x.url} alt={x.id}/></Grid>)
          }
        </Grid>);
    }
    return <div>{results.map((x, index) => <div key={x.url}><img src={x.url} alt={x.id}/></div>)}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const results = state && state.searchGiphy && state.searchGiphy.gifs;
  const pagination = state && state.searchGiphy && state.searchGiphy.pagination;
  return {
    results,
    pagination
  }
};

export default connect(mapStateToProps)(ResultsContainer);
