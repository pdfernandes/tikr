# TIKR 
### **[Live Site](https://tikr.herokuapp.com)**
##### tikr is a single page web application inspired by robinhood.com. tikr allows users to make trades comission-free and provides users with real-time stock information. tikr gives users freedom over their finances.
<p align="center">
 <img src="https://github.com/pdfernandes/tikr/blob/master/app/assets/images/tenge.png" alt="drawing" width="200"/>
</p>

## Technologies

* Ruby on Rails 5.2.3
* React.js 16.10.1
* Redux.js 4.0.4
* webpack 4.41.0
* PostgreSQL 2.0
* JavaScript 9
* CSS 3
* HTML5

## Features 
### Splash Page
While not logged in, users have access to a splash page with various images and links to external sites. From the splash page users can log in or sign up.
<p align='center'>
 <img src='https://github.com/pdfernandes/tikr/blob/master/app/assets/images/tikr_splash.gif' alt='splash' width="450"/>
</p>

### Sign up / Log in
Users are able to create an account through a sign up page or log in to an already existing account. Users can use a demo account to navigate through the site. Log in and sign up pages have error handling to prevent users from creating accounts without proper information or logging in without proper credentials.
<p align='center'>
 <img src="https://github.com/pdfernandes/tikr/blob/master/app/assets/images/tikr_auth.gif" alt="auth" width="450"/>
</p>

### Dashboard
The user can see a real-time representation of their portfolio value as well as historic values. The dashboard page has recent business related news. The side bar displays a user's portfolio with current stocks and a list of watched stocks.
<p align='center'>
 <img src="https://github.com/pdfernandes/tikr/blob/master/app/assets/images/tikr_dashboard.gif" alt="dashboard" width="450"/>
</p>

### Search Bar
The search uses a debounce function to prevent excessive API calls. Users can search via a company's ticker, or by company name.
<p align='center'>
 <img src="https://github.com/pdfernandes/tikr/blob/master/app/assets/images/tikr_search.gif" alt="search bar" width="450"/>
</p>

### Company Page
The company page displays the current market value of a security. A line chart represents the price action. Users can see the price action for several different time periods. Key financial statistics and company information are located in an "About" section and company related news can be seen in a "News" section.

Users can buy and sell securities through a form that contains the most recent market price of the security, estimated price, and buying power. Error handling prevents users from entering non-integer values and other invalid quantities.
<p align='center'>
 <img src='https://github.com/pdfernandes/tikr/blob/master/app/assets/images/tikr_company.gif' alt='company page' width='450'/>
</p>

### Building a Portfolio
The dashboard page displays a line chart with the historic values of the user's portfolio. In order to properly calculate the portfolio value, one must take a running total. This process requires determining which assets the user had on any given day, and the prices of those assets on that day. The snippet below shows the API calls used to construct a portfolio and some of the helper functions used. Many actions were delegated to helper functions that build the portfolio, calculate prices and merge values.
```js
buildPortfolio() {
    let { transactions } = this.props;
    CompanyAPIUtil.allUserCompanies(transactions).then(res => {
      let prevRes = res;
      let tickers = {};
      res.forEach(ele => {
        tickers[[ele.id]] = ele.ticker;
      });
      let { timeFrame } = this.state;
      if (timeFrame === "1D") {
        this.buildIntradayPorfolioValues();
      } else {
        Promise.all(
          res.map(obj =>
            StocksAPIUtil.fetchHistoricalPrices(
              obj.ticker,
              this.setFrequency(timeFrame)
            )
          )
        ).then(res => {
          let datesArray = res[0].map(obj => obj.date);
          let currentRes = res;
          let historicPortfolio = this.buildHistoricPortfolio(
            datesArray,
            tickers
          );
          let historicPrices = this.buildHistoricPrices(prevRes, currentRes);
          let historicPortfolioValues = this.mergePortfolioWithPrice(
            historicPortfolio,
            historicPrices
          );
          this.formatPortfolioValues(historicPortfolioValues);
        });
      }
    });
  }


```

## Credits
* **[React Odometer](https://www.npmjs.com/package/react-odometerjs)**
* **[Font Awesome](https://fontawesome.com/?from=io)**
* **[Recharts](http://recharts.org/en-US/)**
* **[Api News](https://newsapi.org/)**
* **[IEX](https://iexcloud.io/)**






