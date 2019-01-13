import React,{Component} from 'react';
import { connect } from 'react-redux';
import {searchGiphy} from "../actions/allActions";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import CircularProgress from '@material-ui/core/CircularProgress';
import ResultsContainerReduxWrapper from "./ResultsContainerReduxWrapper";
import "./QueryUI.sass";

class QueryUI extends Component{

  constructor(props){
    super(props);
    this.changeSearchQueryInput = this.changeSearchQueryInput.bind(this);
    this.handleColumnViewSelection = this.handleColumnViewSelection.bind(this);
    this.state = {
      searchQuery:"",
      viewColumns:1,
      loadingMessage:""
    }
  }

  //UI that selects how many columns per row we want on our results ui
  handleColumnViewSelection(evt){
    this.setState({viewColumns:Number.parseInt(evt.target.value)});
  }

  //When search button is done search on Giphy API
  onSearchClick(searchQuery){
    this.props.dispatch(searchGiphy(searchQuery));
  }

  changeSearchQueryInput(evt){
    this.setState({
      searchQuery:evt.target.value
    });
  }

  //When error message is rendered leave the rest of the UI intact
  render(){
    return <div>
      <input type="text" value={this.state.searchQuery} placeholder={"Search Term"} onChange={this.changeSearchQueryInput}/>
      <input type="button" onClick={()=> this.onSearchClick(this.state.searchQuery)} value={"Search"}/>
      <div>
        <span>{this.props.errorMessage}</span>
      </div>
      <div className={"radioButton-container"}>
        <RadioGroup
            aria-label="position"
            name="position"
            value={`${this.state.viewColumns}`}
            onChange={this.handleColumnViewSelection}
            row
        >
          <FormControlLabel
              value={"1"}
              control={<Radio color="primary" />}
              label="1"
              labelPlacement="top"
          />
          <FormControlLabel
              value={"3"}
              control={<Radio color="primary" />}
              label="3"
              labelPlacement="top"
          />
          <FormControlLabel
              value={"5"}
              control={<Radio color="primary" />}
              label="5"
              labelPlacement="top"
          />
        </RadioGroup>
      </div>
      <ResultsContainerReduxWrapper searchQuery={this.state.searchQuery} pagination={this.props.pagination} viewColumns={this.state.viewColumns}/>
      <div>
        <span>{this.props.loading && <CircularProgress/>}</span>
      </div>
    </div>;
  }
}

const mapStateToProps = (state) => {

  //Return only the message
  if(state.searchGiphy && state.searchGiphy.error){
    return {
      errorMessage:state.searchGiphy.error
    };
  }

  //Show loading UI ( CircularProgress )
  if(state.requestGiphy && state.requestGiphy.message){
    return {
      loading: true
    };
  }

  //Grab the pagination data and the searchTerm as well
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
