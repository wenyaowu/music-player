import React, { Component } from "react";
import { connect } from "react-redux";
import { getPlaylist, playTrack } from "../../store/actions";
import Tracks from "../../components/Tracks/Tracks";

class Playlist extends Component {
  componentDidMount() {
    this.props.onPlaylistInit("HbczyUgZUwXbvVJCBeUX");
  }

  render() {
    return (
      <div>
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
  onTrackSelected: (track) => dispatch(playTrack(track)),
});

export default connect(mapStateToProps, mapDispathToProps)(Playlist);
