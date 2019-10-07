import { merge } from 'lodash'
import {
    RECEIVE_USER, REMOVE_USER

} from '../actions/session_actions'

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
        default:
            return state;
    }
}

export default usersReducer;