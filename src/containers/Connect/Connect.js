import React, { Fragment } from "react";
import { connect } from "react-redux";
import ConnectItem from "./ConnectItem/ConnectItem";
import classes from "./Connect.module.css";
import SpotifyLogoWhite from "../../assets/images/Spotify_Icon_RGB_White.png";
import SpotifyLogoGreen from "../../assets/images/Spotify_Icon_RGB_Green.png";
import SCLogoBlack from "../../assets/images/soundcloud_inactive.png";
import SCLogoOrange from "../../assets/images/soundcloud_active.png";
import YoutubeWhite from "../../assets/images/yt_logo_mono_dark.png";
import YoutubeColor from "../../assets/images/yt_logo_rgb_dark.png";

const Connect = (props) => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const scopes =
    "user-read-private user-read-email streaming user-modify-playback-state user-read-playback-state";
  const redirectUri = "http://localhost:3000/spotify-callback";
  const spotifyOAuth = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${encodeURIComponent(
    scopes
  )}&redirect_uri=${encodeURIComponent(redirectUri)}`;

  const onClickSpotifyLoginHandler = () => {
    window.location.href = spotifyOAuth;
  };

  const onClickSCLoginHandler = () => {
    console.log("Auth SC");
  };

  const onClickYoutubeLoginHandler = () => {
    console.log("Auth Youtube");
  };

  return (
    <Fragment>
      <h3 className={classes.Title}>
        Connect to premium accounts to get better listening experience
      </h3>
      <div className={classes.Connect}>
        <ConnectItem
          platform="Spotify"
          onClickConnect={onClickSpotifyLoginHandler}
          loggedIn={props.isAuthSpotify}
          logoLoggedIn={SpotifyLogoGreen}
          logoLoggedOut={SpotifyLogoWhite}
        />
        <ConnectItem
          platform="Sound Cloud"
          onClickConnect={onClickSCLoginHandler}
          loggedIn={true}
          logoLoggedIn={SCLogoOrange}
          logoLoggedOut={SCLogoBlack}
        /> 
        <ConnectItem
          platform="Youtube"
          logoStyle={{ height: 30 }}
          onClickConnect={onClickYoutubeLoginHandler}
          loggedIn={false}
          logoLoggedIn={YoutubeColor}
          logoLoggedOut={YoutubeWhite}
        />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthSpotify: state.auth.spotifyToken !== null,
});

export default connect(mapStateToProps)(Connect);
