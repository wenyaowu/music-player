import React, { Component } from "react";
import classes from "./TopBar.module.css";

class TopBar extends Component {
  render() {
    return (
      <div className={classes.TopBar}>
        <div className={classes.Search}>Search Bar</div>
      </div>
    );
  }
}


export default TopBar
