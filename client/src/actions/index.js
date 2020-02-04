import { SIGN_IN, SIGN_OUT, CREATE_STREAM, FETCH_STREAMS, FETCH_STREAM, DELETE_STREAM, EDIT_STREAM } from './actionTypes';
import streams from '../apis/streams';
import history from '../history';

// Auth related Action Creators
export const signIn = userId => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

// Streams related Action Creators

// Create stream
export const createStream = formValues => async (dispatch, getState) => {
    try {
        // To add the userId of the user creating the stream
        const { userId } = getState().auth;
        const response = await streams.post('/streams', { ...formValues, userId });

        dispatch({
            type: CREATE_STREAM,
            payload: response.data
        });

        history.push('/'); // Dynamic navigation to homepage once the stream is created
    } catch (err) {
        console.log(err);
    }
};

// Fetch streams
export const fetchStreams = () => async dispatch => {
    try {
        const response = await streams.get('/streams');

        dispatch({
            type: FETCH_STREAMS,
            payload: response.data
        });
    } catch (err) {
        console.log(err);
    }
};

// Fetch single stream
export const fetchStream = id => async dispatch => {
    try {
        const response = await streams.get(`/streams/${id}`);

        dispatch({
            type: FETCH_STREAM,
            payload: response.data
        });
    } catch (err) {
        console.log(err);
    }
};

// Edit stream
export const editStream = (id, formValues) => async dispatch => {
    try {
        const response = await streams.patch(`/streams/${id}`, formValues);

        dispatch({
            type: EDIT_STREAM,
            payload: response.data
        });
        history.push('/'); // Dynamic navigation to homepage once the stream is edited
    } catch (err) {
        console.log(err);
    }
};

// Delete stream
export const deleteStream = id => async dispatch => {
    try {
        await streams.delete(`/streams/${id}`);

        dispatch({
            type: DELETE_STREAM,
            payload: id
        });

        history.push('/'); // Dynamic navigation to homepage once the stream is deleted
    } catch (err) {
        console.log(err);
    }
};
