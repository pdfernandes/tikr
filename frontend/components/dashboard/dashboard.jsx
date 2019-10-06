import React from 'react'


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        debugger
    }



    componentDidMount() {
    this.props.allTransactions();
    this.props.allCompanies();
        
    }

    render () {
        return <h1>Hello from the dashboard</h1>
    }
}

export default Dashboard;