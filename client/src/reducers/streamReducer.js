import { FETCH_STREAMS, CREATE_STREAM, FETCH_STREAM, DELETE_STREAM, EDIT_STREAM } from '../actions/actionTypes';
import _ from 'lodash';

export const streamReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            // Since the data is in Array from db.json but it is easier to deal
            // when in Object of objects form so using lodash mapKeys function
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            return _.omit(state, action.payload); // Lodash function
        default:
            return state;
    }
};
