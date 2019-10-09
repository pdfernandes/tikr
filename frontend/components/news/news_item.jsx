import React from 'react'

const NewsItem = ({ author, content, description, publishedAt, source, imageUrl, url, title }) => {
    

    return (
        <>
            <a href={url}>
                <div className='news-text'>
                    <h1>{source}</h1>
                    <h2>{title}</h2>
                    <div><i className="fas fa-eye"></i>  {Math.floor(Math.random() * 1000)}</div>
                </div>
                
                <div className='news-image' >
                    <img src={imageUrl} alt="news image"/>
                </div>
            
            </a>

        </>
    )

}

export default NewsItem;