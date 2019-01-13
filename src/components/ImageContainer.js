import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';

//Render the Image
export default class ImageContainer extends Component{

  render(){
    let { url, id} = this.props;
    return (<Grid item xs key={url}><img className="image" src={url} alt={id} key={id}/></Grid>);
  }
}
