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

   
   

    render() {
        let git = <a className='github' href="https://github.com/pdfernandes"><i className="fab fa-github"></i></a>;
        let linkedin = <a className='linkedin'href="https://www.linkedin.com/in/phelipe-fernandes-68002b154"><i className="fab fa-linkedin"></i></a>

        if (this.props.currentUser !== null) {
            return (
                <section className='nav-bar'>
                    <div className='left-nav'>
                        <div className='nav-logo'>
                            <Link className='logo-icon' to='/'><i className="fas fa-tenge"></i> </Link>
                            <Link className='logo' to='/'>tikr</Link>
                        </div>
                        <div className='plugs'>
                            {git}
                            {linkedin}
                        </div>
                    </div>
                    <div className='search-bar'>Search Goes Here</div>
                    <button className='logout-button' type="submit" onClick={this.handleClick}>Log Out</button>


                </section>
            )
        } else if (this.props.history.location.pathname === '/login') {
            return (
                <>
                {null}
                </>
            )
        } else if (this.props.history.location.pathname === '/signup'){
            return(
                <section className='nav-bar'>
                    <div className='nav-logo'>
                        <Link className='logo-icon' to='/'><i className="fas fa-tenge"></i> </Link>
                    </div>
                    <div className='right-nav-signup'>
                        <div className='plugs'>
                            {git}
                            {linkedin}
                        </div>
                    </div>
                </section>
            )

        } else {
            return (
                <div className='nav-bar-outer'>
                    <section className='nav-bar'>
                        <div className='left-nav'>
                            <div className='nav-logo'> 
                                    <Link className='logo-icon' to='/'><i className="fas fa-tenge"></i> </Link>
                                    <Link className='logo' to='/'>tikr</Link>
                            </div>
                            <div className='plugs'>
                                {git}
                                {linkedin}
                            </div>
                        </div>
                        <div className="nav-links">
                                <Link className='login-link' to="/login" >Log In</Link>
                                <Link className='signup-link' to="/signup">Sign Up</Link>
                        </div>
                    </section>
                </div>
            )
        }

    }
}


export default NavBar;