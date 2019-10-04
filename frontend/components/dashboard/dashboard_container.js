import { connect } from 'react-redux';
import { allTransactions } from "../../actions/transaction_actions";
import Dashboard from "./dashboard";


const mapState = (state) => {
    return {
        user: state.entities.user,
        transactions: state.entities.transactions
    }
}

const mapDispatch = dispatch => {
    return {
        allTransactions: () => dispatch(allTransactions())
    }
}

export default connect(mapState, mapDispatch)(Dashboard)

