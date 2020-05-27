import React, { Component } from "react";
import ReactPlayer from "react-player";
import classes from "./MusicPlayer.module.css";
import TrackInfo from "../../components/MusicPlayer/TrackInfo/TrackInfo";
import PlayControls from "../../components/MusicPlayer/PlayerControls/PlayerControls";
import VolumeControl from "../../components/MusicPlayer/VolumeControl/VolumeControl";

class MusicPlayer extends Component {
  state = {
    isPlaying: false,
    progress: 0,
    buffer: 0,
    volume: null,
    track: {},
  };

  onPlayHandler = () => {
    this.setState({
      isPlaying: true,
    });
  };

  onPauseHandler = () => {
    this.setState({
      isPlaying: false,
    });
  };

  onSkipPreviousHandler = () => {
    console.log("[MusicPlayer] onSkipPreviousHandler");
  };

  onSkipNextHandler = () => {
    console.log("[MusicPlayer] onSkipNextHandler");
  };

  onProgessHandler = ({ played, loaded }) => {
    this.setState({
      progress: played * 100,
      buffer: loaded * 100,
    });
  };

  onVolumeChangeHander = (_, value) => {
    this.setState({ volume: value / 100 });
  };

  getPlayerRef = (player) => {
    this.player = player;
  };

  render() {
    return (
      <div className={classes.MusicPlayer}>
        <ReactPlayer
          url="https://soundcloud.com/billieeilish/bad-guy"
          playing={this.state.isPlaying}
          onProgress={this.onProgessHandler}
          progressInterval="500"
          height="0"
          width="0"
          ref={this.getPlayerRef}
          volume={this.state.volume}
        />
        <TrackInfo />
        <PlayControls
          isPlaying={this.state.isPlaying}
          progress={this.state.progress}
          buffer={this.state.buffer}
          onSkipPrevious={this.onSkipPreviousHandler}
          onPause={this.onPauseHandler}
          onPlay={this.onPlayHandler}
          onSkipNext={this.onSkipNextHandler}
        />
        <VolumeControl onVolumeChanged={this.onVolumeChangeHander} />
      </div>
    );
  }
}

export default MusicPlayer;
