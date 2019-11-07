import React from 'react'
import * as StocksAPIUtil from "../../util/stocks_api_util";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from './tooltip_content';
import Odometer from 'react-odometerjs';
import * as CompanyAPIUtil from '../../util/companies_util';
import { merge, mergeWith, multiply } from 'lodash'


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            funds: this.props.user.funds,
            portfolioValues: [],
            timeFrame: "1Y",
            value: 0,
        }
        this.currentPortfolio = null;
        this.handleClick = this.handleClick.bind(this);
        this.showValue = this.showValue.bind(this)
        //
        this.buildHistoricPortfolio = this.buildHistoricPortfolio.bind(this)
        this.mergePortfolioWithPrice = this.mergePortfolioWithPrice.bind(this)
        this.formatPortfolioValues = this.formatPortfolioValues.bind(this)
        this.buildPortfolio = this.buildPortfolio.bind(this);
        this.setFrequency = this.setFrequency.bind(this)
        this.buildIntradayPorfolioValues = this.buildIntradayPorfolioValues.bind(this)
        this.calculateIntradayValues = this.calculateIntradayValues.bind(this)
    }

    componentDidMount() {
        this.props.allTransactions()
        .then(() => {
            this.buildPortfolio();
        })
    }

    buildHistoricPortfolio(datesArray, tickers) {
        //tickers =>  {id:ticker}
       
        let { transactions } = this.props;
          //build current portfolio

          let currentPortfolio = {};
          transactions.forEach(transaction => {
              if (transaction.order_type) {
                  if (currentPortfolio[tickers[transaction.company_id]] === undefined) {
                      currentPortfolio[tickers[transaction.company_id]] = transaction.quantity;
                  } else {
                      currentPortfolio[tickers[transaction.company_id]] += transaction.quantity
                  }
              } else {
                  currentPortfolio[tickers[transaction.company_id]] -= transaction.quantity
              }
          })

        //

        let historicPortfolio = {};

        for (let i = 0; i < datesArray.length; i++) {
            let dateString = datesArray[i]
            let date = new Date(dateString);
            historicPortfolio[dateString] = {};
            let dateConvertedToTime = date.getTime();
            for (let j = 0; j < transactions.length; j++) {
                let transaction = transactions[j];
                let transactionDate = new Date(transaction.transaction_time);
                transactionDate = transactionDate.getTime();
                if (i === datesArray.length - 1) {
                }

                if (transactionDate <= dateConvertedToTime) {
                    if (transaction.order_type) {
                        if (historicPortfolio[dateString][transaction.company_id] === undefined) {
                            historicPortfolio[dateString][tickers[transaction.company_id]] = transaction.quantity;
                        } else {
                            historicPortfolio[dateString][tickers[transaction.company_id]] += transaction.quantity;
                        } 
                    } else {
                        historicPortfolio[dateString][tickers[transaction.company_id]] += transaction.quantity;
                    }
                    
                }
            }

            
        }
        
        //historic portfolio =>{ date: {ticker: quantity}}
        //will set a variable with most recent portfolio
        // let portfoliosArray = Object.values(historicPortfolio)
        this.currentPortfolio = currentPortfolio
        return historicPortfolio;


    }

    buildHistoricPrices(tickers, allCompanyPrices) {
        let historicPrices = {};

        for (let i = 0; i < tickers.length; i++) {
            let ticker = tickers[i].ticker;
            let companyPrices = allCompanyPrices[i];
            for (let j = 0; j < companyPrices.length; j++) {
                let price = companyPrices[j];
                if (historicPrices[price.date] === undefined) {
                    historicPrices[price.date]= {};
                }
                  historicPrices[price.date][ticker] = price.close;
            }
        }

        //historicPrices => {date : {ticker: price}}
        return historicPrices;

    }

    mergePortfolioWithPrice (historicPortfolio, historicPrices) {
        function multiplier (a, b) {
          const result = multiply (a,b)
          if (isNaN(result)) {
              return;
          } else {
              if (a === undefined) {
                  return multiply(0, b)
              } else {
                  return multiply(a, b)
              }
          }
        }
        let historicPortfolioDup = merge({}, historicPortfolio);
        let historicPricesDup = merge({}, historicPrices)
        let historicPortfolioValues = mergeWith(historicPortfolioDup, historicPricesDup, multiplier)
        return historicPortfolioValues;
    }

    formatPortfolioValues (historicPortfolioValues) {
        //historicsPortoflioValues => {date: {ticker: aggregateValue}}
        let formattedPortfolio = [];
        let dates = Object.keys(historicPortfolioValues);

        for (let i = 0; i < dates.length; i++) {
            let date = dates[i];
            let dateMinutes = date + " " + "04:00 PM"
            let values = Object.values(historicPortfolioValues[date])
            let value = values.reduce((a, b) => a + b)
            formattedPortfolio.push({
                date: dateMinutes,
                value: parseFloat(value.toFixed(2))
            })
        }
        this.setState({
            portfolioValues: formattedPortfolio
        })
        // return formattedPortfolio;
    }

    buildPortfolio() {
        let { transactions } = this.props;
        let formattedPortfolio;
            CompanyAPIUtil.allUserCompanies(transactions)
            .then(res => {
                //[{ticker:AAPL, id:id}]
                let prevRes = res;
                let tickers = {};
                res.forEach(ele => {
                    tickers[[ele.id]] = ele.ticker;
                })
                let {timeFrame} = this.state
                if (timeFrame === "1D") {
                    this.buildIntradayPorfolioValues();
                } else {
                    Promise.all(res.map(obj => StocksAPIUtil.fetchHistoricalPrices(obj.ticker, this.setFrequency(timeFrame))))
                    .then(res => {
                        let datesArray = res[0].map(obj => obj.date)
                        let currentRes = res;
                        let historicPortfolio = this.buildHistoricPortfolio(datesArray, tickers)
                        let historicPrices = this.buildHistoricPrices(prevRes, currentRes)
                        let historicPortfolioValues = this.mergePortfolioWithPrice(historicPortfolio,historicPrices)
                        this.formatPortfolioValues(historicPortfolioValues);
                    })
                }
            })
    }

    setFrequency(timeFrame) {
        let frequency;

        if (timeFrame === '1W') {
            frequency = '5d';
        } else if (timeFrame === "1M") {
            frequency = "1m";
        } else if (timeFrame === "3M") {
            frequency = "3m";
        } else if (timeFrame === '1Y') {
            frequency = '1y';
        }
        return frequency;
    }


    handleClick(e) {
        // e.preventDefault();
        if (e.target.value !== this.state.timeFrame) {
            this.setState({timeFrame : e.target.value}, () => {
                this.buildPortfolio()
            })
        }
        
    }

    showValue(e) {
        if (e.activePayload !== undefined) {
            this.setState({ value: parseFloat(e.activePayload[0].payload.value.toFixed(2)) })
        }

    }

    buildIntradayPorfolioValues() {
        let portfolio = this.currentPortfolio;
        let portfolioTickers = Object.keys(portfolio)
        Promise.all(portfolioTickers.map(ticker => StocksAPIUtil.getIntradayPrices(ticker)))
        .then(res => {
            this.calculateIntradayValues(portfolio, portfolioTickers, res)
        })

    }

    calculateIntradayValues(portfolio, portfolioTickers, arrayOfPrices) {
        let intradayValues = [];
        for (let i = 0; i < portfolioTickers.length; i++) {
            let ticker = portfolioTickers[i];
            let tickerPrices = arrayOfPrices[i];
            let quantity = portfolio[ticker]
            let prevClose;
            for (let j = 0; j < tickerPrices.length; j++) {
                let data = tickerPrices[j];
                let close = data.close;
                let minute = data.minute;

                if (close !== null) {
                    prevClose = close;
                }

                if (close === null) {
                    close = prevClose;
                }
                let date = data.date;
                let value = quantity * close;

                if (intradayValues[j] === undefined) {
                    intradayValues[j] = {
                        date: date + " " + minute,
                        value
                    }
                } else {
                    intradayValues[j].value += value
                }

            }
        }

        intradayValues = intradayValues.filter(el => {
            let minute = parseInt(el.date.split(":")[1]);
            return minute % 5 === 0;
        })

        this.setState({
        portfolioValues: intradayValues
        });

    }



    render() {
 
        let { funds, portfolioValue } = this.state;
        let chart;
         if (this.state.portfolioValues.length === 0) {
            
            chart = this.state.funds
        } else {
           
            chart = (
                 <>
                    <ResponsiveContainer width='100%' aspect={7 / 2.0}>
                    <LineChart
                        width={730}
                        height={250}
                        data={this.state.portfolioValues}
                        onMouseMove={this.showValue}
                    >
                        <XAxis dataKey="date" hide={true}/>
                        <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                        <Tooltip content={<CustomTooltip />} active={true} position={{y: 0}}/>
                        <Line type="monotone" dataKey="value" stroke={
                            this.state.portfolioValues[0].value <
                            this.state.portfolioValues[this.state.portfolioValues.length - 1].value ? 
                            "#34D199" : "f55733"} connectNulls strokeWidth='2' dot={false} />



                    </LineChart>
                 </ResponsiveContainer>
            <div className='portfolio-buttons' >
                <button className='dash-button' onClick={this.handleClick} value="1D">1D</button>
                <button className='dash-button' onClick={this.handleClick} value="1W">1W</button>
                <button className='dash-button active' onClick={this.handleClick} value="1M">1M</button>
                <button className='dash-button' onClick={this.handleClick} value='3M'>3M</button>
                <button className='dash-button' onClick={this.handleClick} value='1Y'>1Y</button>
            </div>
            </>
            )
        }
        
        let value = parseFloat((funds + this.state.value).toFixed(2));
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
