import React, { Component, Fragment } from "react";
import classes from "./Layout.module.css";
import MusicPlayer from "../MusicPlayer/MusicPlayer";

class Layout extends Component {
  render() {
    return (
      <Fragment>
        <div className={classes.Top}>
          <div className={classes.Navbar}>Navbar</div>
          <div className={classes.Main}>
            <div className={classes.Search}>Search Bar</div>
            <main className={classes.Content}>{this.props.children}</main>
          </div>
        </div>
        <MusicPlayer />
      </Fragment>
    );
  }
}

export default Layout;
