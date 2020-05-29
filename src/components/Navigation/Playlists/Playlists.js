import React from "react";
import classes from "./Playlists.module.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const Playlists = (props) => {
  const playlists = props.playlists.map((playlist, idx) => {
    return (
      <li
        key={`${playlist.name}-${idx}`}
        className={classes.ListItem}
        onClick={() => props.onPlaylistClicked(playlist.id)}
      >
        {playlist.name}
      </li>
    );
  });
  return (
    <div className={classes.Playlists}>
      <div className={classes.ListContainer}>
        <p style={{ fontSize: "0.875rem" }}>PLAYLISTS</p>
        <ul className={classes.List}>{playlists}</ul>
      </div>

      <button className={classes.NewPlaylist} onClick={props.onAddPlaylistClicked}>
        <AddCircleOutlineIcon />
        <span style={{ paddingLeft: "10px" }}>New Playlist</span>
      </button>
    </div>
  );
};

export default Playlists;
