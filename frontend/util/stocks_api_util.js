export const apiKey = "OmU4MDMzZmM5MjE3YWU2YjEyNjA0YzIxZjlmMmQ4MWE1"

// const https = require("https")
//daily prices

export const getAllSecurities = (ticker, frequency, start, end) => {
    // let date = new Date()
    // let end = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    debugger
    return $.ajax({
        method: "GET",
        url: `https://api-v2.intrinio.com/securities/${ticker}/historical_data/adj_close_price?frequency=${frequency}&start_date=${start}&end_date=${end}&api_key=${apiKey}`
    })
}


export const getIntradayPrice = (ticker, next_page) => {
    let next;
    if (next_page) {
        next = `&next_page=${next_page}`
    } else {
        next = ''
    }
    let date = new Date()
    date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

    return $.ajax({
        method: "GET",
        url: `https://api-v2.intrinio.com/securities/${ticker}/prices/intraday?source=iex&start_date=${date}&start_time=13&api_key=${apiKey}${next}`
    }).then(response => {
        while (response.next_page !== null) {
            return getIntradayPrice(ticker, response.next_page)
        }
    })
}

export const getLastPrice = (ticker) => {
    return $.ajax({
        method:"GET",
        url: `https://api-v2.intrinio.com/securities/${ticker}/prices/realtime?source=iex&api_key=${apiKey}`
    })
}







// `https://api-v2.intrinio.com/securities/${ticker}/prices?end_date=${date}&frequency=${frequency}y&api_key=${apiKey}`
// refer to site for help: https://docs.intrinio.com/documentation/web_api/get_security_stock_prices_v2?values=eyJpZGVudGlmaWVyIjoiQUFQTCIsInN0YXJ0X2RhdGUiOm51bGwsImVuZF9kYXRlIjoiMjAxOS0wOS0zMCIsImZyZXF1ZW5jeSI6InF1YXJ0ZXJseSIsInBhZ2Vfc2l6ZSI6bnVsbCwibmV4dF9wYWdlIjpudWxsfQ%3D%3D
//weekly



//monthly



//3-month (quarterly)



//yearly



//All

