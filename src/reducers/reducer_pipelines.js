import _ from 'lodash';
import { FETCH_PIPELINES } from '../actions';

export default function(state = {}, action){
	switch (action.type){
		case FETCH_PIPELINES:
			console.log(action.payload.data); // [post1,post2]
			return _.mapKeys(action.payload.data, 'id');
			// { 4:post }
		default:
			return state;

	}
}

