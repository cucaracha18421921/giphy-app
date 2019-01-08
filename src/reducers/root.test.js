import {RECEIVE_GIFS} from "../actions/allActions";
import {searchGiphy} from "./root";

describe('test Reducers',()=>{
  test('test SearchGiphy',()=>{
    const action = {
      gifs:[{images:{original:"gif1"}},{images:{original:"gif2"}}],
      pagination:{offset:15,count:20},
      type:RECEIVE_GIFS
    };
    expect(searchGiphy({},action)).toEqual({gifs:["gif1","gif2"],pagination:action.pagination});

    const state = {gifs:["gif3","gif4"]};
    expect(searchGiphy(state,action)).toEqual({gifs:["gif3","gif4","gif1","gif2"],pagination:action.pagination})

  })
});
