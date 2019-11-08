import React from 'react';
import NewsItem from "./news_item.jsx"

class News extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { news } = this.props;
    if (this.props.match.url === "/") {
        //  this.props.getTopNews("?q=business")
    } else {
        //  this.props.getTopNews(`?q=${this.props.match.params.ticker}`)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.ticker !== this.props.match.params.ticker) {
         let { news } = this.props;
         if (this.props.match.url === "/") {
              // this.props.getTopNews("?q=business")
         } else {
              // this.props.getTopNews(`?q=${this.props.match.params.ticker}`)
         }
    }
  }

  render() {
    let { news } = this.props;
    let newsItems = [];
    let heading;
    this.props.match.url === "/"
      ? (heading = "Recent News")
      : (heading = "News");
    if (news.length === 0) {
      newsItems = null;
    } else {
      news.forEach((newsItem, i) => {
        newsItems.push(
          <li key={i}>
            <NewsItem
              author={newsItem["author"]}
              content={newsItem["content"]}
              description={newsItem["description"]}
              publishedAt={newsItem["publishedAt"]}
              source={newsItem["source"]["name"]}
              title={newsItem["title"]}
              url={newsItem["url"]}
              imageUrl={newsItem["urlToImage"]}
            />
          </li>
        );
      });
    }

    return (
      <div className="news-container">
        <h1>{heading}</h1>
        <ul className="news_list">{newsItems}</ul>
      </div>
    );
  }
}

export default News;