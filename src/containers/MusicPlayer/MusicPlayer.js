import React, { Fragment, useState, lazy } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import classes from "./MusicPlayer.module.css";
import { play, pause, next, previous } from "../../store/actions";
import TrackInfo from "../../components/MusicPlayer/TrackInfo/TrackInfo";
import PlayControls from "../../components/MusicPlayer/PlayerControls/PlayerControls";
import VolumeControl from "../../components/MusicPlayer/VolumeControl/VolumeControl";

const MusicPlayer = (props) => {
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(0);
  const [volume, setVolume] = useState(null);

  // const reactPlayerRef = useRef();

  const onProgessHandler = ({ played, loaded }) => {
    setBuffer(loaded * 100);
    setProgress(played * 100);
  };

  const onVolumeChangeHander = (_, value) => {
    setVolume(value / 100);
  };

  ReactPlayer.addCustomPlayer({
    key: "spotify",
    canPlay: (url) => url.includes("spotify"),
    lazyPlayer: lazy(() =>
      import(
        /* webpackChunkName: 'reactPlayerSpotify' */ "./SpotfiyPlayer/SpotifyPlayer"
      )
    ),
  });

  /**
   * TODO: Enhance this
   */
  const currentTrack =
    props.queue.length <= 0 ? null : props.queue[props.currentPlayingIndex];

  return (
    <div className={classes.MusicPlayer}>
      {currentTrack ? (
        <Fragment>
          <ReactPlayer
            url={currentTrack.url}
            playing={props.playing}
            onProgress={onProgessHandler}
            onEnded={props.onNext}
            progressInterval={500}
            height="1"
            width="1"
            style={{ display: "none" }}
            volume={volume}
          />

          <TrackInfo
            image={currentTrack.image}
            artist={currentTrack.artist}
            title={currentTrack.title}
          />
          <PlayControls
            isPlaying={props.playing}
            progress={progress}
            buffer={buffer}
            onSkipPrevious={props.onPrevious}
            onPause={props.onPause}
            onPlay={props.onPlay}
            onSkipNext={props.onNext}
          />
          <VolumeControl onVolumeChanged={onVolumeChangeHander} />
        </Fragment>
      ) : (
        "Select A Playlist to Start Playing"
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  queue: state.player.queue,
  currentPlayingIndex: state.player.currentPlayingIndex,
  playing: state.player.playing,
});

const mapDispatchToProps = (dispatch) => ({
  onPlay: () => dispatch(play()),
  onPause: () => dispatch(pause()),
  onNext: () => dispatch(next()),
  onPrevious: () => dispatch(previous()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
