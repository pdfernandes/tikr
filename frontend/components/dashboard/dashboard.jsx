import React from 'react'
import * as StocksAPIUtil from "../../util/stocks_api_util";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

//this component is in charge of making and showing the graph

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            funds: this.props.user.funds,
            portfolio: {},
            portfolioValue: this.props.user.funds,
            frequency: "1d"
        }
        this.buildPortfolio = this.buildPortfolio.bind(this);
        this.calculatePortfolioValue = this.calculatePortfolioValue.bind(this);
        this.chartData = this.chartData.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        let userId = this.props.user.id
        let companies;
        let transactions;
        Promise.all([this.props.allTransactions(), this.props.allUserCompanies(userId)])
            .then(responseArr => {
                transactions = Object.values(responseArr[0].transactions);
                companies = Object.values(responseArr[1].companies).map(company => company.ticker)
                this.props.getLastPrices(companies).then(() => this.buildPortfolio())  
            })

    }

    buildPortfolio (time = "all") {
        let { user, companies, transactions } = this.props;
        let portfolio = {};
        // user = Object.values(user)[0];

        if (Object.values(companies).length > 0 && Object.values(transactions).length > 0) {
            user.transactions.forEach(transactionId => {
                let transaction = transactions[transactionId];
                let ticker = companies[transaction.company_id].ticker;
                let desiredTime = this.determineTime(time);
                debugger
                if (new Date(Date.parse(transaction.transaction_time)) > desiredTime) {
                    debugger
                    if (transaction.order_type) {
                        portfolio[ticker] === undefined ? portfolio[ticker] = transaction.quantity : portfolio[ticker] += transaction.quantity
                    } else {
                        portfolio[ticker] -= transaction.quantity
                    }
                }
                debugger
            })  
            this.setState({
                "portfolio" : portfolio
            },() => {
                debugger
                this.calculatePortfolioValue(this.state.portfolio, this.state.frequency);
            })
  
        }

    }
    setFrequency(time) {
        let frequency;
        if (time === "1d") {
           frequency = 'daily';
        } else if (time === '1w') {
            frequency = 'weekly';
        } else if (time === "1m") {
            frequency = "monthly";
        } else if (time === "3m") {
            frequency = "monthly";
        } else if (time === '1yr') {
            frequency = 'yearly';
        } else {
            frequency = 'yearly';
        }
        return frequency;
    }

    determineTime(time) {
        let timeSpan = new Date();
        if (time === "1d") {
            timeSpan.setHours(0, 0, 0)
        } else if (time === '1w') {
            timeSpan.setDate(timeSpan.getDate() - 7)
        } else if (time === "1m") {
            timeSpan.setMonth(timeSpan.getMonth() - 1)
        } else if (time === "3m") {
            timeSpan.setMonth(timeSpan.getMonth() - 3)
        } else if (time === '1yr') {
            timeSpan.setYear(timeSpan.getYear() - 1)
        } else {
            timeSpan = timeSpan.setYear(timeSpan.getYear() - 30)
        }
        return timeSpan

    }

    calculatePortfolioValue (portfolio, frequency) {  
        let { funds, portfolioValue } = this.state;
        let { prices } = this.props
        let value = 0;
        debugger
        if (Object.keys(portfolio).length === 0) {
            
            return funds;
        } else {
            prices.forEach(price => {
                value += price.last_price * portfolio[price.security.ticker]
                debugger
            })
            this.setState({
                portfolioValue: portfolioValue + value
            })

            //possibly call the success callback after the set state is complete??
        }


    }

    chartData(frequency = "1d") {
        let data = [];
        const { user, transactions } = this.props;
        user.transactions.forEach(transactionId => {
            let transaction = transactions[transactionId]
            if (transaction.order_type) {
                data.push({
                    time: transaction.transaction_type,
                    price: (transaction.quantity) * 3

                })
            }
        })


        return data;
    }

    handleClick(e) {
        e.preventDefault();
        this.buildPortfolio(e.target.value)
    }



    render () {
        let { funds, portfolioValue } = this.state;
        let chart;
       if (Object.values(this.props.prices).length === 0) {
            chart = null
        } else {
           chart = (<LineChart
               width={730}
               height={250}
               data={this.chartData()}
            >
               <XAxis dataKey="time" hide="true" />
               <YAxis dataKey="price" hide="true" />
               <Tooltip />
               <Line type="monotone" dataKey="price" stroke="#34ce99" strokeWidth='4' />



           </LineChart>)
        }


 
        portfolioValue = portfolioValue.toFixed(2);
        let gain = (portfolioValue - funds).toFixed(2);
        let percentGain = (((portfolioValue / funds )- 1) * 100).toFixed(2);
        return (
            <>
            <div className='portfolio-graph'>
                {chart}
                



            </div>
            
            <p>{portfolioValue}</p>
            <h2>{gain} ({percentGain}%)</h2>
            </>
        ) 
        
    }
}

export default Dashboard;