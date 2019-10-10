import React from 'react'
import * as StocksAPIUtil from "../../util/stocks_api_util";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from './tooltip_content';
import Odometer from 'react-odometerjs';

//this component is in charge of making and showing the graph

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            funds: this.props.user.funds,
            portfolio: {},
            portfolioValue: this.props.user.funds,
            portfolioValuesArray: [],
            timeFrame: "1Y",
            value: 0,
        }
        this.buildPortfolio = this.buildPortfolio.bind(this);
        this.calculatePortfolioValue = this.calculatePortfolioValue.bind(this);
        this.chartData = this.chartData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.runningPortfolioTotal = this.runningPortfolioTotal.bind(this);
        this.formatStartDate = this.formatStartDate.bind(this);
        this.showValue = this.showValue.bind(this)
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
        if (timeFrame === "1D") {
            frequency = 'intraday';
        } else if (timeFrame === '1W') {
            frequency = 'daily';
        } else if (timeFrame === "1M") {
            frequency = "daily";
        } else if (timeFrame === "3M") {
            frequency = "daily";
        } else if (timeFrame === '1Y') {
            frequency = 'quarterly';
        } else {
            frequency = 'quarterly';
        }
        return frequency;
    }

    determineTime(time) {
        let timeSpan = new Date();
        
        if (time === "1D") {
            timeSpan.setHours(0, 0, 0)
        } else if (time === '1W') {
            timeSpan.setDate(timeSpan.getDate() - 7)
        } else if (time === "1M") {
            timeSpan.setMonth(timeSpan.getMonth() - 1)
        } else if (time === "3M") {
            timeSpan.setMonth(timeSpan.getMonth() - 3)
        } else if (time === '1Y') {
            timeSpan.setYear(timeSpan.getYear() - 1)
        } else {
            timeSpan = timeSpan.setYear(timeSpan.getYear() - 30)
        }
        return timeSpan

    }


    formatStartDate(date) {
        let time = this.state.timeFrame
        let timeSpan = new Date(date);
        
        if (time === "1D") {
            timeSpan.setHours(0, 0, 0)
        } else if (time === '1W') {
            timeSpan.setDate(timeSpan.getDate() - 7)
        } else if (time === "1M") {
            timeSpan.setMonth(timeSpan.getMonth() - 1)
        } else if (time === "3M") {
            timeSpan.setMonth(timeSpan.getMonth() - 3)
        } else if (time === '1Y') {
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
            if (timeFrame === "1D") {
               
            } else {
                
                Promise.all(
                    this.state.transactionTimeFrame.map(transaction => {
                        let date = new Date()
                        let year = date.getFullYear()
                        let month = date.getMonth();
                        let day = date.getDate();
                        let end_date = `${year}-${month + 1}-${day}`
                        let start_date = this.formatStartDate(end_date)
                        
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
        // e.preventDefault();
        this.setState({timeFrame : e.target.value}, () => {
            this.buildPortfolio()
        })
        
    }

    showValue(e) {
        if (e.activePayload !== undefined) {
            this.setState({ value: e.activePayload[0].payload.value })
        }

    }



    render() {
        
        let { funds, portfolioValue } = this.state;
        let chart;
        if (this.state.portfolioValuesArray.length === 0) {
            
            chart = this.state.funds
        } else {
           
            chart = (
                 <>
                    
                    <ResponsiveContainer width='100%' aspect={7 / 2.0}>
                    <LineChart
                        width={730}
                        height={250}
                        data={this.state.portfolioValuesArray}
                        onMouseMove={this.showValue}
                    >
                        <XAxis dataKey="date" hide={true}/>
                        <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                        <Tooltip content={<CustomTooltip />} active={true} position={{y: 0}}/>
                            <Line type="monotone" dataKey="value" stroke="#34D199" strokeWidth='3' dot={false} />



                    </LineChart>
                 </ResponsiveContainer>
            <div className='portfolio-buttons' >
                <button className='dash-button' onClick={this.handleClick} value="1W">1W</button>
                <button className='dash-button active' onClick={this.handleClick} value="1M">1M</button>
                <button className='dash-button' onClick={this.handleClick} value='3M'>3M</button>
                <button className='dash-button' onClick={this.handleClick} value='1Y'>1Y</button>
            </div>
            {/* <button onClick={this.handleClick} value='all'>All</button> */}
            </>
            )
        }



        let value = (funds + this.state.value).toFixed(2);
        let gain = this.state.value.toFixed(2)
        let percentGain = (((value/funds) - 1) * 100).toFixed(2);
        return (
            <>
                <div className='portfolio-graph'>
                    <h1>
                        <div className='money-sign'>$</div><Odometer duration={600} value={value} />
                    </h1>
                    <h2>${gain} ({percentGain}%)</h2>
                    <div>
                        {chart}
                    </div>
                </div>
            </>
        )

    }
}


export default Dashboard;
