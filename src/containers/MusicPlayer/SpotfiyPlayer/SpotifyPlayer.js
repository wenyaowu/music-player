import React, { Component } from "react";
import { connect } from "react-redux";
import { getSDK } from "../../../utils";
import {
  spotifyPlayerReady,
  spotifyPlayerUnmount,
} from "../../../store/actions";
import axios from "axios";
const SDK_URL = "https://sdk.scdn.co/spotify-player.js";
const SDK_GLOBAL = "Spotify";

class SpotifyPlayer extends Component {
  state = {
    duration: 0,
    player: null,
    playerReady: false,
  };

  componentWillUnmount() {
    this.props.onSpotifyUnmount();
  }

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

  load(url) {
    getSDK(SDK_URL, SDK_GLOBAL).then((player) => {
      player.connect();
      // End
      player.addListener("player_state_changed", (state) => {
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
      this.setState({
        player,
      });
      // Ready
      if (this.props.spotifyPlayerReady) {
        console.log("Spotify WAS ready");
        this.queueSong(url).then(() => {
          this.getTrack(this.getTrackIdFromURI(url)).then((track) => {
            this.props.onReady();
          });
        });
      } else {
        player.addListener("ready", ({ device_id }) => {
          console.log("[event] player ready call on ready");
          this.props.onSpotifyReady();
          this.queueSong(url).then(() => {
            this.getTrack(this.getTrackIdFromURI(url)).then((track) => {
              this.props.onReady();
            });
          });
        });
      }
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
    return uri.split(":")[2];
  }

  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => ({
  spotifyToken: state.auth.spotifyToken,
  isAuthSpotify: state.auth.spotifyToken !== null,
  spotifyPlayerReady: state.player.spotifyPlayerReady,
});

const mapDispatchToProps = (dispatch) => ({
  onSpotifyReady: () => dispatch(spotifyPlayerReady()),
  onSpotifyUnmount: () => dispatch(spotifyPlayerUnmount()),
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotifyPlayer);
