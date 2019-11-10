import React from 'react'

const NewsItem = ({ author, content, description, publishedAt, source, imageUrl, url, title }) => {
    let image;
    let body;
    if (imageUrl === null) {
        image = <div className='default-image'></div>
    } else {
        image = <img src={imageUrl} alt="news image" />;
    }

    if (title === null) {
        body = null
    } else {
        body = <h2>{title}</h2>;
    }

    return (
        <>
            <a target='_blank' href={url}>
                <div className='news-text'>
                    <h1>{source}</h1>
                    {body}
                    <div><i className="fas fa-eye"></i>  {Math.floor(Math.random() * 1000)}</div>
                </div>
                
                <div className='news-image' >
                    {image}
                </div>
            
            </a>

        </>
    )

}

export default NewsItem;