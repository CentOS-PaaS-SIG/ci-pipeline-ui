import _ from 'lodash';
import { FETCH_PIPELINES } from '../actions';
import { FETCH_PIPELINE } from '../actions';
import { FETCH_PIPELINE_RUNS } from '../actions';
import { FETCH_PIPELINE_RUNVIEW } from '../actions';
import { FETCH_PIPELINE_LATESTRUN } from '../actions';
import { FETCH_PIPELINE_RUN_ARTIFACTS } from '../actions';


export default function(state = {}, action){
  switch (action.type){
    case FETCH_PIPELINES:
      return _.mapKeys(action.payload.data, 'name');
    case FETCH_PIPELINE:
      return { ...state, [action.payload.data.name]: action.payload.data }
    case FETCH_PIPELINE_RUNS:
      return { ...state, "pipelineruns": action.payload.data }
    case FETCH_PIPELINE_RUNVIEW:
      console.log("Inside the reducer pipeline::");
      //console.log(action.payload.data);
      return { ...state, "pipelinerunview": action.payload.data }
    case FETCH_PIPELINE_LATESTRUN:
      console.log("Inside the reducer pipeline latestrun:");
      //console.log(action.payload.data);
      return { ...state, "pipelinelatestrun": [action.payload.data] }
    case FETCH_PIPELINE_RUN_ARTIFACTS:
      console.log("Inside the reducer fetch pipelinerun artifacts:");
      console.log(action.payload.data);
      if (!("runartifacts" in state )){
        state["runartifacts"] = {};
      }
      if (action.payload.data.length != 0 ){
        // fetch the id from first element
        var pipelineName = action.payload.data[0].url.split("/")[2];
        var pipelineRunID = action.payload.data[0].url.split("/")[3];
        // append it as rest of keys
        state["runartifacts"][pipelineName+pipelineRunID] = action.payload.data;
      }
      return state;
      //return { ...state, [action.payload.data.url]: action.payload.data }
    default:
      return state;
  }
}
