import React from 'react';
import { Link } from 'react-router-dom';


const Splash = props => {


    return (
        <div className='splash-container'>
            <div className='splash-container-text'>
                <h1>Invest</h1> 
                <h1>Commision-Free</h1>
                <h2>
                    Invest in <strong>stocks</strong>, <strong>ETFs</strong>, options, and <strong>Cryptocurrencies</strong>
                    , all commision-free, right from your phone or desktop.
                </h2>
                <Link className='splash-signup-link' to="/signup">Sign Up</Link>
            </div>
            <div className='splash-two-phones'></div>
            <div className='cash-management-splash'>
                <div className='cash-management-text'>
                    <h1>Cash management,
                        coming soon.</h1>
                </div>
                <div className='jetpack-pug'></div>
            </div>

        </div>
    )
}


export default Splash;