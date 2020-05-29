import React, { Component } from "react";
import classes from "./TopBar.module.css";
import Search from './Search/Search'

class TopBar extends Component {
  render() {
    return (
      <div className={classes.TopBar}>
        <Search/>
      </div>
    );
  }
}


export default TopBar
