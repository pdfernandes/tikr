import { connect } from "react-redux";
import Company from "./company";

const msp = (state, ownProps) => {
  return {
    ticker: ownProps.match.params.ticker.toUpperCase(),
    user: Object.values(state.entities.user)[0]
  };
};

export default connect(msp)(Company);
