import React from 'react';
import ReactDOM from 'react-dom';
import * as SessionAPIUtil from "./util/session_api_util"
import configureStore from "./store/store";
import Root from "./components/root";
import { getAllSecurities, getIntradayPrice, getLastPrice } from "./util/stocks_api_util";



document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root")

    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                user: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }


    ReactDOM.render(<Root store={store} />, root)


})