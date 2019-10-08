import { RECEIVE_LAST_PRICES } from "../actions/stocks_actions";
import { merge } from 'lodash';
import { REMOVE_USER } from "../actions/session_actions";
import { RECEIVE_COMPANIES } from "./companies_reducer"



const stocksReducer = (state = [], action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_LAST_PRICES:
            return merge([], action.prices);
        case REMOVE_USER: 
            return [];
        default:
            return state;
    }
}

export default stocksReducer;
