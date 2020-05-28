import React, { Component, Fragment } from "react";
import classes from "./Layout.module.css";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import Navigation from '../Navigation/Navigation';
import TopBar from '../TopBar/TopBar';
class Layout extends Component {
  render() {
    return (
      <Fragment>
        <div className={classes.Top}>
          <Navigation/>

          <div className={classes.Main}>
            <TopBar/>
            <main className={classes.Content}>{this.props.children}</main>
          </div>
        </div>
        <MusicPlayer />
      </Fragment>
    );
  }
}

export default Layout;
