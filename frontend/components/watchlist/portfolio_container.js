import { connect } from 'react-redux';
// import { RECEIVE_WATCHLIST } from '../../actions/company_actions'
import { allCompanies } from "../../actions/company_actions";
import { allTransactions } from '../../actions/transaction_actions';
import { allWatchlistItems } from '../../actions/watchlist_actions';
import Portfolio from './portfolio';

const msp = state => {
    return {
        user: Object.values(state.entities.user)[0],
        companies: Object.values(state.entities.companies),
        transactions: Object.values(state.entities.transactions),
        watchlists: Object.values(state.entities.watchlists)
    }
}

const mdp = dispatch => {
    return {
        allCompanies: () => dispatch(allCompanies()),
        allTransactions: () => dispatch(allTransactions()),
        allWatchlistItems: () => dispatch(allWatchlistItems()),

    }
}

export default connect(msp, mdp)(Portfolio);