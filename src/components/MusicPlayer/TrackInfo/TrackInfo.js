import React from "react";
import classes from "./TrackInfo.module.css";

const TrackInfo = (props) => {
  const albumCover = props.image ? (
    <img className={classes.AlbumCover} src={props.image} alt="album cover"></img>
  ) : (
    <div className={classes.CoverPlaceHolder}></div>
  );
  return (
    <div className={classes.TrackInfo}>
      {albumCover}
      <div className={classes.Info}>
        <p>
          <strong>{props.title}</strong>
        </p>
        <p>{props.artist}</p>
      </div>
    </div>
  );
};

export default TrackInfo;
