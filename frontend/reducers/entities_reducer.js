import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import transactionsReducer from './transactions_reducer';

const entitiesReducer = combineReducers({
    user: usersReducer,
    transactions: transactionsReducer
})

export default entitiesReducer;