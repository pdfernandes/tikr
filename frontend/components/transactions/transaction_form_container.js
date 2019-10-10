import { connect } from 'react-redux';
import { allTransactions, transact } from '../../actions/transaction_actions';
import TransactionForm from './transaction_form';
import { allCompanies } from "../../actions/company_actions";


const msp = (state, Ownprops) => {
    return {
        user: Object.values(state.entities.user)[0],
        ticker: Ownprops.match.params.ticker.toUpperCase(),
        companies: Object.values(state.entities.companies)
    }
}


const mdp = dispatch => {
    return {
        transact: transaction => dispatch(transact(transaction)),
        allCompanies: () => dispatch(allCompanies())
    }
}


export default connect(msp, mdp)(TransactionForm)