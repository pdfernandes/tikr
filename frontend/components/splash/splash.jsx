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
            <div className='splash-assets'>
                <div className='splash-assets-content'>
                    <div className='stocks-img'></div>
                    <h1>Stocks</h1>
                    <p>Invest in companies you love and build out your perfect portfolio.</p>
                    <p className='splash-links'>Learn about stocks</p>
                </div>
                <div className='splash-assets-content'>
                    <div className='etfs-img'></div>
                    <h1>ETFs</h1>
                    <p>Diversify your holdings by buying into a bundle of stocks in a single investment.</p>
                    <p className='splash-links'>Learn about ETFs</p>
                </div>
                <div className='splash-assets-content'>
                    <div className='options-img'></div>
                    <h1>Options</h1>
                    <p>Choose to go long on stocks you believe in and short the ones you don’t.</p>
                    <p className='splash-links'>Learn about options</p>
                </div>
                <div className='splash-assets-content'>
                    <div className='crypto-img'></div>
                    <h1>Crypto</h1>
                    <p>Tap into the cryptocurrency market to trade <strong>Bitcoin</strong>, <strong>Ethereum</strong>, and <strong>more</strong>, 24/7.</p>
                    <p className='splash-links'>Learn about crypto</p>
                </div>
            </div>
            <div className='no-manual-needed'>
                <div className='white-phone'></div>
                <div className='white-phone-text'>
                    <h1>No Manual Needed</h1>
                    <p>
                        Intuitively designed for newcomers and experts alike, Robinhood gives you a clear picture of your portfolio’s performance over time,
                        so you can adjust your positions and learn by doing.
                    </p>
                </div>

            </div>

        </div>
    )
}


export default Splash;