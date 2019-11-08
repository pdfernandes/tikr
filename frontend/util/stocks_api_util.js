// import { apiKey, iexKey, iexKeyProduction, intrinioAPIProduction } from '../../api_keys';
export const apiKey = "OmU4MDMzZmM5MjE3YWU2YjEyNjA0YzIxZjlmMmQ4MWE1";
export const iexKey = "Tpk_8af615155092418191683b2478cb6bfd";

// export const getAllSecurities = (ticker, frequency, start, end) => {
//     return $.ajax({
//         method: "GET",
//         url: `https://api-v2.intrinio.com/securities/${ticker}/historical_data/adj_close_price?frequency=${frequency}&start_date=${start}&end_date=${end}&api_key=${apiKey}`
//     })
// }


// export const getIntradayPrice = (ticker, next_page) => {
//     let next;
//     if (next_page) {
//         next = `&next_page=${next_page}`
//     } else {
//         next = ''
//     }
//     let date = new Date()
//     date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

//     return $.ajax({
//         method: "GET",
//         url: `https://api-v2.intrinio.com/securities/${ticker}/prices/intraday?source=iex&start_date=${date}&start_time=13&api_key=${apiKey}${next}`
//     }).then(response => {
//         while (response.next_page !== null) {
//             return getIntradayPrice(ticker, response.next_page)
//         }
//     })
// }

export const getLastPrice = (ticker) => {
    return $.ajax({
        method:"GET",
        url: `https://api-v2.intrinio.com/securities/${ticker}/prices/realtime?source=iex&api_key=${apiKey}`
    })
}

export const fetchHistoricalPrices = (ticker, range) => {
    return $.ajax({
        method:"GET",
        url: `https://sandbox.iexapis.com/stable/stock/${ticker}/chart/${range}?token=${iexKey}`
    })
}

export const getIntradayPrices = ticker => {
    return $.ajax({
        method: "GET",
        url: `https://sandbox.iexapis.com/stable/stock/${ticker}/intraday-prices/?token=${iexKey}`
    })
}



export const getCompanyInfo = ticker => {
    return $.ajax({
        method: "GET",
        url: `https://sandbox.iexapis.com/stable/stock/${ticker}/company/?token=${iexKey}`
    })
}

export const getCompanyName = ticker => {
    return $.ajax({
        method:"GET",
        url: `https://sandbox.iexapis.com/stable/stock/${ticker}/company?filter=companyName&token=${iexKey}`
    })
}

//production

// export const fetchHistoricalPrices = (ticker, range) => {
//     return $.ajax({
//       method: "GET",
//       url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/${range}?token=${iexKeyProduction}`
//     });
// }

// export const getIntradayPrices = ticker => {
//     return $.ajax({
//       method: "GET",
//       url: `https://cloud.iexapis.com/stable/stock/${ticker}/intraday-prices/?token=${iexKeyProduction}`
//     });
// }



// export const getCompanyInfo = ticker => {
//     return $.ajax({
//       method: "GET",
//       url: `https://cloud.iexapis.com/stable/stock/${ticker}/company/?token=${iexKeyProduction}`
//     });
// }

// export const getCompanyName = ticker => {
//     return $.ajax({
//       method: "GET",
//       url: `https://cloud.iexapis.com/stable/stock/${ticker}/company?filter=companyName&token=${iexKeyProduction}`
//     });
// }



