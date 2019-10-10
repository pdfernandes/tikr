import React from "react";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import NavBarContainer from "./nav/nav_bar_container";
import DashboardContainer from "./dashboard/dashboard_container";
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import Splash from './splash/splash';
import NewsContainer from './news/news_container';
import WatchlistContainer from "./watchlist/watchlist_container";
import CompanyContainer from './company/company_container';
import CompanyInfo from "./company/company_info";
import TransactionFormContainer from './transactions/transaction_form_container'

const App = () => (
    <>
        <NavBarContainer />
        <AuthRoute exact path='/' component={Splash} />
        <AuthRoute exact path='/login' component={LoginFormContainer} />
        <AuthRoute exact path='/signup' component={SignupFormContainer} />
        <div className="company-show">
            <div className='company-show-main'>
                <ProtectedRoute exact path='/stocks/:ticker' component={CompanyContainer} />
                <ProtectedRoute exact path='/stocks/:ticker' component={CompanyInfo} />
                <ProtectedRoute exact path='/stocks/:ticker' component={NewsContainer} />
            </div>
            <div className='company-show-transactions'>
                <ProtectedRoute exact path='/stocks/:ticker' component={TransactionFormContainer} />   
            </div>
        </div>
        <div className='homepage'> 
            <div className='homepage-main'>
                <ProtectedRoute exact path='/' component={DashboardContainer} />
                <ProtectedRoute exact path='/' component={NewsContainer} />
            </div>
            <div className='homepage-watchlist'>
                <ProtectedRoute exact path='/' component={WatchlistContainer} />
            </div>
        </div>
    </>
);

export default App;