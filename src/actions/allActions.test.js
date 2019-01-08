import {RECEIVE_GIFS, receiveGifs, REQUEST_SEARCH, searchRequestGiphy} from "./allActions";

describe('test Actions',()=>{

  test('requestSearch',()=>{
    const requestSearchAction = {
      type:REQUEST_SEARCH,
      message:"Looking for Gifs..."
    };

    expect(searchRequestGiphy()).toEqual(requestSearchAction);
  });

  test('receiveGifs',()=>{
    const data = {data:['gif1','gif2'],pagination:{offset:26, count:25}};
    const result = receiveGifs(data);

    expect(result.type).toEqual(RECEIVE_GIFS);
    expect(result.pagination).toEqual(data.pagination);
    expect(result.gifs).toEqual(data.data);
  });

});
