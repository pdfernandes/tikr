import React from 'react';
import * as StocksAPIUtil from "../../util/stocks_api_util";


class TransactionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: true,
            price: 0,
            shares: 0,
            id: null,
        }
        this.showPrice = this.showPrice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.findCompany = this.findCompany.bind(this);
    }

    componentDidMount () {
        this.props.allCompanies()
            .then(() => {
               this.findCompany()
            })
        StocksAPIUtil.getLastPrice(this.props.ticker)
            .then(response => {
                this.showPrice(response.last_price)
            })
    }
    findCompany() {

        const formatCompanies = this.props.companies.reduce((obj, company) => {
            obj[company.ticker] = company
            return obj
        }, {})

        this.setState({
            id: formatCompanies[this.state.ticker]
        })
    }

    showPrice(price) {
        this.setState({
            price
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.transact( {
            quantity: this.state.quantity,
            order_type: this.state.header,
            user_id: this.props.user.id,
            price: this.state.shares * this.state.price

        })
    }

    render() {
        
        const header = this.state.header ? `Buy ${this.props.ticker}` : `Sell ${this.props.ticker}`

        return (
            
        
            <div className='transaction-form'>
                <h1>{header}</h1>
                <div>
                    Price: ${this.state.price.toFixed(2)}
                </div>
                <div>
                    Shares: {this.state.shares}
                </div>
            </div>
        
            
            
           
        )
    
    } 

}



export default TransactionForm;