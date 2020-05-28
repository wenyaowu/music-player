import React from "react";
import classes from "./Playlists.module.css";

const Playlists = (props) => {

  const playlists = props.playlists.map((playlist, idx) => {
    return (
      <li key={`${playlist.name}-${idx}`} className={classes.ListItem} onClick={()=> props.onPlaylistClicked(playlist.id)}>
        {playlist.name}
      </li>
    );
  });
  return (
    <div className={classes.Playlists}>
      <p style={{ fontSize: "0.875rem" }}>PLAYLISTS</p>
      <ul className={classes.List}>{playlists}</ul>
    </div>
  );
};

export default Playlists;
