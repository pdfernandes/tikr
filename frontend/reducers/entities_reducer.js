import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import transactionsReducer from './transactions_reducer';
import companiesReducer from "./companies_reducer";
import stocksReducer from './stocks_reducer';


const entitiesReducer = combineReducers({
    user: usersReducer,
    transactions: transactionsReducer,
    companies: companiesReducer,
    prices: stocksReducer
})

export default entitiesReducer;