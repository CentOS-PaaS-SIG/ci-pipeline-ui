export const FETCH_PIPELINES = 'fetch_pipelines';
export const FETCH_PIPELINE = 'fetch_pipeline';
import axios from 'axios';
const ROOT_URL = 'http://localhost:3000';

export function fetchPipelines() {
	const request = axios.get(`${ROOT_URL}/pipelines`)
	return {
		type: FETCH_PIPELINES,
		payload: request
	};

}

export function fetchPipeline(id) {
        const request = axios.get(`${ROOT_URL}/pipelines/${id}`)
        return {
                type: FETCH_PIPELINE,
                payload: request
        };
}
