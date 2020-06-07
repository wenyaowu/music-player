import React from "react";
import classes from "./ConnectItem.module.css";

const ConnectItem = (props) => {
  return (
    <div className={classes.ConnectItem}>
      <img
        src={props.loggedIn ? props.logoLoggedIn : props.logoLoggedOut}
        alt="icon"
      ></img>
      {props.loggedIn ? (
        <p>You are connected to {props.platform}</p>
      ) : (
        <p onClick={props.onClickConnect} style={{ cursor: "pointer" }}>
          Click to connect to {props.platform}
        </p>
      )}
    </div>
  );
};

export default ConnectItem;
