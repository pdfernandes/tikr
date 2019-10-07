import React from 'react'
import * as IntrinioAPIUtil from "../../util/intrinio_api_util";
import { Line, Bar } from "react-chartjs-2"



class Dashboard extends React.Component {
    constructor(props) {
        
        super(props);
        this.state = {
            funds: Object.values(this.props.user)[0].funds,
            portfolio: {},
            portfolioValue: Object.values(this.props.user)[0].funds,
            chartData :{
                labels: '1234567'.split(""),
                datasets: [
                    {
                        data: [9, 3, 4, 5, 6, 3, 8]
                    }
                ],
                backgroundColor: ['rgba(20, 30, 50, 0.5)'],
                fill: false,
                pointBackgroundColor: ['rgba(52, 206, 253, 1)'],
                pointBorderColor: ['rgba(52, 206, 253, 0.5)'],
                pointHoverRadius: 10,



            }
        }
        this.buildPortfolio = this.buildPortfolio.bind(this)
        this.calculatePortfolioValue = this.calculatePortfolioValue.bind(this)
    }

    componentDidMount() {
        let userId = Object.values(this.props.user)[0].id
        let companies;
        let transactions;
        Promise.all([this.props.allTransactions(), this.props.allUserCompanies(userId)])
            .then(responseArr => {
                transactions = Object.values(responseArr[0].transactions);
                companies = Object.values(responseArr[1].companies).map(company => company.ticker);
                debugger
                this.props.getLastPrices(companies).then(() => this.buildPortfolio())
                
            })
    }

    buildPortfolio () {
        let { user, companies, transactions } = this.props;
        let portfolio = {};
        user = Object.values(user)[0];

        if (Object.values(companies).length > 0 && Object.values(transactions).length > 0) {
            user.transactions.forEach(transactionId => {
                let transaction = transactions[transactionId];
                let ticker = companies[transaction.company_id].ticker;
                if (transaction.order_type) {
                    portfolio[ticker] === undefined ? portfolio[ticker] = transaction.quantity : portfolio[ticker] += transaction.quantity
                } else {
                    portfolio[ticker] -= transaction.quantity
                }
            })  
            debugger 
            this.setState({
                "portfolio" : portfolio
            },() => {
                this.calculatePortfolioValue();
            })
  
        }

    }

    calculatePortfolioValue () {  
        let { user, portfolio, funds, portfolioValue } = this.state;
        let { prices } = this.props
        let value = 0;
        debugger
        if (Object.keys(prices).length === 0) {
            debugger
            return funds;
        } else {
            prices.forEach(price => {
                value += price.last_price * portfolio[price.security.ticker]
            })
            this.setState({
                portfolioValue: portfolioValue + value
            })
        }

    }


    render () {
        let { portfolio, funds, portfolioValue } = this.state;
        debugger
 
        portfolioValue = portfolioValue.toFixed(2);
        let gain = (portfolioValue - funds).toFixed(2);
        let percentGain = (((portfolioValue / funds )- 1) * 100).toFixed(2);
        return (
            <>
            <div className='portfolio-graph'>
           <Line 
            data={this.state.chartData}
            options={{maintainAspectRatio: true}}
            />
            CHART
            </div>
            
            <p>{portfolioValue}</p>
            <h2>{gain} ({percentGain}%)</h2>
            </>
        ) 
        
    }
}

export default Dashboard;