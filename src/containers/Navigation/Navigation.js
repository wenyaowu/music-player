import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Navigation.module.css";
import Playlists from "../../components/Navigation/Playlists/Playlists";
import NavigationItems from "../../components/Navigation/NavigationItems/NavigationItems";
import { getPlaylist, getUserPlaylists } from "../../store/actions";
import { withRouter } from "react-router-dom";
import Modal from "../../components/UI/Modal/Modal";
import NewPlaylist from "../NewPlaylist/NewPlaylist";

class Navigation extends Component {
  state = {
    addPlaylistModalOpened: false,
  };

  componentDidMount() {
    this.props.onNavigationInit(this.props.userId);
  }
  onPlaylistClickedHandlder = (playlistId) => {
    this.props.onPlaylistInit(playlistId);
    this.props.history.push("/playlist");
  };
  onAddPlaylistClickedHandler = () => {
    this.setState({
      addPlaylistModalOpened: true,
    });
  };
  onModalClosedHandler = () => {
    this.setState({
      addPlaylistModalOpened: false,
    });
  };
  render() {
    return (
      <div className={classes.Navigation}>
        <NavigationItems />
        <Playlists
          playlists={this.props.playlists}
          onPlaylistClicked={this.onPlaylistClickedHandlder}
          onAddPlaylistClicked={this.onAddPlaylistClickedHandler}
        />
        <Modal
          show={this.state.addPlaylistModalOpened}
          modalClosed={this.onModalClosedHandler}
        >
          <NewPlaylist />
        </Modal>
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
