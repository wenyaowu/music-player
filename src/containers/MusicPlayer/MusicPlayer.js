import React, { Component } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import classes from "./MusicPlayer.module.css";
import { play, pause } from "../../store/actions";
import TrackInfo from "../../components/MusicPlayer/TrackInfo/TrackInfo";
import PlayControls from "../../components/MusicPlayer/PlayerControls/PlayerControls";
import VolumeControl from "../../components/MusicPlayer/VolumeControl/VolumeControl";

class MusicPlayer extends Component {
  state = {
    isPlaying: false,
    progress: 0,
    buffer: 0,
    volume: null,
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
          url={this.props.track.url}
          playing={this.props.playing}
          onProgress={this.onProgessHandler}
          progressInterval="500"
          height="0"
          width="0"
          ref={this.getPlayerRef}
          volume={this.state.volume}
        />
        <TrackInfo
          albumCover={this.props.track.albumCover}
          artist={this.props.track.artist}
          title={this.props.track.title}
        />
        <PlayControls
          isPlaying={this.props.playing}
          progress={this.state.progress}
          buffer={this.state.buffer}
          onSkipPrevious={this.onSkipPreviousHandler}
          onPause={this.props.onPause}
          onPlay={this.props.onPlay}
          onSkipNext={this.onSkipNextHandler}
        />
        <VolumeControl onVolumeChanged={this.onVolumeChangeHander} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  track: state.player.track,
  playing: state.player.playing,
});

const mapDispatchToProps = (dispatch) => ({
  onPlay: () => dispatch(play()),
  onPause: () => dispatch(pause()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
