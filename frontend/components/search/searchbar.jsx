import React from "react";
import * as SearchAPIUtil from '../../util/search_util';

class Searchbar extends React.Component {
  constructor(props) {
    super(props);

    // this.handleClick = this.handleClick.bind(this);
    this.debounce = this.debounce.bind(this)

  }

  // handleClick (e) {
  //   debugger
  //   SearchAPIUtil.searchDB('AApl')
  //   .then((response) => {
  //       debugger
  //   })
  // }

  getData(e) {
      debugger
    SearchAPIUtil.searchDB('AApl')
    .then((response) => {
        debugger
    })
  }

  // debounce function! :D
  debounce (func, wait, immediate) {
    let timer;
    return () => {
      let context = this;
      args = arguments;
      clearTimeout(timer)
      timer = setTimeout(() => {
        getData.apply(context, arguments)
      }, wait)
    }
  }

  render() {
    return (
      <>
        {/* <h1>Hello from search</h1> */}
        <input className='search-bar' type="text" name="" id=""  onKeyUp={this.debounce}/>
        {/* <button onClick={this.handleClick}>This is a button</button> */}
        {/* <h1>end search</h1> */}
      </>
    )
  }
}

export default Searchbar;
