import React from "react";
import * as StocksAPIUtil from "../../util/stocks_api_util";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import CustomTooltip from "../dashboard/tooltip_content";
import { Link } from "react-router-dom";

class WatchlistItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      price: 0
    };
  }

  componentDidMount() {
    let { ticker } = this.props;
    Promise.all([
      StocksAPIUtil.getIntradayPrices(ticker),
      StocksAPIUtil.getLastPrice(ticker)
    ]).then(
      response => {
        let dayPrices = response[0];
        let lastPrice = response[1];
        this.setState({
          data: dayPrices.slice(0.5 * dayPrices.length),
          price: lastPrice
        });
      },
      err => {
        setTimeout(() => {
          Promise.all([
            StocksAPIUtil.getIntradayPrices(ticker),
            StocksAPIUtil.getLastPrice(ticker)
          ]).then(response => {
            let dayPrices = response[0];
            let lastPrice = response[1];
            this.setState({
              data: dayPrices.slice(0.5 * dayPrices.length),
              price: lastPrice
            });
          });
        }, 1000);
      }
    );
  }

  render() {
    let chart;
    if (this.state.data.length === 0) {
      chart = null;
    } else {
      chart = (
        <LineChart width={50} height={50} data={this.state.data}>
          <XAxis dataKey="minute" hide={true} domain={["dataMin", "dataMax"]} />
          <YAxis hide={true} domain={["dataMin", "dataMax"]} />
          <Line
            type="monotone"
            connectNulls
            dataKey="close"
            stroke={
              this.state.data[0].close <=
              this.state.data[this.state.data.length - 1].close
                ? "#34D199"
                : "#f55733"
            }
            strokeWidth="1"
            dot={false}
          />
        </LineChart>
      );
    }

    return (
      <>
        {/* <h1>{this.props.ticker}</h1> */}
        <Link className="watchlist-link" to={`/stocks/${this.props.ticker}`}>
          <div>
            <h1>{this.props.ticker}</h1>
            {/* <h2>{`$ ${this.state.price.toFixed(2)}`}</h2> */}
            {/* <h2>{portfolio[company]} shares</h2> */}
          </div>
          {/* <div className="portfolio-value">$ {totalValue}</div> */}
          <div className="watchlist-chart">{chart}</div>
          <div className="portfolio-value">{`$ ${
            isNaN(this.state.price.toFixed(2)) ? 0 : this.state.price.toFixed(2)
          }`}</div>
        </Link>
      </>
    );
  }
}

export default WatchlistItem;
