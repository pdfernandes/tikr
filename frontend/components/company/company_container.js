import { connect } from 'react-redux';
import Company from './company';
import * as StocksAPIUtil from '../../util/stocks_api_util';



const msp = (state, ownProps) => {

    return {
        ticker: ownProps.match.params.ticker,
        user: Object.values(state.entities.user)[0]
    }

}


export default connect(msp)(Company);
