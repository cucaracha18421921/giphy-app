import * as utils from "./utils";

describe('test Utils',()=>{
  test('test splitInChunks',()=>{
    const splitInChunks = utils.splitInChunks;
    const data = ['1','2','3','4','5'];
    expect(splitInChunks(data,1)).toEqual([['1'],['2'],['3'],['4'],['5']]);
    expect(splitInChunks(data,3)).toEqual([['1','2','3'],['4','5']]);
    expect(splitInChunks(data,1)).toEqual([['1'],['2'],['3'],['4'],['5']]);
    expect(splitInChunks(data,5)).toEqual([['1','2','3','4','5']]);
  });
});
