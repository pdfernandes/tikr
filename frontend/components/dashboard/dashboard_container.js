import { connect } from 'react-redux';
import { allTransactions } from "../../actions/transaction_actions";
import { allUserCompanies } from "../../actions/company_actions";
import { getLastPrices } from "../../actions/stocks_actions"
import Dashboard from "./dashboard";


const mapState = (state) => {
    return {
        user: Object.values(state.entities.user)[0],
        transactions: Object.values(state.entities.transactions),
        companies: state.entities.companies,
        prices: state.entities.prices,
    }
}

const mapDispatch = dispatch => {
    return {
        allTransactions: () => dispatch(allTransactions()),
        allUserCompanies: id => dispatch(allUserCompanies(id)),
        getLastPrices: arrayOfTickers => dispatch(getLastPrices(arrayOfTickers))

    }
}

export default connect(mapState, mapDispatch)(Dashboard)

