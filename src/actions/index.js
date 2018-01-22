export const FETCH_PIPELINES = 'fetch_pipelines';
import axios from 'axios';
const ROOT_URL = 'http://localhost:3000';
const API_KEY = "?key=iParpe12345";

export function fetchPipelines() {
	const request = axios.get(`${ROOT_URL}/pipelines`)
	return {
		type: FETCH_PIPELINES,
		payload: request
	};
}
