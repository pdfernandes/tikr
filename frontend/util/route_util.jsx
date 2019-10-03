import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapState = state => {
    return { loggedIn: state.session.id}
}
const Auth = ({ component: Component, path, loggedIn, exact }) => (
    <Route
        path={path}
        exact= {exact}
        render={props =>
            !loggedIn ? <Component {...props} /> : <Redirect to="/" />
        }
    />
);


export const AuthRoute = withRouter(
    connect(
        mapState,
        null
    )(Auth)
);


const Protected = ({ component: Component, path, loggedIn, exact }) => (
    <Route
        path={path}
        exact={exact}
        render={props =>
            loggedIn ? <Component {...props} /> : <Redirect to="/" />
        }
    />
);



export const ProtectedRoute = withRouter(
    connect(
        mapState,
        null
    )(Protected)
);