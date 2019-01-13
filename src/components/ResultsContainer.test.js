import ResultsRow from "./ResultsRow";
import ResultsContainer from "./ResultsContainer";

import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('test ResultsRow',()=>{
  const results = [
    {id:0,url:"url1"},
    {id:1,url:"url2"},
    {id:2,url:"url3"},
    {id:3,url:"url4"},
    {id:4,url:"url5"}
  ];
  configure({ adapter: new Adapter() });

  test('renders 1 image per row',()=>{
    let expectedJSX =
        (   <ResultsRow results={[results[4]]} key={2}/> );

    let resultJSX = shallow(
        <ResultsContainer searchQuery={"cats"} pagination={""} viewColumns={1} results={results}/>);
    expect(resultJSX.contains(expectedJSX)).toEqual(true);
  });

  test('renders 3 columns per row',()=>{
    let expectedJSX = <ResultsRow results={[{id:3,url:"url4"},{id:4,url:"url5"}]} key={1} />;
    let resultJSX = shallow(<ResultsContainer searchQuery={"cats"} pagination={""} viewColumns={3} results={results}/>);
    expect(resultJSX.contains(expectedJSX)).toEqual(true);
    expect(resultJSX.length).toEqual(2);
  });

  test('renders 5 columns per row',()=>{

    let expectedJSX = <ResultsRow results={[{id:0,url:"url1"},{id:1,url:"url2"},{id:2,url:"url3"},{id:3,url:"url4"},{id:4,url:"url5"}]} key={0} />;
    let resultJSX = shallow(<ResultsContainer searchQuery={"cats"} pagination={""} viewColumns={5} results={results}/>);
    expect(resultJSX.contains(expectedJSX)).toEqual(true);
    expect(resultJSX.length).toEqual(1);
  })

});
