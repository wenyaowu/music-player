import React, { Component } from "react";
import { connect } from "react-redux";
import { getPlaylist, playPlaylist } from "../../store/actions";
import Tracks from "../../components/Tracks/Tracks";
import classes from "./Playlist.module.css";

class Playlist extends Component {
  componentDidMount() {
    this.props.onPlaylistInit("HbczyUgZUwXbvVJCBeUX");
  }

  render() {
    return (
      <div className={classes.Playlist}>
        <Tracks
          tracks={this.props.tracks}
          onTrackSelected={this.props.onTrackSelected}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.playlist.loading,
  error: state.playlist.error,
  tracks: state.playlist.tracks,
});

const mapDispathToProps = (dispatch) => ({
  onPlaylistInit: (playlistId) => dispatch(getPlaylist(playlistId)),
  onTrackSelected: (tracks, idx) => dispatch(playPlaylist(tracks, idx)),
});

export default connect(mapStateToProps, mapDispathToProps)(Playlist);
