import * as StocksAPIUtil from "../util/stocks_api_util";
export const RECEIVE_LAST_PRICES = "RECEIVE_LAST_PRICES";
export const RECEIVE_HISTORICAL_PRICES = "RECEIVE_HISTORICAL_PRICES";


const receiveLastPrices = prices => {
    return {
        type: RECEIVE_LAST_PRICES,
        prices
    }
}



export const getLastPrices = arrayOfTickers => dispatch => {
    return Promise.all(arrayOfTickers.map(ticker => StocksAPIUtil.getLastPrice(ticker)))
        .then(response => dispatch(receiveLastPrices(response)))   
}


// export const getAllSecurities = (ticker, frequency) => {
//     return StocksAPIUtil.getAllSecurities(ticker, frequency)
//         .then(data => )
// }
