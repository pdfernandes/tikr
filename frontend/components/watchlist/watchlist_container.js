import { connect } from 'react-redux';
import Watchlist from "./watchlist";
// import { RECEIVE_WATCHLIST } from '../../actions/company_actions'
import { allCompanies } from "../../actions/company_actions";
import { allTransactions } from '../../actions/transaction_actions';

const msp = state => {
    return {
        user: Object.values(state.entities.user)[0],
        companies: Object.values(state.entities.companies),
        transactions: Object.values(state.entities.transactions)
    }
}

const mdp = dispatch => {
    return {
        allCompanies: () => dispatch(allCompanies()),
        allTransactions: () => dispatch(allTransactions())

    }
}

export default connect(msp, mdp)(Watchlist);