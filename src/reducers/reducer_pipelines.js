import _ from 'lodash';
import { FETCH_PIPELINES } from '../actions';
import { FETCH_PIPELINE_DETAIL } from '../actions';
import { FETCH_PIPELINE } from '../actions';
import { FETCH_PIPELINE_RUNS } from '../actions';
import { FETCH_PIPELINE_RUNVIEW } from '../actions';
import { FETCH_PIPELINE_LATESTRUN } from '../actions';
import { FETCH_PIPELINE_RUN_ARTIFACTS } from '../actions';
import { FETCH_PIPELINE_JENKINSVIEW } from '../actions';
import { FETCH_PIPELINE_VIEWS } from '../actions';
import { FETCH_PIPELINE_VIEW_BY_NAME } from '../actions';
import { FETCH_PIPELINE_RUN_NODES } from '../actions';
import { FETCH_PIPELINE_RUN_NODE_STEPS } from '../actions';


export default function(state = {}, action){
  switch (action.type){
    case FETCH_PIPELINE_RUN_NODE_STEPS:
      return { ...state, "pipelinenodesteps": action.payload.data }
    case FETCH_PIPELINE_VIEW_BY_NAME:
      return { ...state, "pipelineview": action.payload.data }
    case FETCH_PIPELINE_RUN_NODES:
      return { ...state, "pipelinerunnodes": action.payload.data }
    case FETCH_PIPELINE_DETAIL:
      return { ...state, "pipelinedetail": action.payload.data }
    case FETCH_PIPELINES:
      return _.mapKeys(action.payload.data, 'name');
    case FETCH_PIPELINE_VIEWS:
      return { ...state, "pipelineviews": action.payload.data }
    case FETCH_PIPELINE_RUNS:
      return { ...state, "pipelineruns": action.payload.data }
    case FETCH_PIPELINE_RUNVIEW:
      return { ...state, "pipelinerunview": action.payload.data }
    case FETCH_PIPELINE_JENKINSVIEW:
      return { ...state, "pipelinejenkinsview": action.payload.data }
    case FETCH_PIPELINE_LATESTRUN:
      return { ...state, "pipelinelatestrun": [action.payload.data] }
    case FETCH_PIPELINE_RUN_ARTIFACTS:
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
    default:
      return state;
  }
}
