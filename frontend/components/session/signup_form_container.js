import { connect } from 'react-redux';
import { signup, clearErrors } from '../../actions/session_actions';
import SignupForm from "./signup_form";

const mapState = (state, ownProps) => {
    const formType = "signup";
    const errors = state.errors.session
    return {
        formType,
        errors
    }
}

const mapDispatch = dispatch => {
    return {
        processForm: user => dispatch(signup(user)),
        clearErrors: () => dispatch(clearErrors()),
    }
}

export default connect(mapState, mapDispatch)(SignupForm);