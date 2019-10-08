import {
    RECEIVE_USER,
    REMOVE_USER
} from "../actions/session_actions";
import { merge } from "lodash";
import { RECEIVE_COMPANIES, RECEIVE_COMPANY } from "../actions/company_actions"


const companiesReducer = (state = {}, action ) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_COMPANIES: 
            return merge({}, action.companies);

        case RECEIVE_COMPANY:
            return merge({}, state, action.company)

        case REMOVE_USER:
            return {};

        default:
            return state;
    }
}

export default companiesReducer;