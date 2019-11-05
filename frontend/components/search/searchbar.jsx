import React from "react";
import * as SearchAPIUtil from "../../util/search_util";
import { debounce } from "lodash";

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    }

    this.getData = this.getData.bind(this);
    this.debounceEvent = this.debounceEvent.bind(this);
  }

  debounceEvent(...args) {
    this.debouncedEvent = debounce(...args);
    return e => {
      e.persist();
      return this.debouncedEvent(e);
    };
  }

  getData(e) {
    if (e.target.value !== "") {
      SearchAPIUtil.searchDB(e.target.value).then(response => {
        prepareSearchItems(response)
      });
    }
  }

  prepareSearchItems(items) {
    let searchItems = items.map((el, i) => {
      return(
        <li key={i}>
          <SearchItem name={el.name} ticker={el.ticker} id={el.ticker} />
        </li>
      )
    })

    this.setState({ results: searchItems })
  }


  render() {
    return (
      <>
        <input
          className="search-bar"
          type="text"
          name=""
          id=""
          onKeyUp={this.debounceEvent(this.getData, 500)}
        />
        <ul>
          {this.state.results}
        </ul>
      </>
    );
  }
}

export default Searchbar;
