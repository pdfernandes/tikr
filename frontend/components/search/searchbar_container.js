import { connect } from 'react-redux';
import { allCompanies } from '../../actions/company_actions';
import Searchbar from './searchbar'

const msp = state => {
    return {
        companies: Object.values(state.entities.companies)
    }
}

const mdp = dispatch => {
    return {
        allCompanies: () => dispatch(allCompanies())
    }
}

export default connect(msp, mdp)(Searchbar)