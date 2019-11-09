import React from 'react';
import { Link } from 'react-router-dom';


const Splash = props => {


    return (
      <>
        <div className="splash-container">
          <div className="commission-free-container">
            <div className="splash-container-text">
              <h1>Invest</h1>
              <h1>Commision-Free</h1>
              <h2>
                Invest in{" "}
                <strong>
                  {" "}
                  <a
                    target="_blank"
                    href="https://www.investopedia.com/terms/s/stock.asp"
                  >
                    stocks
                  </a>
                </strong>
                ,{" "}
                <strong>
                  {" "}
                  <a
                    target="_blank"
                    href="https://www.investopedia.com/terms/e/etf.asp"
                  >
                    ETFs
                  </a>
                </strong>
                , options, and{" "}
                <strong>
                  {" "}
                  <a
                    target="_blank"
                    href="https://www.investopedia.com/terms/c/cryptocurrency.asp"
                  >
                    Cryptocurrencies
                  </a>
                </strong>
                , all commision-free, right from your phone or desktop.
              </h2>
              <Link className="splash-signup-link" to="/signup">
                Sign Up
              </Link>
            </div>

            <div className="splash-two-phones"></div>
          </div>

          <div className="cash-management-splash">
            <div className="cash-management-text">
              <h1>Watch your investments soar!</h1>
            </div>
            <div className="jetpack-pug"></div>
          </div>
          <div className="splash-assets">
            <div className="splash-assets-content">
              <div className="stocks-img"></div>
              <h1>Stocks</h1>
              <p>
                Invest in companies you love and build out your perfect
                portfolio.
              </p>
              {/* <p className='splash-links'>Learn about stocks</p> */}
              <a
                className="splash-links"
                target="_blank"
                href="https://www.investopedia.com/terms/s/stock.asp"
              >
                Learn about stocks
              </a>
            </div>
            <div className="splash-assets-content">
              <div className="etfs-img"></div>
              <h1>ETFs</h1>
              <p>
                Diversify your holdings by buying into a bundle of stocks in a
                single investment.
              </p>
              {/* <p className="splash-links">Learn about ETFs</p> */}
              <a
                className="splash-links"
                target="_blank"
                href="https://www.investopedia.com/terms/e/etf.asp"
              >
                Learn about ETFs
              </a>
            </div>
            <div className="splash-assets-content">
              <div className="options-img"></div>
              <h1>Options</h1>
              <p>
                Options let you go long on stocks you believe in and short the
                ones you don’t.
              </p>
              {/* <p className="splash-links">Learn about options</p> */}
              <a
                className="splash-links"
                target="_blank"
                href="https://www.investopedia.com/terms/o/option.asp"
              >
                Learn about options
              </a>
            </div>
            <div className="splash-assets-content">
              <div className="crypto-img"></div>
              <h1>Crypto</h1>
              <p>
                Tap into the cryptocurrency market to trade{" "}
                <strong>
                  <a
                    target="_blank"
                    href="https://www.investopedia.com/terms/b/bitcoin.asp"
                  >
                    Bitcoin
                  </a>
                </strong>
                ,{" "}
                <strong>
                  <a
                    target="_blank"
                    href="https://www.investopedia.com/terms/e/ethereum.asp"
                  >
                    Ethereum
                  </a>
                </strong>
                , and{" "}
                <strong>
                  <a
                    target="_blank"
                    href="https://www.investopedia.com/tech/most-important-cryptocurrencies-other-than-bitcoin/"
                  >
                    more
                  </a>
                </strong>
                , 24/7.
              </p>
              {/* <p className="splash-links">Learn about crypto</p> */}
              <a
                className="splash-links"
                target="_blank"
                href="https://www.investopedia.com/terms/c/cryptocurrency.asp"
              >
                Learn about crypto
              </a>
            </div>
          </div>
          <div className="no-manual-needed">
            <div className="white-phone"></div>
            <div className="white-phone-text">
              <div>
                <h1>No Manual Needed</h1>
                <p>
                  Intuitively designed for newcomers and experts alike, tikr
                  gives you a clear picture of your portfolio’s performance over
                  time, so you can adjust your positions and learn by doing.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="next-level-investing">
          <div className="next-level-img"></div>
          <div className='next-level-text-container'>
            <div className="next-level-text">
                <h1>Next Level Investing</h1>
                <p>
                Access professional research reports, trade on margin, and make
                bigger instant deposits with tikr Premium—all starting at $0 a
                month.
                </p>
                <div>
                {" "}
                <Link to="/signup">Sign Up</Link>
                </div>
            </div>

          </div>
        </div>
        <div className="keep-tabs-outer">
          <div className="keep-tabs">
            <div className="keep-tabs-text">
              <h1>Keep Tabs on the Market</h1>
              <p>
                Access tools and features such as price movement notifications
                and customized investment news so you can find the right moment
                to invest.
              </p>
            </div>
            <div className="keep-tabs-img"></div>
          </div>
        </div>
        <div className="trusted-by-millions-container">
          <div className="trusted-by-millions">
            <div className="eagle"></div>
            <h1>Trusted by Millions in the USA</h1>
            <p>
              SIPC protects the securities of its members up to $500,000
              (including $250,000 for claims for cash). Learn more at <br />
              <strong>
                <a target="_blank" href="https://www.sipc.org/">
                  www.sipc.org
                </a>
              </strong>
            </p>
          </div>
        </div>

        <div className="get-started-container">
          <div className="get-started">
            <h1>Get Started</h1>
            <p>
              It only takes a few minutes to take control of your financial
              future. Sign up now to start investing with tikr.
            </p>
            <Link className="splash-signup-link white" to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </>
    );
}


export default Splash;