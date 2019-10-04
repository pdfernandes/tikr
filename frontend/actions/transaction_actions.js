import * as TransactionsAPIUtil from "../util/transactions_util";
export const RECEIVE_TRANSACTION = "RECEIVE_TRANSACTION";
export const RECEIVE_TRANSACTIONS = "RECEIVE_TRANSACTIONS";


const receiveTransaction = transaction => {
    return {
        type: RECEIVE_TRANSACTION,
        transaction
    } 
}

const receiveTransactions = transactions => {
    return {
        type: RECEIVE_TRANSACTIONS,
        transactions
    }
}

export const transact = transaction => dispatch => {
    return TransactionsAPIUtil.transact(transaction)
        .then(transaction => dispatch(receiveTransaction(transaction)));
}

export const allTransactions = () => dispatch => {
    return TransactionsAPIUtil.allTransactions()
        .then(transactions => dispatch(receiveTransactions(transactions)));
}