// import { newsAPIKey } from '../../api_keys';
export const newsAPIKey = "a9ce65ec9b19425baf27277e97aa1775";
export const getTopNews = (query) => {
    
    return $.ajax ({
        method: "GET",
        url: `https://newsapi.org/v2/everything${query}&sortBy=publishedAt&apiKey=${newsAPIKey}`,
    })
}

// https://newsapi.org/v2/everything?q=aapl&from=2019-09-10&sortBy=publishedAt&apiKey=a9ce65ec9b19425baf27277e97aa1775