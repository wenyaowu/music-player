import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Navigation.module.css";
import Playlists from "../../components/Navigation/Playlists/Playlists";
import NavigationItems from "../../components/Navigation/NavigationItems/NavigationItems";
import { getPlaylist, getUserPlaylists } from "../../store/actions";
import { withRouter } from "react-router-dom";

class Navigation extends Component {
  componentDidMount() {
    this.props.onNavigationInit(this.props.userId);
  }
  onPlaylistClickedHandlder = (playlistId) => {
    this.props.onPlaylistInit(playlistId);
    this.props.history.push("/playlist");
  };

  render() {
    return (
      <div className={classes.Navigation}>
        <NavigationItems />
        <Playlists
          playlists={this.props.playlists}
          onPlaylistClicked={this.onPlaylistClickedHandlder}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playlists: state.playlist.playlists,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  onNavigationInit: (userId) => dispatch(getUserPlaylists(userId)),
  onPlaylistInit: (playlistId) => dispatch(getPlaylist(playlistId)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Navigation)
);
