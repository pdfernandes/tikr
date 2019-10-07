import React from 'react'
import * as IntrinioAPIUtil from "../../util/intrinio_api_util";


class Dashboard extends React.Component {
    constructor(props) {
        
        super(props);
        this.state = {
            funds: Object.values(this.props.user)[0].funds,
            portfolio: {},
            portfolioValue: Object.values(this.props.user)[0].funds,
        }
        this.buildPortfolio = this.buildPortfolio.bind(this)
        this.calculatePortfolioValue = this.calculatePortfolioValue.bind(this)
    }

    componentDidMount() {
        
        this.props.allTransactions();
        this.props.allCompanies();
        
    }

    buildPortfolio (prevProps) {
        let { user, companies, transactions } = this.props;
        let portfolio = {};
        user = Object.values(user)[0];
        let prevPropsTransactions = Object.values(prevProps.transactions).length;
        let currentPropsTransactions = Object.values(this.props.transactions).length;

        if (Object.values(companies).length > 0 && Object.values(transactions).length > 0 && prevPropsTransactions < currentPropsTransactions) {
            user.transactions.forEach(transactionId => {
                let transaction = transactions[transactionId];
                let ticker = companies[transaction.company_id].ticker;
                if (transaction.order_type) {
                    portfolio[ticker] === undefined ? portfolio[ticker] = transaction.quantity : portfolio[ticker] += transaction.quantity
                } else {
                    portfolio[ticker] -= transaction.quantity
                }
            })           
            this.setState({
                "portfolio" : portfolio
            }, () => {
                this.calculatePortfolioValue();
            })

            
        }

    }

    calculatePortfolioValue () {
        
        let { portfolio, funds, portfolioValue } = this.state;
        let value = 0;
        if (Object.keys(portfolio).length === 0) {
            this.setState({
                "portfolioValue": portfolioValue + value
            })
        } else { 
            Promise.all(Object.keys(portfolio).map(ticker => IntrinioAPIUtil.getLastPrice(ticker))).then(responseArr => {
                responseArr.forEach(response => {
                    value += response.last_price * portfolio[response.security.ticker];    
                }) 
                this.setState({
                    "portfolioValue": portfolioValue + value
                })
            });
        }
    }



    componentDidUpdate (prevProps) {
        
        this.buildPortfolio(prevProps)
    }

    render () {
        
        let { portfolioValue, funds } = this.state;
        portfolioValue = portfolioValue.toFixed(2);
        let gain = (portfolioValue - funds).toFixed(2);
        let percentGain = ((portfolioValue / funds )- 1).toFixed(2);
        return (
            <>
            <h1>Hello from the dashboard</h1>
            <p>{portfolioValue}</p>
            <h2>{gain} ({percentGain}%)</h2>
            </>
        ) 
        
    }
}

export default Dashboard;