import React from "react";
import * as SearchAPIUtil from "../../util/search_util";
import { debounce } from "lodash";
import SearchItem from "./search_items";

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null
    };

    this.getData = this.getData.bind(this);
    this.debounceEvent = this.debounceEvent.bind(this);
    this.prepareSearchItems = this.prepareSearchItems.bind(this);
    this.handleClick = this.handleClick.bind(this)
  }

  debounceEvent(...args) {
    this.debouncedEvent = debounce(...args);
    return e => {
      e.persist();
      return this.debouncedEvent(e);
    };
  }

  handleClick() {
    this.setState({
      results: null
    })
  }

  getData(e) {
    if (e.target.value !== "") {
      SearchAPIUtil.searchDB(e.target.value).then(response => {
        this.prepareSearchItems(response);
      });
    } else {
      this.setState({
        results: null
      });
    }
  }

  prepareSearchItems(items) {
    let searchItems = items.map((el, i) => {
      return (
        <li key={i} className="search-item" onClick={this.handleClick}>
          <SearchItem name={el.name} ticker={el.ticker} id={el.id} />
        </li>
      );
    });

    this.setState({ results: searchItems });
  }

  render() {
    return (
      <>
        <i className="fas fa-search"></i>
        <input
          className="search-bar"
          type="text"
          name=""
          id=""
          onKeyUp={this.debounceEvent(this.getData, 300)}
          placeholder="Search"
        />

        <ul
          className={`search-items${
            this.state.results === null ? " hidden" : ""
          }`}
        >
          <li className="category-title">
            <h1>Stocks</h1>
          </li>
          {this.state.results}
        </ul>
      </>
    );
  }
}

export default Searchbar;
