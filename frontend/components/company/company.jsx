import React from "react";
import * as StocksAPIUtil from "../../util/stocks_api_util";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import CustomTooltip from "../dashboard/tooltip_content";
import Odometer from "react-odometerjs";

class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "-",
      selected: "1D",
      "1D": [],
      "1W": [],
      "1M": [],
      "3M": [],
      "1Y": [],
      "5Y": [],
      value: 0,
      latestPrice: 0
    };
    this.formatData = this.formatData.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showValue = this.showValue.bind(this);
    this.setCompanyName = this.setCompanyName.bind(this);
  }

  componentDidMount() {
    let { ticker } = this.props;
    let p1 = StocksAPIUtil.getCompanyName;
    let p2 = StocksAPIUtil.getLastPrice;
    let p3 = StocksAPIUtil.getIntradayPrices;

    Promise.all([p1(ticker), p2(ticker), p3(ticker)]).then(responseArr => {
      this.setCompanyName(responseArr[0]);
      this.setState({
        value: parseFloat(responseArr[1].toFixed(2))
      });
      this.formatData("1D", responseArr[2]);

    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.ticker !== this.props.match.params.ticker) {
      let { ticker } = this.props;
      let p1 = StocksAPIUtil.getCompanyName;
      let p2 = StocksAPIUtil.getLastPrice;
      let p3 = StocksAPIUtil.getIntradayPrices;

      Promise.all([p1(ticker), p2(ticker), p3(ticker)]).then(responseArr => {
        this.setCompanyName(responseArr[0]);
        this.setState({
          value: parseFloat(responseArr[1].toFixed(2))
        });
        this.formatData("1D", responseArr[2]);
      });
    }
  }

  setCompanyName(response) {
    this.setState({
      name: response.companyName
    });
  }

  formatData(timeFrame = "1D", response) {
    let dataPoints = [];
    response.forEach(dataPoint => {
      if (dataPoint.close !== null) {
        if (dataPoint.minute === undefined) {
          dataPoints.push({
            date: dataPoint["date"],
            price: dataPoint["close"]
          });
        } else {
          dataPoints.push({
            date: `${dataPoint["date"]} ${dataPoint["label"]}`,
            price: dataPoint["close"]
          });
        }
      }
    });

    this.setState(
      {
        [timeFrame]: dataPoints,
        selected: timeFrame
      }
    );
  }

  handleClick(e) {
    if (e.target.value !== this.state.selected) {

      if (e.target.value === "1D") {
        StocksAPIUtil.getIntradayPrices(this.props.ticker).then(response => {
          this.formatData("1D", response);
        });
      } else if (e.target.value === "1W") {
        let val = e.target.value;
        StocksAPIUtil.fetchHistoricalOneWeekPrices(this.props.ticker, "5dm").then(
          response => {
            this.formatData(val, response);
          }
        );
      } else {
        let val = e.target.value;
        StocksAPIUtil.fetchHistoricalPrices(
          this.props.ticker,
          e.target.value
        ).then(response => {
          this.formatData(val, response);
        });
      }
    }
  }

  showValue(e) {
    if (e.activePayload !== undefined && e.activePayload[0].price !== null) {
      this.setState({ value: e.activePayload[0].payload.price });
    }
  }

  render() {
    let value;
    let gain;
    let percentGain;

    let chart;
    if (this.state[this.state.selected].length === 0) {
      value = 0;
      gain = 0;
      percentGain = 0;
    }
    else {
      let firstPrice = this.state[this.state.selected][0].price;
      let firstValidPrice = this.state[this.state.selected].find(el => {
        return el.price !== null && el.price !== undefined
      }).price
      let lastValidPrice = this.state[this.state.selected].slice()
        .reverse()
        .find(el => {
          return el.price !== null && el.price !== undefined;
        }).price;

        if (firstValidPrice === undefined) {
          firstValidPrice = 0;
        }

        if (lastValidPrice === undefined) {
          lastValidPrice = 1;
        }

      value = parseFloat(this.state.value.toFixed(2));
      gain = (this.state.value - firstPrice).toFixed(2);
      percentGain = ((value / firstPrice - 1) * 100).toFixed(2);
      chart = (
        <>
          <ResponsiveContainer width="100%" aspect={7 / 2.0}>
            <LineChart
              width={730}
              height={250}
              data={this.state[this.state.selected]}
              onMouseMove={this.showValue}
            >
              <XAxis
                dataKey="date"
                hide={true}
                domain={["dataMin", "dataMax"]}
              />
              <YAxis hide={true} domain={["dataMin", "dataMax"]} />
              <Tooltip
                content={<CustomTooltip />}
                active={true}
                position={{ y: 0 }}
              />
              <Line
                type="monotone"
                connectNulls
                dataKey="price"
                stroke={
                  firstValidPrice <= lastValidPrice
                    ? "#34D199"
                    : "#f55733"
                }
                strokeWidth="2"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      );
    }

    return (
      <>
        <div className="portfolio-graph">
          <h1 className="company-name">{this.state["name"]}</h1>
          <h1>
            <div className="money-sign">$</div>
            <Odometer duration={600} value={value} />
          </h1>
          <h2>
            ${gain} ({percentGain}%)
          </h2>
          <div>
            {chart === undefined ? "" : chart}
            <div className="portfolio-buttons">
              <button
              id='1D'
                className={`dash-button${this.state.selected === '1D' ? " active" : ""}`}
                onClick={this.handleClick}
                value="1D"
              >
                1D
              </button>
              <button
              id='1W'
                className={`dash-button${this.state.selected === '1W' ? " active" : ""}`}
                onClick={this.handleClick}
                value="1W"
              >
                1W
              </button>
              <button
                id='1M'
                className={`dash-button${this.state.selected === '1M' ? " active" : ""}`}
                onClick={this.handleClick}
                value="1M"
              >
                1M
              </button>
              <button
              id='3M'
                className={`dash-button${this.state.selected === '3M' ? " active" : ""}`}
                onClick={this.handleClick}
                value="3M"
              >
                3M
              </button>
              <button
              id='1Y'
                className={`dash-button${this.state.selected === '1Y' ? " active" : ""}`}
                onClick={this.handleClick}
                value="1Y"
              >
                1Y
              </button>
              <button
              id='5Y'
                className={`dash-button${this.state.selected === '5Y' ? " active" : ""}`}
                onClick={this.handleClick}
                value="5Y"
              >
                5Y
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Company;
