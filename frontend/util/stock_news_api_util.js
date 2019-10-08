export const getTopNews = () => {
    return $.ajax ({
        method: "GET",
        url: 'https://newsapi.org/v2/top-headlines?country=us&apiKey=a9ce65ec9b19425baf27277e97aa1775',
    })
}