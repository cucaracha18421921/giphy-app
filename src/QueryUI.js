import React,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {DO_SEARCH, receiveGifs, searchGiphy} from "./actions/allActions";
import ResultsContainer from "./ResultsContainer";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

class QueryUI extends Component{

  constructor(props){
    super(props);
    this.changeSearchQueryInput = this.changeSearchQueryInput.bind(this);
    this.handleColumnViewSelection = this.handleColumnViewSelection.bind(this);
    this.state = {
      searchQuery:"",
      viewColumns:"1"
    }
  }

  handleColumnViewSelection(evt){
    this.setState({viewColumns:Number.parseInt(evt.target.value)});
  }

  onSearchClick(searchQuery){
    this.props.dispatch(searchGiphy(searchQuery));
  }

  changeSearchQueryInput(evt){
    this.setState({searchQuery:evt.target.value});
  }

  render(){
    return <div>
      <input type="text" value={this.state.searchQuery} placeholder={"Search Term"} onChange={this.changeSearchQueryInput}/>
      <input type="button" onClick={()=> this.onSearchClick(this.state.searchQuery)} value={"Search"}/>
      <div>
        <RadioGroup
            aria-label="position"
            name="position"
            value={this.state.viewColumns}
            onChange={this.handleColumnViewSelection}
            row
        >
          <FormControlLabel
              value={1}
              control={<Radio color="primary" />}
              label="1"
              labelPlacement="top"
          />
          <FormControlLabel
              value={3}
              control={<Radio color="primary" />}
              label="3"
              labelPlacement="top"
          />
          <FormControlLabel
              value={5}
              control={<Radio color="primary" />}
              label="5"
              labelPlacement="top"
          />
        </RadioGroup>
      </div>
      <ResultsContainer searchQuery={this.state.searchQuery} pagination={this.props.pagination} viewColumns={this.state.viewColumns}/>

    </div>;
  }
}

QueryUI.propTypes = {
  searchQuery: PropTypes.string,
  // onSearchClick: PropTypes.func.isRequired
};
//
// const mapDispatchToProps = dispatch => {
//   return {
//     onSearchClick: searchQuery => {
//       return dispatch(searchGiphy(searchQuery))
//     }
//   }
// };

const mapStateToProps = (state, ownProps) => {
  if(state.searchGiphy && state.searchGiphy.pagination){
    return {
      pagination:state.searchGiphy.pagination || 0,
      searchQuery: state.searchQuery
    };
  }
  return state;
};

const UI = connect(mapStateToProps)(QueryUI);

export default UI;
