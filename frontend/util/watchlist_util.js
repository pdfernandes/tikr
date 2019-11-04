export const allWatchlistItems = () => {
    // debugger
    return $.ajax({
        method: "GET",
        url: "/api/watchlists"
    })
}


export const postWatchlistItem = watchlist => {
    return $.ajax({
        method: "POST",
        url: "/api/watchlists",
        data: {
            watchlist
        }
    })
}


export const deleteWatchlistItem = id => {
    return $.ajax({
        method: "DELETE",
        url: `api/watchlists/${id}`
    })
}