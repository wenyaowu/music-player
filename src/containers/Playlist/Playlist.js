import React, { Component } from "react";
import { connect } from "react-redux";
import { getPlaylist, playPlaylist } from "../../store/actions";
import Tracks from "../../components/Tracks/Tracks";
import classes from "./Playlist.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
class Playlist extends Component {
  componentDidMount() {}

  render() {
    let tracks =
      this.props.selectedPlaylist &&
      this.props.selectedPlaylist.tracks.length > 0 ? (
        <Tracks
          tracks={this.props.selectedPlaylist.tracks}
          onTrackSelected={this.props.onTrackSelected}
        />
      ) : (
        <p>Add songs to start your playlist</p>
      );
    return (
      <div className={classes.Playlist}>
        {this.props.loading ? (
          <Spinner />
        ) : this.props.selectedPlaylist ? (
          tracks
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
