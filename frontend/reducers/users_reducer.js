import { merge } from "lodash";
import { RECEIVE_USER, REMOVE_USER } from "../actions/session_actions";
import { RECEIVE_TRANSACTION } from "../actions/transaction_actions";
import {
  RECEIVE_WATCHLIST_ITEM,
  REMOVE_WATCHLIST_ITEM
} from "../actions/watchlist_actions";

//from session reducer
const _nullSession = {
  id: null
};
const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  let id;
  let watchedCompanies;
  switch (action.type) {
    case RECEIVE_USER:
      return merge({}, { [action.user.id]: action.user });
    case REMOVE_USER:
      return {};
    case RECEIVE_TRANSACTION:
      newState = merge({}, state);
      newState[action.transaction.user_id].funds -= parseFloat(
        action.transaction.price
      );

      // newState[action.transaction.user_id].transactions.push(action.transaction.id)

      // return newState;
      // i can also make jbuilder return the user and snag it here

      // return merge({}, state[action.transaction.user_id], state)
      return merge({}, state, newState);
    case RECEIVE_WATCHLIST_ITEM:
      newState = merge({}, state);
      id = action.item[Object.keys(action.item)].id;

      watchedCompanies = newState[Object.keys(newState)].watched_companies;

      watchedCompanies.push(id);
      return newState;

    case REMOVE_WATCHLIST_ITEM:
      newState = merge({}, state);
      id = action.item[Object.keys(action.item)].id;

      watchedCompanies = newState[Object.keys(newState)].watched_companies;

      watchedCompanies.splice(watchedCompanies.indexOf(id), 1);
      return newState;

    default:
      return state;
  }
};

export default usersReducer;
