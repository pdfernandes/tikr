import * as StockNewsAPI from "../util/stock_news_api_util";
export const RECEIVE_NEWS = "RECEIVE_NEWS";

const receiveNews = news => {
    return {
        type: RECEIVE_NEWS,
        articles: news
    }
}


export const getTopNews = () => dispatch => {
    StockNewsAPI.getTopNews()
        .then(response => dispatch(receiveNews(response.articles)))
}