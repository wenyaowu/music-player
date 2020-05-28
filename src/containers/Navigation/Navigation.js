import React, { Component } from "react";
import classes from "./Navigation.module.css";
import Playlists from "../../components/Navigation/Playlists/Playlists";
import NavigationItems from "../../components/Navigation/NavigationItems/NavigationItems";

class Navigation extends Component {
  render() {
    return (
      <div className={classes.Navigation}>
        <NavigationItems />
        <Playlists />
      </div>
    );
  }
}

export default Navigation;
