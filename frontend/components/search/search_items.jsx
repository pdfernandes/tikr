import React from 'react';
import { Link } from 'react-router-dom';

const SearchItem = ({name, ticker, id}) => {
    debugger
    return (
        <Link to={`/stocks/${ticker}`} >
            <h1>{ticker}</h1>
            <h2>{name}</h2>
        </Link>
    )
}


export default SearchItem;