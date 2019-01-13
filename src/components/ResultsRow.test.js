import ResultsRow from "./ResultsRow";

import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Grid from "@material-ui/core/Grid";
import ImageContainer from "./ImageContainer";

describe('test ResultsRow',()=>{
  const results = [
    {id:0,url:"url1"},
    {id:1,url:"url2"},
    {id:2,url:"url3"},
    {id:3,url:"url4"},
    {id:4,url:"url5"}
  ];
  configure({ adapter: new Adapter() });

  test('renders row Correctly for 1 column',()=>{

    let expectedJSX =
        <Grid spacing={8} container direction={"row"} justify={"center"} alignItems={"flex-start"}>
          <ImageContainer url={"url1"} id={0} key={0}/>
        </Grid>;

    let resultJSX = shallow(
        <ResultsRow results={ [{id:0,url:"url1"}] } key={0}/>);
    expect(resultJSX.contains(expectedJSX)).toEqual(true);
  });

  test('renders row Correctly for 3 columns',()=>{

    let expectedJSX =
        <Grid spacing={8} container direction={"row"} justify={"center"} alignItems={"flex-start"}>
          <ImageContainer url={"url1"} id={0} key={0}/>
          <ImageContainer url={"url2"} id={1} key={1}/>
          <ImageContainer url={"url3"} id={2} key={2}/>
        </Grid>;

    let resultJSX = shallow(
        <ResultsRow results={ [{id:0,url:"url1"},{id:1,url:"url2"},{id:2,url:"url3"}] } key={0}/>);
    expect(resultJSX.contains(expectedJSX)).toEqual(true);
  });

  test('renders row Correctly for 5 columns',()=>{

    let expectedJSX =
        <Grid spacing={8} container direction={"row"} justify={"center"} alignItems={"flex-start"}>
          <ImageContainer url={"url1"} id={0} key={0}/>
          <ImageContainer url={"url2"} id={1} key={1}/>
          <ImageContainer url={"url3"} id={2} key={2}/>
          <ImageContainer url={"url4"} id={3} key={3}/>
          <ImageContainer url={"url5"} id={4} key={4}/>
        </Grid>;

    let resultJSX = shallow(
        <ResultsRow results={ results } key={0}/>);
    expect(resultJSX.contains(expectedJSX)).toEqual(true);
  })

});
