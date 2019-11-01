import { merge } from 'lodash'
import {
    RECEIVE_USER, REMOVE_USER

} from '../actions/session_actions'
import { RECEIVE_TRANSACTION } from '../actions/transaction_actions'

//from session reducer
const _nullSession = {
    id: null
}
const usersReducer = (state= {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_USER:
            return merge({}, { [action.user.id]: action.user});
        case REMOVE_USER:
            return {};
        case RECEIVE_TRANSACTION:
            let newState = merge({}, state)
            newState[action.transaction.user_id].funds -= parseFloat(
              action.transaction.price
            );
            debugger
            // newState[action.transaction.user_id].transactions.push(action.transaction.id)
            // debugger
            // return newState;
        // i can also make jbuilder return the user and snag it here 

            // return merge({}, state[action.transaction.user_id], state)
            return merge({}, state, newState);
        default:
            return state;
    }
}

export default usersReducer;