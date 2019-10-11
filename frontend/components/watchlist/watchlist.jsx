import React from 'react';
import { Link } from 'react-router-dom';
import * as StocksAPIUtil from '../../util/stocks_api_util';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from '../dashboard/tooltip_content';





class Watchlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolio: {}
        }
        this.buildPortfolio = this.buildPortfolio.bind(this)

    }
    componentDidMount () {
        Promise.all([this.props.allCompanies(), this.props.allTransactions()])
        .then(() => {
            this.buildPortfolio();
        })
    }



    buildPortfolio() {
        
        let { companies, transactions } = this.props
        let portfolio = {};
        for (let i = 0; i < companies.length; i++) {
            let company = companies[i]
            for (let j = 0; j < transactions.length; j++) {
                let transaction = transactions[j]

                if (transaction.company_id === company.id && portfolio[company.ticker] === undefined) {
                    if (transaction.order_type) {
                        portfolio[company.ticker] = transaction.quantity
                    } else {
                        portfolio[company.ticker] = transaction.quantity * -1
                    }
                } else if (transaction.company_id === company.id && portfolio[company.ticker] !== undefined) {
                    if (transaction.order_type) {
                        portfolio[company.ticker] += transaction.quantity
                    } else {
                        portfolio[company.ticker] -= transaction.quantity
                    }
                }

            }
        }
        
        this.setState({
            portfolio : portfolio
        },() => {
            this.buildCharts()
        })

    }

    buildCharts() {
        let { portfolio } = this.state;
        Object.keys(portfolio).forEach(ticker => {
            const tick = ticker;
            Promise.all([StocksAPIUtil.getIntradayPrices(ticker), ticker, StocksAPIUtil.getLastPrice(ticker)])
            .then(response => {
                let ticker = response[1];
                let data = response[0];
                let price = response[2].last_price;
                let ticker_price = `${ticker}Price`
              
                // if (Array.isArray(response[0])) {
                //     data = response[0];
                //     ticker = response[1];
                // } else {
                //     data = response[1];
                //     ticker = response[0];
                // }
              
                this.setState({
                    [ticker]: data.slice(.93 * data.length),
                    [ticker_price] : price
                },() => {
                    debugger
                })

            })
        })
    }



    render () {
        let {transactions, companies } = this.props;
        let { portfolio } = this.state;
        let portfolioComponent = [];
        if (Object.keys(portfolio).length === 0) {
            portfolioComponent = null;
        } else {
          
                Object.keys(portfolio).forEach((company, i) => {
                    let totalValue = this.state[`${company}Price`] * portfolio[company]
                    portfolioComponent.push(
                    <li key={i}>
                        <Link className='watchlist-link'to={`/stocks/${company}`}>
                            <div>
                                <h1>{company}</h1>
                                <h2>{portfolio[company]} shares</h2>
                            </div>
                            <div className='portfolio-value'>
                                $ {totalValue}
                            </div>
                            <div className='watchlist-chart'>
                            <LineChart
                                width={50}
                                height={50}
                                data={this.state[company]}
                                >
                                <XAxis dataKey="minute" hide={true} domain={['dataMin', 'dataMax']} />
                                <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                                <Line type="monotone" connectNulls dataKey="close" stroke="#34D199" strokeWidth='2' dot={false} />
                            </LineChart>
                            </div>
                        </Link>
                    </li>
                    )
                
                })
            
        }

        return (
        
            <div className='watchlist'>

            <h1>Portfolio</h1> 
            <ul>
                {portfolioComponent}
            </ul>

            </div>
     
        )
    }

}

export default Watchlist;