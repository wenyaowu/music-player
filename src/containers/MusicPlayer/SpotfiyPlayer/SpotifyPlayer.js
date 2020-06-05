import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Script from "react-load-script";
import axios from "axios";

class SpotifyPlayer extends Component {
  state = {
    player: null,
    playerReady: false,
  };

  clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  scopes =
    "user-read-private user-read-email streaming user-modify-playback-state";
  redirectUri = "http://localhost:3000/spotify-callback";
  spotifyOAuth = `https://accounts.spotify.com/authorize?clent_id=${
    this.clientId
  }&response_type=token&client_id=${this.clientId}&scope=${encodeURIComponent(
    this.scopes
  )}&redirect_uri=${encodeURIComponent(this.redirectUri)}`;

  onClickSpotifyLoginHandler = () => {
    window.location.href = this.spotifyOAuth;
  };

  spotifySDKloadedHandler = (spotifyToken) => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const Spotify = window.Spotify;
      const player = new Spotify.Player({
        name: "Spotify Player",
        getOAuthToken: (cb) => {
          cb(spotifyToken);
        },
      });
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });
      player.addListener("player_state_changed", (state) => {
        if (
          this.state &&
          state.track_window.previous_tracks.find(
            (x) => x.id === state.track_window.current_track.id
          ) &&
          !this.state.paused &&
          state.paused
        ) {
          this.props.onEnded();
        }
        this.state = state;
      });

      player.connect();
      this.setState({ player });
    };
  };

  play = () => {
    axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${this.state.player._options.id}`,
      {
        uris: [this.props.url],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.spotifyToken}`,
        },
      }
    );
  };

  render() {
    return (
      <div>
        {this.props.isAuthSpotify ? (
          <Fragment>
            <Script
              url="https://sdk.scdn.co/spotify-player.js"
              onCreate={() => {}}
              onError={() => {}}
              onLoad={() => {
                this.spotifySDKloadedHandler(this.props.spotifyToken);
              }}
            />
            <p>You are connect to Spotify</p>
            {this.state.player ? (
              <Button color="primary" onClick={this.play}>
                Play Song
              </Button>
            ) : null}
          </Fragment>
        ) : (
          <Button color="primary" onClick={this.onClickSpotifyLoginHandler}>
            Conntect to Spotify
          </Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  spotifyToken: state.auth.spotifyToken,
  isAuthSpotify: state.auth.spotifyToken !== null,
});

export default connect(mapStateToProps)(SpotifyPlayer);
