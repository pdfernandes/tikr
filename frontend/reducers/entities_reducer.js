import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import transactionsReducer from './transactions_reducer';
import companiesReducer from "./companies_reducer";
import intrinioReducer from './intrinio_reducer';


const entitiesReducer = combineReducers({
    user: usersReducer,
    transactions: transactionsReducer,
    companies: companiesReducer,
    prices: intrinioReducer
})

export default entitiesReducer;