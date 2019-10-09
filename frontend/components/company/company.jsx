import React from 'react';
import * as StocksAPIUtil from '../../util/stocks_api_util';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from '../dashboard/tooltip_content';
import Odometer from 'react-odometerjs';

class Company extends React.Component {
    constructor(props) {
        
        super(props);
        this.state = {
            selected: "1D",
            "1D" : [],
            "1W" : [],
            "1M" : [],
            "3M" : [],
            "1Y" : [],
            "5Y" : [],
        }
        this.formatData = this.formatData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.showValue = this.showValue.bind(this)
    }

    componentDidMount () {
      StocksAPIUtil.getIntradayPrices(this.props.ticker)
        .then(response => {
            debugger
            this.formatData("1D", response);
        })
        
    }

    formatData(timeFrame = "1D", response) {
        
        let dataPoints = [];
        response.forEach(dataPoint => {
            dataPoints.push({
                "date": dataPoint["date"],
                "price": dataPoint["close"]
            })
        })
        debugger
        this.setState({
            [timeFrame] : dataPoints,
            selected: timeFrame
        },() => {
            debugger
        })

    }

    handleClick(e) {
        if (e.target.value === "1D") {
            StocksAPIUtil.getIntradayPrices(this.props.ticker)
                .then(response => {
                    debugger
                    this.formatData("1D", response);
                })
        } else if (e.target.value === "1W") {
            let val = e.target.value
            StocksAPIUtil.fetchHistoricalPrices(this.props.ticker, "5dm")
                .then(response => {
                    debugger
                    this.formatData(val, response)
                })
        } else {
            let val = e.target.value
            StocksAPIUtil.fetchHistoricalPrices(this.props.ticker, e.target.value)
                .then(response => {
                    debugger
                    this.formatData(val, response)
                })
        }
    }

    showValue(e) {
        if (e.activePayload !== undefined) {
            
        }

    }
    



    render () {
        debugger
        return (
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
                        <Line type="monotone" dataKey="price" stroke="#34D199" strokeWidth='3' dot={false} />



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
        )

    }
    
}

export default Company;