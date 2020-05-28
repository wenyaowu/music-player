import React, { Component } from "react";
import { connect } from "react-redux";
import { getPlaylist, playPlaylist } from "../../store/actions";
import Tracks from "../../components/Tracks/Tracks";
import classes from "./Playlist.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";

class Playlist extends Component {
  componentDidMount() {
    this.props.onPlaylistInit("HbczyUgZUwXbvVJCBeUX");
  }

  render() {
    return (
      <div className={classes.Playlist}>
        {this.props.loading ? (
          <CircularProgress />
        ) : this.props.selectedPlaylist ? (
          <Tracks
            tracks={this.props.selectedPlaylist.tracks}
            onTrackSelected={this.props.onTrackSelected}
          />
        ) : (
          <p>Select Playlist To Start</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.playlist.loading,
  error: state.playlist.error,
  selectedPlaylist: state.playlist.selectedPlaylist,
});

const mapDispathToProps = (dispatch) => ({
  onPlaylistInit: (playlistId) => dispatch(getPlaylist(playlistId)),
  onTrackSelected: (tracks, idx) => dispatch(playPlaylist(tracks, idx)),
});

export default connect(mapStateToProps, mapDispathToProps)(Playlist);
