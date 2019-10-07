import * as IntrinioAPIUtil from "../util/intrinio_api_util";
export const RECEIVE_LAST_PRICES = "RECEIVE_LAST_PRICES";


const receiveLastPrices = prices => {
    prices
    return {
        type: RECEIVE_LAST_PRICES,
        prices
    }
}



export const getLastPrices = arrayOfTickers => dispatch => {
    return Promise.all(arrayOfTickers.map(ticker => IntrinioAPIUtil.getLastPrice(ticker)))
        .then(response => dispatch(receiveLastPrices(response)))   
}
