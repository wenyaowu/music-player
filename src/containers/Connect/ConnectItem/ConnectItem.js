import React from "react";
import classes from "./ConnectItem.module.css";

const ConnectItem = (props) => {
  
  const connectItemClasses = [classes.ConnectItem]
  if(!props.loggedIn) {
    connectItemClasses.push(classes.Active)
  }
  
  return (
    <div
      onClick={props.loggedIn ? null : props.onClickConnect}
      className={connectItemClasses.join(" ")}
    >
      <img
        style={props.logoStyle}
        src={props.loggedIn ? props.logoLoggedIn : props.logoLoggedOut}
        alt="icon"
      ></img>
      {props.loggedIn ? (
        <p>You are connected to {props.platform}</p>
      ) : (
        <p style={{ cursor: "pointer" }}>
          Click to connect to {props.platform}
        </p>
      )}
    </div>
  );
};

export default ConnectItem;
