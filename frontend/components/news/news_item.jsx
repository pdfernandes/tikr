import React from 'react'

const NewsItem = ({ author, content, description, publishedAt, source, imageUrl, url, title }) => {
    

    return (
        <>
            <div>
                <h1>{source}</h1>
                <h2>{title}</h2>
            </div>
            <div>
                <img src={imageUrl} alt="news image"/>
            </div>
            <div className="news_link">
                <a href={url}>This is a link to the thing</a>
            </div>
                

        </>
    )

}

export default NewsItem;