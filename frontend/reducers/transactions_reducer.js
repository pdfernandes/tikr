import {
    RECEIVE_TRANSACTION,
    RECEIVE_TRANSACTIONS
} from "../actions/transaction_actions";
import {
    RECEIVE_USER,
    REMOVE_USER
} from "../actions/session_actions";
import { merge } from "lodash";


const transactionsReducer = (state = {}, action) => {
    Object.freeze(state)
    debugger
    switch (action.type) {
        case RECEIVE_TRANSACTION:
            return merge({}, state, {[action.transaction.id]: action.transaction})
        case RECEIVE_TRANSACTIONS:
            return merge({}, action.transactions)
        // case RECEIVE_USER:
        //     return {}
        case REMOVE_USER:
            return {};
        
        default:
            return state
    }
}

export default transactionsReducer;

