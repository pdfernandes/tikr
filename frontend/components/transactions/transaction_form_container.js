import { connect } from 'react-redux';
import { allTransactions, transact } from '../../actions/transaction_actions';
import TransactionForm from './transaction_form';
import { allCompanies } from "../../actions/company_actions";
import { postWatchlistItem } from "../../actions/watchlist_actions"


const msp = (state, Ownprops) => {
    return {
        user: Object.values(state.entities.user)[0],
        ticker: Ownprops.match.params.ticker.toUpperCase(),
        companies: Object.values(state.entities.companies),
        transactions: Object.values(state.entities.transactions)
    }
}


const mdp = dispatch => {
    return {
        transact: transaction => dispatch(transact(transaction)),
        allCompanies: () => dispatch(allCompanies()),
        allTransactions:  () => dispatch(allTransactions()),
        postWatchlistItem: item => dispatch(postWatchlistItem(item)),
        deleteWatchlistItem: item => dispatch(deleteWatchlistItem(item))

    }
}


export default connect(msp, mdp)(TransactionForm)