import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import SignupForm from "./signup_form";

const mapState = (state, ownProps) => {
    const formType = "signup";
    const errors = state.session.errors
    return {
        formType,
        errors
    }
}

const mapDispatch = dispatch => {
    return {
        processForm: user => dispatch(signup(user))
    }
}

export default connect(mapState, mapDispatch)(SignupForm);