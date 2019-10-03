import { merge } from 'lodash'
import {
    RECEIVE_USER,
    REMOVE_USER
} from '../actions/session_actions'


const _nullSession = {
    id: null
}
const sessionReducer = (state = _nullSession, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_USER:
            return merge({}, { id: action.user.id } )
        case REMOVE_USER:
            return _nullSession;
        default:
            return state;
    }
}

export default sessionReducer;