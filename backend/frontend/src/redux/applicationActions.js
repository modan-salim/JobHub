import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/constants'; // Adjust the path as needed

export const FETCH_APPLIED_JOBS_SUCCESS = 'FETCH_APPLIED_JOBS_SUCCESS';
export const FETCH_APPLIED_JOBS_FAILURE = 'FETCH_APPLIED_JOBS_FAILURE';

export const fetchAppliedJobs = () => async (dispatch) => {
    try {
        const response = await axios.get(`${APPLICATION_API_END_POINT}/applied`);
        dispatch({
            type: FETCH_APPLIED_JOBS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FETCH_APPLIED_JOBS_FAILURE,
            payload: error.message
        });
    }
};
