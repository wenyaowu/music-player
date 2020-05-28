import React from "react";
import classes from "./Playlists.module.css";
import { NavLink } from "react-router-dom";

function Playlists() {
  return (
    <div className={classes.Playlists}>
      <p style={{ fontSize: "0.875rem" }}>PLAYLISTS</p>
      <ul className={classes.List}>
        <li className={classes.ListItem}>Playlist 1</li>
        <li className={classes.ListItem}>Playlist 2</li>
        <li className={classes.ListItem}>Playlist 3</li>
        <li className={classes.ListItem}>Playlist 4</li>
      </ul>
    </div>
  );
}

export default Playlists;
