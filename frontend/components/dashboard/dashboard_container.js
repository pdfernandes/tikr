import { connect } from 'react-redux';
import { allTransactions } from "../../actions/transaction_actions";
import { allCompanies} from "../../actions/company_actions";
import Dashboard from "./dashboard";


const mapState = (state) => {
    debugger
    return {
        user: state.entities.user,
        transactions: state.entities.transactions,
        companies: state.entities.companies,
    }
}

const mapDispatch = dispatch => {
    return {
        allTransactions: () => dispatch(allTransactions()),
        allCompanies: () => dispatch(allCompanies())

    }
}

export default connect(mapState, mapDispatch)(Dashboard)

