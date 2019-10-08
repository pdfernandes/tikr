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
            portfolioValuesArray: [],
            timeFrame: "1yr"
        }
        this.buildPortfolio = this.buildPortfolio.bind(this);
        this.calculatePortfolioValue = this.calculatePortfolioValue.bind(this);
        this.chartData = this.chartData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.runningPortfolioTotal = this.runningPortfolioTotal.bind(this);
        this.formatStartDate = this.formatStartDate.bind(this);
    }

    componentDidMount() {
        let userId = this.props.user.id
        let companies;
        let transactions;
        Promise.all([this.props.allTransactions(), this.props.allUserCompanies(userId)])
            .then(responseArr => {
                transactions = Object.values(responseArr[0].transactions);
                companies = Object.values(responseArr[1].companies).map(company => company.ticker)
                this.props.getLastPrices(companies).then(() => this.buildPortfolio(this.state.timeFrame))
            })

    }

    buildPortfolio(time = this.state.timeFrame) {
        let { user, companies, transactions } = this.props;
        let portfolio = {};
        // user = Object.values(user)[0];
        let transactionTimeFrame = []

        if (Object.values(companies).length > 0 && Object.values(transactions).length > 0) {
            user.transactions.forEach(transactionId => {
                let transaction = transactions[transactionId];
                let ticker = companies[transaction.company_id].ticker;
                let desiredTime = this.determineTime(time);

                if (new Date(Date.parse(transaction.transaction_time)) > desiredTime) {
                    if (transaction.order_type) {
                        portfolio[ticker] === undefined ? portfolio[ticker] = transaction.quantity : portfolio[ticker] += transaction.quantity
                    } else {
                        portfolio[ticker] -= transaction.quantity
                    }
                    //array will have all possible transactions woth company ids
                    //pass in {ticker: aapl, date: date, quantity: amount}
                    transactionTimeFrame.push({ 'ticker': ticker, "date": transaction.transaction_time, quantity: transaction.quantity, order_type: transaction.order_type })
                }
            })
            
            this.setState({
                "portfolio": portfolio,
                "transactionTimeFrame": transactionTimeFrame
            }, () => {
                
                this.calculatePortfolioValue(this.state.portfolio, this.state.timeFrame);
            })

        }

    }
    setFrequency(timeFrame) {
        let frequency;
        if (timeFrame === "1d") {
            frequency = 'intraday';
        } else if (timeFrame === '1w') {
            frequency = 'daily';
        } else if (timeFrame === "1m") {
            frequency = "daily";
        } else if (timeFrame === "3m") {
            frequency = "daily";
        } else if (timeFrame === '1yr') {
            frequency = 'quarterly';
        } else {
            frequency = 'quarterly';
        }
        return frequency;
    }

    determineTime(time) {
        let timeSpan = new Date();
        debugger
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


    formatStartDate(date) {
        let time = this.state.timeFrame
        let timeSpan = new Date(date);
        debugger
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
        let year = timeSpan.getFullYear()
        let month = timeSpan.getMonth();
        let day = timeSpan.getDate();
        
        return `${year}-${month + 1}-${day}`
    }


    calculatePortfolioValue(portfolio, timeFrame) {
        
        // portfolio shape {AAPL : 30}
        let { funds, portfolioValue } = this.state;
        let { prices } = this.props
        let value = 0;
        let frequency = this.setFrequency(timeFrame);
        
        if (Object.keys(portfolio).length === 0) {

            return funds;
        } else {
            let tickersArray = Object.keys(portfolio)
            if (timeFrame === "1d") {
                console.log("1d")
            } else {
                
                Promise.all(
                    this.state.transactionTimeFrame.map(transaction => {
                        let date = new Date()
                        let year = date.getFullYear()
                        let month = date.getMonth();
                        let day = date.getDate();
                        let end_date = `${year}-${month}-${day}`
                        let start_date = this.formatStartDate(end_date)
                        debugger
                        // date = transaction.date.split("-")
                        // let year = date.pop()
                        // date.unshift(year)
                        // date = date.join("-")
                        
                        
                        return StocksAPIUtil.getAllSecurities(transaction.ticker, frequency, start_date, end_date)
                    })
                
                ).then(response => {
                    this.runningPortfolioTotal(response)
                })
            }

            // prices.forEach(price => {
            //     value += price.last_price * portfolio[price.security.ticker]
            //     
            // })
            // this.setState({
            //     portfolioValue: portfolioValue + value
            // })

            //possibly call the success callback after the set state is complete??
        }


    }

    runningPortfolioTotal(arrayOfHistories) {
        
        let formatedHistory = {};
        arrayOfHistories.forEach(history => {
            formatedHistory[history.security.ticker] = history.historical_data.reduce((obj, item) => {
                obj[item.date] = item.value
                return obj
            }, {})
        })
        debugger
        let portfolioValues = {};
        let portfolioValuesArray = [];
        let dates = arrayOfHistories[0].historical_data.map(obj => obj.date).reverse()

        for (let i = 0; i < dates.length; i++) {
            const date = dates[i];
            
            for (let j = 0; j < this.state.transactionTimeFrame.length; j++) {
                const transaction = this.state.transactionTimeFrame[j];
               
                if (new Date(transaction.date) >= new Date(date)) {
                   
                    if (portfolioValues[transaction.ticker] === undefined && transaction.order_type) {
                        portfolioValues[date] = transaction.quantity * formatedHistory[transaction.ticker][date]
                    } else if (portfolioValues[transaction.ticker] === undefined && transaction.order_type === false) {
                        portfolioValues[date] = transaction.quantity * formatedHistory[transaction.ticker][date] * -1;
                    } else if (transaction.order_type) {
                        portfolioValues[date] += (transaction.quantity * formatedHistory[transaction.ticker][date])
                    } else {
                        portfolioValues[date] -= (transaction.quantity * formatedHistory[transaction.ticker][date])
                    }


                }

                
            }
            
        }
        debugger

        for (let date in portfolioValues) {
            
            portfolioValuesArray.push({
                date,
                value : portfolioValues[date],
            })
        }
        
        this.setState({ "portfolioValuesArray" : portfolioValuesArray })

    }


    chartData() {
        let data = this.state.portfolioValuesArray
        return data;
    }

    handleClick(e) {
        debugger
        // e.preventDefault();
        this.setState({timeFrame : e.target.value}, () => {
            this.buildPortfolio()
        })
        
    }



    render() {
        debugger
        let { funds, portfolioValue } = this.state;
        let chart;
        if (this.state.portfolioValuesArray.length === 0) {
            
            chart = this.state.funds
        } else {
           
            chart = (
                 <>
            <LineChart
                width={730}
                height={250}
                data={this.state.portfolioValuesArray}
            >
                <XAxis dataKey="date" hide={true}/>
                <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#34ce99" strokeWidth='4' dot={false} />



            </LineChart>
            <button onClick={this.handleClick} value="1m">1m</button>
            <button onClick={this.handleClick} value='3m'>3m</button>
            <button onClick={this.handleClick} value='1yr'>1yr</button>
            {/* <button onClick={this.handleClick} value='all'>All</button> */}
            </>
            )
        }



        // portfolioValue = portfolioValue.toFixed(2);
        // let gain = (portfolioValue - funds).toFixed(2);
        // let percentGain = (((portfolioValue / funds) - 1) * 100).toFixed(2);
        return (
            <>
                <div className='portfolio-graph'>
                    {chart}
                </div>
{/* 
                <p>{portfolioValue}</p>
                <h2>{gain} ({percentGain}%)</h2> */}
            </>
        )

    }
}

export default Dashboard;