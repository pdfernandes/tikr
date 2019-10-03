import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import NavBar from './nav_bar';
import { withRouter } from "react-router-dom";

const mapState = (state) => {
    return {
        currentUser: state.session.id
    }
}


const mapDispatch = dispatch => {

    return {
        logout: () => dispatch(logout())
    }

}

export default withRouter(
    connect(mapState, mapDispatch)(NavBar)
    );