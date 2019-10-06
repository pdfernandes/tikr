import React from 'react';
import ReactDOM from 'react-dom';
import * as SessionAPIUtil from "./util/session_api_util"
import configureStore from "./store/store";
import Root from "./components/root";
import { getAllSecurities, getIntradayPrice, getLastPrice } from "./util/intrinio_api_util";


window.getAllSecurities = getAllSecurities;
window.getIntradayPrice = getIntradayPrice;
window.getLastPrice = getLastPrice;

// var https = require("https");

// var request = https.request({
//     method: "GET",
//     host: "api-v2.intrinio.com",
//     path: "/companies/AAPL?api_key=OmU4MDMzZmM5MjE3YWU2YjEyNjA0YzIxZjlmMmQ4MWE1"
// }, function (response) {
//     var json = "";
//     response.on('data', function (chunk) {
//         json += chunk;
//     });
//     response.on('end', function () {
//         var company = JSON.parse(json);
//         console.log(company);
//     });
// });

// request.end();

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root")
    
    // BEGIN TEST
    // window.login = SessionAPIUtil.login;
    // const store = configureStore()
    // window.getState = store.getState;
    // window.dispatch = store.dispatch;
    
    //END TEST
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