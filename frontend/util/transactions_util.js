export const transact = transaction => {
    return $.ajax({
        method: "POST",
        url: '/api/transactions',
        data: {
            transaction
        }
    })
}


export const allTransactions = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/transactions'
    })
}