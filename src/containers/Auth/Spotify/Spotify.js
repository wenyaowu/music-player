import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { spotifyAuthSccess } from "../../../store/actions";
const Spotify = (props) => {
  const { hash } = props.location;
  const { onSpotifyCallback } = props;
  useEffect(() => {
    const { access_token: accessToken, expires_in: expiresIn } = hash
      .substring(1)
      .split("&")
      .reduce((accum, current) => {
        const [key, value] = current.split("=");
        accum[key] = value;
        return accum;
      }, {});
    onSpotifyCallback(accessToken, expiresIn);
  }, [hash, onSpotifyCallback]);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => ({
  onSpotifyCallback: (token, expiresIn) =>
    dispatch(spotifyAuthSccess(token, expiresIn)),
});

export default connect(null, mapDispatchToProps)(Spotify);
