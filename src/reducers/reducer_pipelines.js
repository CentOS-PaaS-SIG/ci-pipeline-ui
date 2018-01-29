import _ from 'lodash';
import { FETCH_PIPELINES } from '../actions';
import { FETCH_PIPELINE } from '../actions';

export default function(state = {}, action){
  switch (action.type){
    case FETCH_PIPELINES:
      // console.log(action.payload.data); // [post1,post2]
      return _.mapKeys(action.payload.data, 'name');
    case FETCH_PIPELINE:
      // console.log(action.payload.data);
      return { ...state, [action.payload.data.name]: action.payload.data }
    default:
      return state;
  }
}
