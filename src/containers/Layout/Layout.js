import React, { Component, Fragment } from "react";
import classes from "./Layout.module.css";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import Navigation from '../../components/Navigation/Navigation';

class Layout extends Component {
  render() {
    return (
      <Fragment>
        <div className={classes.Top}>
          <Navigation/>

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
