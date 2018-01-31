import _ from 'lodash';
import { FETCH_PIPELINES } from '../actions';
import { FETCH_PIPELINE } from '../actions';
import { FETCH_PIPELINE_RUNS } from '../actions';

export default function(state = {}, action){
  switch (action.type){
    case FETCH_PIPELINES:
      // console.log(action.payload.data); // [post1,post2]
      return _.mapKeys(action.payload.data, 'name');
    case FETCH_PIPELINE:
      // console.log(action.payload.data);
      return { ...state, [action.payload.data.name]: action.payload.data }
    case FETCH_PIPELINE_RUNS:
        console.log("Inside reducer");
        console.log(action.payload.data);
        return { ...state, "pipelineruns": action.payload.data }
    default:
      return state;
  }
}
