import React from 'react';
import NewsItem from "./news_item.jsx"

class News extends React.Component {
    constructor(props) {
        
        super(props);
    }

    componentDidMount() {
      let { news } = this.props;
    //   if (news.length === 0) {
    //       debugger
    //       this.props.getTopNews()
    //   }
    }




    render () {
        let { news } = this.props;
        let newsItems = [];
        if (news.length === 0) {
            newsItems = null
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
                )
            })
            
        }
        return (
            <div>
                <ul className='news_list'>{newsItems}</ul>
            </div>
        )
    }
}

export default News;