import React, { Component } from "react";
import classes from "./Feed.module.css";
import SpotifyPlayer from '../MusicPlayer/SpotfiyPlayer/SpotifyPlayer';
class Feed extends Component {
  render() {
    return (
      <div className={classes.Feed}>
        <SpotifyPlayer />
        <h1>Welcome</h1>
      </div>
    );
  }
}

export default Feed;
