import React from 'react'


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    this.props.allTransactions()
        debugger
    }

    render () {
        return <h1>Hello from the dashboard</h1>
    }
}

export default Dashboard;