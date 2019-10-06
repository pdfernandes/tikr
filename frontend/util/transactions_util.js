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


//to calculate portfolio value iterate through users transactions and find a net buy order & 
// quantities determine what stock they belong to then add the current price * quantity of said asset to the portfolio balance

//on the purchase of a security subtract that security from the funds of the individual.