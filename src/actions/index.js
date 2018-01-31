export const FETCH_PIPELINES = 'fetch_pipelines';
export const FETCH_PIPELINE = 'fetch_pipeline';
export const FETCH_PIPELINE_RUNS = 'fetch_pipeline_runs';
export const FETCH_PIPELINE_RUN = 'fetch_pipeline_run';
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


export function fetchPipelineRuns(id) {
        const request = axios.get(`${ROOT_URL}/pipelines/${id}/runs`)
        return {
                type: FETCH_PIPELINE_RUNS,
                payload: request
        };
}


export function fetchPipelineRun(id, runId) {
        const request = axios.get(`${ROOT_URL}/pipelines/${id}/${runId}`)
        return {
                type: FETCH_PIPELINE_RUN,
                payload: request
        };
}
