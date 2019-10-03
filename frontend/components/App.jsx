import React from "react";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container"
import NavBarContainer from "./nav/nav_bar_container"
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from "../util/route_util"
import Splash from './splash/splash'
const App = () => (
    <>
        <NavBarContainer />
        <AuthRoute exact path='/' component={Splash} />
        <AuthRoute exact path='/login' component={LoginFormContainer} />
        <AuthRoute exact path='/signup' component={SignupFormContainer} />
    </>
);

export default App;