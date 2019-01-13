import React,{Component} from 'react';
import {Grid} from '@material-ui/core';
import ImageContainer from "./ImageContainer";

//Renders a row that contains an ImageContainer per column
export default class ResultsRow extends Component{

  render(){
    const data = this.props.results;
    return (
        <Grid spacing={8} container direction={"row"} justify={"center"} alignItems={"flex-start"}>
          {
            data.map(x=><ImageContainer url={x.url} id={x.id} key={x.id}/>)
          }
        </Grid>);
  }
}
