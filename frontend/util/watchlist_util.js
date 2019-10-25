import { watch } from "fs"

export const allWatchlistItems = () => {
    return $.ajax({
        method: "GET",
        url: "/api/watchlists"
    })
}


export const postWatchlistItem = watchlistItem => {
    return $.ajax({
        method: "POST",
        url: "/api/watchlists",
        data: {
            watchlistItem
        }
    })
}


export const deleteWatchlistItem = id => {
    return $.ajax({
        method: "DELETE",
        url: `api/watchlists/${id}`
    })
}