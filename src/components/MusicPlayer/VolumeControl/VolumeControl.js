import React from "react";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";
import classes from "./VolumeControl.module.css";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  colorPrimary: {
    color: "white"
  }
});

const VolumeControl = (props) => {
  const styles = useStyles();

  return (
    <div className={classes.VolumeControl}>
      <VolumeDown />
      <Slider
        className={classes.Slider}
        defaultValue={50}
        onChangeCommitted={props.onVolumeChanged}
        classes={{ colorPrimary: styles.colorPrimary }}
      />
      <VolumeUp />
    </div>
  );
};

export default VolumeControl;
