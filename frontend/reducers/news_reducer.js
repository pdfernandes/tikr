import { merge } from 'lodash'
import {
    RECEIVE_NEWS
} from '../actions/news_actions';
import {
    REMOVE_USER
} from '../actions/session_actions';




const newsReducer = (state = [], action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_NEWS:
            return merge([], action.articles);
        case REMOVE_USER:
            return [];
        default:
            return state;
    }
}

export default newsReducer;