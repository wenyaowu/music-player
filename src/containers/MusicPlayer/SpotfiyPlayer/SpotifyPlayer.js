import React, { Component } from "react";
import { connect } from "react-redux";
import { getSDK } from "../../../utils";
import axios from "axios";
import Button from "@material-ui/core/Button";

const SDK_URL = "https://sdk.scdn.co/spotify-player.js";
const SDK_GLOBAL = "Spotify";

class SpotifyPlayer extends Component {
  state = {
    duration: 0,
    player: null,
  };

  componentDidMount() {
    this.props.onMount && this.props.onMount(this);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const Spotify = window.Spotify;
      const player = new Spotify.Player({
        name: "Spotify Player",
        getOAuthToken: (cb) => {
          cb(this.props.spotifyToken);
        },
      });
      window[SDK_GLOBAL] = player;
    };
  }

  state = {
    player: null,
    playerReady: false,
  };

  clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  scopes =
    "user-read-private user-read-email streaming user-modify-playback-state user-read-playback-state";
  redirectUri = "http://localhost:3000/spotify-callback";
  spotifyOAuth = `https://accounts.spotify.com/authorize?clent_id=${
    this.clientId
  }&response_type=token&client_id=${this.clientId}&scope=${encodeURIComponent(
    this.scopes
  )}&redirect_uri=${encodeURIComponent(this.redirectUri)}`;

  onClickSpotifyLoginHandler = () => {
    window.location.href = this.spotifyOAuth;
  };

  load(url) {
    getSDK(SDK_URL, SDK_GLOBAL).then((player) => {
      player.connect();
      // End
      player.addListener("player_state_changed", (state) => {
        // console.log(state);
        // if (
        //   this.state &&
        //   state.track_window.previous_tracks.find(
        //     (x) => x.id === state.track_window.current_track.id
        //   ) &&
        //   !this.state.paused &&
        //   state.paused
        // ) {
        //   this.props.onEnded();
        // }
      });
      // Error
      player.on("playback_error", ({ message }) => {
        this.props.onError();
      });
      // Progress
      // Ready
      player.addListener("ready", ({ device_id }) => {
        this.queueSong(url).then(() => {
          this.getTrack(this.getTrackIdFromURI(url)).then((track) => {
            this.props.onReady();
          });
        });
      });
      this.setState({
        player,
      });
    }, this.props.onError);
  }

  play = () => {
    this.state.player.resume().then(() => {
      this.props.onPlay();
    });
  };

  pause = () => {
    this.state.player.pause().then(() => {
      this.props.onPause();
    });
  };

  queueSong = (url) => {
    return axios
      .put(
        `https://api.spotify.com/v1/me/player/play?device_id=${this.state.player._options.id}`,
        { uris: [url] },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.props.spotifyToken}`,
          },
        }
      )
      .then(() => {
        return this.state.player.pause();
      });
  };

  getDuration = () => {
    return this.state.duration;
  };

  getCurrentTime = () => {
    return 1000;
  };

  getSecondsLoaded = () => {
    return 1000;
  };

  stop = () => {
    this.state.player.disconnect();
  };

  getTrack = (id) => {
    return axios
      .get(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.spotifyToken}`,
        },
      })
      .then((res) => {
        this.setState({ duration: res.data.duration_ms });
      })
      .catch((err) => {
        console.log("Error while getting track", err);
      });
  };

  getTrackIdFromURI(uri) {
    return uri.split(':')[2];
  }

  render() {
    return (
      <div>
        {this.props.isAuthSpotify ? (
          <p>You are connect to Spotify</p>
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
