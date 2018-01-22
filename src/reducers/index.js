import { combineReducers } from 'redux';
import PipelinesReducer from './reducer_pipelines'
const rootReducer = combineReducers({
	pipelines: PipelinesReducer
});

export default rootReducer;
