import React from 'react'


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }






    componentDidMount() {
        this.props.allTransactions();
        this.props.allCompanies();
    }
    render () {
        let portfolio = {};

        let { user, companies, transactions } = this.props;
        // debugger

        // if (Object.values(companies).length > 0 && Object.values(transactions.length > 0)) {
        //     user["1"].transactions.forEach(transactionId => {
        //         let transaction = transactions[transactionId]
        //         if (transaction.order_type) {
        //             portfolio[companies[transaction.company_id].name] += transaction.quantity
        //         } else {
        //             portfolio[companies[transaction.company_id].name] += transaction.quantity
        //         }
        //     })
        // }

        return (
            <>
            <h1>Hello from the dashboard</h1>
            </>
        ) 
        
    }
}

export default Dashboard;