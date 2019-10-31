import React from "react";
import * as StocksAPIUtil from '../../util/stocks_api_util';
import { throws } from "assert";


class WatchlistItem extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            test: 1
        }
    }

    componentDidMount() {
        debugger
        let { ticker } = this.props;
        Promise.all([
          StocksAPIUtil.getIntradayPrices(ticker),
          StocksAPIUtil.getLastPrice(ticker)
        ]).then(response => {
            this.setState({
                test : 2
            })
        });
    }

    render () {
        debugger
        return (
            <div>{this.state.test}</div>
        )
    }

}

export default WatchlistItem;