import React, { Component, Fragment } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import classes from "./MusicPlayer.module.css";
import { play, pause, next, previous } from "../../store/actions";
import TrackInfo from "../../components/MusicPlayer/TrackInfo/TrackInfo";
import PlayControls from "../../components/MusicPlayer/PlayerControls/PlayerControls";
import VolumeControl from "../../components/MusicPlayer/VolumeControl/VolumeControl";

class MusicPlayer extends Component {
  state = {
    progress: 0,
    buffer: 0,
    volume: null,
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
    const currentTrack =
      this.props.queue.length <= 0
        ? null
        : this.props.queue[this.props.currentPlayingIndex];

    return (
      <div className={classes.MusicPlayer}>
        {currentTrack ? (
          <Fragment>
            <ReactPlayer
              url={currentTrack.url}
              playing={this.props.playing}
              onProgress={this.onProgessHandler}
              onEnded={this.props.onNext}
              progressInterval={500}
              height="0"
              width="0"
              ref={this.getPlayerRef}
              volume={this.state.volume}
            />
            <TrackInfo
              albumCover={currentTrack.albumCover}
              artist={currentTrack.artist}
              title={currentTrack.title}
            />
            <PlayControls
              isPlaying={this.props.playing}
              progress={this.state.progress}
              buffer={this.state.buffer}
              onSkipPrevious={this.props.onPrevious}
              onPause={this.props.onPause}
              onPlay={this.props.onPlay}
              onSkipNext={this.props.onNext}
            />
            <VolumeControl onVolumeChanged={this.onVolumeChangeHander} />
          </Fragment>
        ) : "Select A Playlist to Start Playing"}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  queue: state.player.queue,
  currentPlayingIndex: state.player.currentPlayingIndex,
  playing: state.player.playing,
});

const mapDispatchToProps = (dispatch) => ({
  onPlay: () => dispatch(play()),
  onPause: () => dispatch(pause()),
  onNext: () => dispatch(next()),
  onPrevious: ()=>dispatch(previous())
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
