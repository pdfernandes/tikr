import { merge } from 'lodash';
import {
    RECEIVE_ERRORS,
    RECEIVE_USER,
    CLEAR_ERRORS
} from '../actions/session_actions';

const sessionErrorReducer = (state = [], action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_ERRORS:
            return merge([], action.errors)

        case RECEIVE_USER:
            return [];

        case CLEAR_ERRORS: 
            return [];
  
        default:
            return state;
    }
}

export default sessionErrorReducer;