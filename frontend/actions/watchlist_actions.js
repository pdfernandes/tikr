import * as WatchlistAPIUtil from '../util/watchlist_util';
export const RECEIVE_ALL_WATCHLIST_ITEMS = "RECEIVE_ALL_WATCHLIST_ITEMS";
export const RECEIVE_WATCHLIST_ITEM = "RECEIVE_WATCHLIST_ITEM";
export const REMOVE_WATCHLIST_ITEM = "REMOVE_WATCHLIST_ITEM";




const receiveAllWatchlistItems = watchlist => {
    return {
        type: RECEIVE_ALL_WATCHLIST_ITEMS,
        watchlist
    }
}

const receiveWatchlistItem = item => {
    return {
        type: RECEIVE_WATCHLIST_ITEM,
        item
    }
}
const removeWatchlistItem = item => {
    return {
        type: REMOVE_WATCHLIST_ITEM,
        item
    }
}





export const allWatchlistItems = () => dispatch => {
    // debugger
    return WatchlistAPIUtil.allWatchlistItems()
    .then(watchlist => dispatch(receiveAllWatchlistItems(watchlist)))
}

export const postWatchlistItem = item => dispatch => {
    return WatchlistAPIUtil.postWatchlistItem(item)
    .then(item => dispatch(receiveWatchlistItem(item)))
}

export const deleteWatchlistItem = id => dispatch => {
    return WatchlistAPIUtil.deleteWatchlistItem(id)
    .then(item => dispatch(removeWatchlistItem(item)))
}