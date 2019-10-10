import React from 'react';
import * as CompanyAPIUtil from "../../util/stocks_api_util";


class CompanyInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "ticker": this.props.match.params.ticker,
            "Company Name": "-",
            "CEO": "-",
            "Employees": "-",
            "Headquarters": "-",
            "Founded": "-",
            "Market Cap": "-",
            "Price-Earnings Ratio" : "-",
            "Dividend Yield" : "-",
            "Average Volume" : "-",
            "Description" : "-"
        }
        this.formatState = this.formatState.bind(this);
    }


    componentDidMount () {
        let { ticker } = this.state;
        CompanyAPIUtil.getCompanyInfo(ticker)
            .then(company => {
                this.formatState(company)
            })
    }

    formatState(company) {
        this.setState({
            "Company Name" : company.companyName,
            "CEO" : company.ceo,
            "Employees" : company.employees,
            "Headquarters" : `${company.city}, ${company.state}`,
            "Description" : company.description
        })

    }


    render() {
        let stateArray = [];
        let titles = Object.keys(this.state)
        for (let i = 0; i < titles.length; i++) {
            let title = titles[i]
            if (title !== "Description") {
                stateArray.push(
                
                <li key={i} className='about-company-item'>
                    <h1 className='about-company-category'>
                        {title}
                    </h1>
                    <h2>
                        {this.state[title]}
                    </h2>

                </li>
            

                )
            }

        }
        debugger
    
        return (
            <div className="about-company">
                <h1>About</h1>
                <p className='company-description'>
                    {this.state["Description"]}
                </p>
                <ul>{stateArray}</ul>


            </div>
        )
    }
}

export default CompanyInfo;