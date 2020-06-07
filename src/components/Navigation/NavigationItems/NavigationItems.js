import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import HomeIcon from "@material-ui/icons/Home";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">
        <div className={classes.Link}>
          <HomeIcon /> <span style={{ paddingLeft: "10px" }}>Home</span>
        </div>
      </NavigationItem>
      <NavigationItem link="/connect">
        <div className={classes.Link}>
          <SettingsEthernetIcon />{" "}
          <span style={{ paddingLeft: "10px" }}>Connect</span>
        </div>
      </NavigationItem>
      <NavigationItem link="/">
        {" "}
        <div className={classes.Link}>
          <AccountCircleIcon />{" "}
          <span style={{ paddingLeft: "10px" }}>Account</span>
        </div>
      </NavigationItem>
      <NavigationItem link="/logout">
        {" "}
        <div className={classes.Link}>
          <ExitToAppIcon /> <span style={{ paddingLeft: "10px" }}>Log Out</span>
        </div>
      </NavigationItem>
    </ul>
  );
};

export default NavigationItems;
