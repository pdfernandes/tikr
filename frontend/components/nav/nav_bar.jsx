import React from 'react';
import { Link } from 'react-router-dom';
import SignupFormContainer from '../session/signup_form_container';
import LoginFormContainer from "../session/login_form_container";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.logout()
            .then(response => this.props.history.push("/login"))
    }

    changeClass(e) {
        
    }

   

    render() {
        if (this.props.currentUser !== null) {
            return (
                <section class='nav-bar'>
                    <div className='nav-logo'>
                        <img className='logo-image' src={window.logo} alt="tikr logo" />
                        <img className='logo-image-green' src={window.logo_green} alt="tikr logo" />
                        <Link className='logo' to='/'>tikr</Link>
                    </div>
                    <div>Search Bar</div>
                    <button type="submit" onClick={this.handleClick}>Log Out</button>


                </section>
            )
        } else if (this.props.history.location.pathname === '/login') {
            return (
                <>
                {null}
                </>
            )
        } else {
            return (
            <section className='nav-bar'>
                <div className='nav-logo'>
                    <img className='logo-image'src={window.logo} alt="tikr logo"/>
                    <img className='logo-image-green'src={window.logo_green} alt="tikr logo"/>
                    <Link className='logo' to='/'>tikr</Link>
                </div>
                <div className="nav-links">
            
                        <Link className='login-link' to="/login" >Log In</Link>
                        <Link className='signup-link' to="/signup">Sign Up</Link>
                 
                </div>
            </section>
            )
        }

    }
}


export default NavBar;