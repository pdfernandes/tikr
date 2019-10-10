import React from 'react';
import * as StocksAPIUtil from '../../util/stocks_api_util';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from '../dashboard/tooltip_content';
import Odometer from 'react-odometerjs';

class Company extends React.Component {
    constructor(props) {
        
        super(props);
        this.state = {
            "name": "-",
            selected: "1D",
            "1D" : [],
            "1W" : [],
            "1M" : [],
            "3M" : [],
            "1Y" : [],
            "5Y" : [],
            "value" : 0
        }
        this.formatData = this.formatData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.showValue = this.showValue.bind(this)
    }

    componentDidMount () {
      StocksAPIUtil.getIntradayPrices(this.props.ticker)
        .then(response => {
            
            this.formatData("1D", response);
        })
        
    }

    setCompanyName (response) {
        this.setState({
            "name" : response.companyName,
        })
    }

    formatData(timeFrame = "1D", response) {
        
        let dataPoints = [];
        response.forEach(dataPoint => {
            if (dataPoint.minute === undefined) {
                dataPoints.push({
                    "date": dataPoint["date"],
                    "price": dataPoint["close"]
                })
            } else {
                dataPoints.push({
                    "date": `${dataPoint["date"]} ${dataPoint['label']}`,
                    "price": dataPoint["close"]
                })

            }
        })
        
        this.setState({
            [timeFrame] : dataPoints,
            selected: timeFrame
        },() => {
            
        })

    }

    handleClick(e) {
        if (e.target.value === "1D") {
            StocksAPIUtil.getIntradayPrices(this.props.ticker)
                .then(response => {
                    
                    this.formatData("1D", response);
                })
        } else if (e.target.value === "1W") {
            let val = e.target.value
            StocksAPIUtil.fetchHistoricalPrices(this.props.ticker, "5dm")
                .then(response => {
                    
                    this.formatData(val, response)
                })
        } else {
            let val = e.target.value
            StocksAPIUtil.fetchHistoricalPrices(this.props.ticker, e.target.value)
                .then(response => {
                    
                    this.formatData(val, response)
                })
        }
    }

    showValue(e) {
        if (e.activePayload !== undefined) {
            
            this.setState({ value: e.activePayload[0].payload.price })
        }

    }
    



    render () {
        
        return (
            <>
                <div className='portfolio-graph'>
                    <h1 className='company-name'>{this.state["name"]}</h1>
                    <h1>
                        <div className='money-sign'>$</div><Odometer duration={600} value={value} />
                    </h1>
                    <h2>${gain} ({percentGain}%)</h2>
                    <div>
                        <ResponsiveContainer width='100%' aspect={7 / 2.0}>
                            <LineChart
                                width={730}
                                height={250}
                                data={this.state[this.state.selected]}
                                onMouseMove={this.showValue}
                            >
                                <XAxis dataKey="date" hide={true} domain={['dataMin', 'dataMax']} />
                                <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                                <Tooltip content={<CustomTooltip />} active={true} position={{ y: 0 }} />
                                <Line type="monotone" connectNulls dataKey="price" stroke="#34D199" strokeWidth='3' dot={false} />



                            </LineChart>
                        </ResponsiveContainer>
                        <div className='portfolio-buttons' >
                            <button className='dash-button' onClick={this.handleClick} value="1D">1D</button>
                            <button className='dash-button' onClick={this.handleClick} value="1W">1W</button>
                            <button className='dash-button active' onClick={this.handleClick} value="1M">1M</button>
                            <button className='dash-button' onClick={this.handleClick} value='3M'>3M</button>
                            <button className='dash-button' onClick={this.handleClick} value='1Y'>1Y</button>
                            <button className='dash-button' onClick={this.handleClick} value='5Y'>5Y</button>
                        </div>
                    </div>
                </div>
            </>
           
        )

    }
    
}

export default Company;