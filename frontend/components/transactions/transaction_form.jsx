import React from "react";
import * as StocksAPIUtil from "../../util/stocks_api_util";
// import { postWatchlistItem, deleteWatchlistItem } from "../../util/watchlist_util";

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      funds: this.props.user.funds,
      order: true,
      price: 0,
      shares: 0,
      id: null,
      estimated_cost: parseInt(Number(0).toFixed(2)),
      errors: null,
      watched: false,
    };
    this.watched = false;
    this.showPrice = this.showPrice.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.findCompany = this.findCompany.bind(this);
    this.toggleBuy = this.toggleBuy.bind(this);
    this.buildPortfolio = this.buildPortfolio.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkWatched = this.checkWatched.bind(this);
    // debugger
  }


  componentDidMount() {
    // debugger
    // this.checkWatched();
    this.props.allTransactions();
    this.props.allCompanies().then(() => {
      this.findCompany();
    });
    StocksAPIUtil.getLastPrice(this.props.ticker).then(response => {
      this.showPrice(response.last_price);
    });
  }


  findCompany() {
    const formatCompanies = this.props.companies.reduce((obj, company) => {
      obj[company.ticker] = company;
      return obj;
    }, {});
  
     this.setState({
       id: formatCompanies[this.props.ticker].id
     },() => {
       this.checkWatched();
     });

    // if (this.state.order) {
    //   this.setState({
    //     funds: this.state.funds - this.state.estimated_cost
    //   });
    // } else {
    //   this.setState({
    //     funds: this.state.funds + this.state.estimated_cost
    //   });
    // }
  }

  handleSubmit(e) {
    e.preventDefault();

    let quantity = this.buildPortfolio()[this.props.ticker];
    if (
      (this.state.order && this.isValidBuy()) ||
      (this.state.order === false && this.isValidSell(quantity))
    ) {
      this.props.transact({
        order_type: this.state.order,
        quantity: this.state.shares,
        company_id: this.state.id,
        user_id: this.props.user.id,
        price: this.state.estimated_cost
      });

      if (this.state.order) {
        this.setState({
          funds: this.state.funds - this.state.estimated_cost
        });
      } else {
        this.setState({
          funds: this.state.funds + this.state.estimated_cost
        });
      }
    }
  }

  handleClick(e) {
    debugger
    if(this.state.watched) {
      this.props.deleteWatchlistItem(this.state.id)
      debugger
      this.setState({
        watched: false,
      })
    } else {
      debugger
      this.props.postWatchlistItem({user_id: this.props.user.id, company_id: this.state.id})
    }
  }

  checkWatched() {
    debugger
    let { watched_companies } = this.props.user;
    let { id } = this.state;
    if (watched_companies.includes(id)) {
      this.setState({
        watched: true,
      })
      debugger
    } else {
      debugger
    }

  }

  showPrice(price) {
    this.setState({
      price
    });
  }

  isValidBuy() {
    if (this.state.estimated_cost > this.state.funds) {
      this.setState({
        errors: "Sorry, you do not have enough funds."
      });
      return false;
    } else if (this.state.shares <= 0) {
      this.setState({
        errors: "Please enter a positive number of shares"
      });
      return false;
    } else {
      return true;
    }
  }

  isValidSell(owned) {

    if (owned >= this.state.shares && this.state.shares !== 0) {
      return true;
    } else if (this.state.shares <= 0) {
      this.setState({
        errors: "Invalid Transaction."
      });

      return false;
    } else {
      this.setState({
        errors: "Not Valid"
      });

      return false;
    }
  }

  buildPortfolio() {
    let { transactions, ticker } = this.props;
    let companyId;
    const formatCompanies = this.props.companies.reduce((obj, company) => {
      obj[company.ticker] = company;
      return obj;
    }, {});
    let stockQuantity = {};

    companyId = formatCompanies[ticker].id;

    for (let i = 0; i < transactions.length; i++) {
      let transaction = transactions[i];
      if (transaction.company_id === companyId) {
        if (stockQuantity[ticker] === undefined) {
          if (transaction.order_type) {
            stockQuantity[ticker] = transaction.quantity;
          }
        } else if (transaction.company_id === companyId) {
          if (transaction.order_type) {
            stockQuantity[ticker] += transaction.quantity;
          } else {
            stockQuantity[ticker] -= transaction.quantity;
          }
        }
      }
    }

    return stockQuantity;
  }

  handleChange(field) {
    return e => {
      if (e.target.value === "" || isNaN(parseInt(e.target.value))) {
        this.setState({
          errors: null,
          [field]: 0,
          estimated_cost: Number(0).toFixed(2)
        });
      } else {
        this.setState({
          errors: null,
          [field]: parseInt(e.target.value),
          estimated_cost: (parseInt(e.target.value) * this.state.price).toFixed(
            2
          )
        });
      }
    };
  }

  toggleBuy(e) {
    if (e.target.className.slice(" ").includes("buy")) {
      this.setState({
        order: true
      });
    } else {
      this.setState({
        order: false
      });
    }
  }

  handleChange(field) {
    return e => {
      if (e.target.value === "" || isNaN(parseFloat(e.target.value))) {
        this.setState({
          errors: null,
          [field]: 0,
          estimated_cost: parseFloat(parseInt(Number(0)).toFixed(2))
        });
      } else {
        this.setState({
          errors: null,
          [field]: parseFloat(e.target.value),
          estimated_cost: parseFloat(
            (parseFloat(e.target.value) * this.state.price).toFixed(2)
          )
        });
      }
    };
  }

  toggleBuy(e) {
    if (e.target.className.slice(" ").includes("buy")) {
      this.setState(
        {
          order: true
        },
        () => {}
      );
    } else {
      this.setState(
        {
          order: false
        },
        () => {}
      );
    }
  }

  render() {
    return (
      <>
      <div className="transaction-form">
        <div className="buy-sell">
          <h1
            onClick={this.toggleBuy}
            className={`buy${this.state.order === true ? " active-buy" : ""}`}
          >
            Buy {`${this.props.ticker}`}
          </h1>
          <h1
            onClick={this.toggleBuy}
            className={`sell${
              this.state.order === false ? " active-sell" : ""
            }`}
          >
            Sell {`${this.props.ticker}`}
          </h1>
        </div>
        <form className="form-content" onSubmit={this.handleSubmit}>
          <div className="shares">
            <label htmlFor="share-input">Shares:</label>
            <input
              type="text"
              onChange={this.handleChange("shares")}
              placeholder="0"
            />
          </div>

          <div className="market-price">
            <h1>Market Price:</h1>
            <h2>${this.state.price.toFixed(2)}</h2>
          </div>

          <div className="estimated-cost">
            <h1>Estimated Cost</h1>
            <h2>${this.state.estimated_cost}</h2>
          </div>
          <div className="transaction-errors">{this.state.errors}</div>
          <input
            type="submit"
            className={`${
              this.state.order === true ? "buy-button" : "sell-button"
            }`}
            value={
              this.state.order === true
                ? `Buy ${this.props.ticker}`
                : `Sell ${this.props.ticker}`
            }
          />
          <div className="buying-power">
            <h2>${this.state.funds.toLocaleString("en-US")}</h2>
            <h1>Buying Power Available</h1>
          </div>
        </form>
      </div>
      <div>
        <button onClick={this.handleClick} className={`watchlist-button${this.state.watched ? " hidden" : ""}`}>Add to watchlist</button>
        <button onClick={this.handleClick} className={`watchlist-button${this.state.watched ? "" : " hidden"}`}>Remove from watchlist</button>
      </div>
      </>
    );
  }
}

export default TransactionForm;
