import React from "react";
import classes from "./PlayerControls.module.css";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  colorPrimary: {
    color: "white",
  },
});

const PlayerControls = (props) => {
  const styles = useStyles();

  return (
    <div className={classes.PlayerControls}>
      <div className={classes.Controls}>
        <SkipPreviousIcon
          className={classes.Icon}
          onClick={props.onSkipPrevious}
          fontSize="large"
        />
        {props.isPlaying ? (
          <PauseIcon
            className={classes.Icon}
            onClick={props.onPause}
            fontSize="large"
          />
        ) : (
          <PlayArrowIcon
            className={classes.Icon}
            onClick={props.onPlay}
            fontSize="large"
          />
        )}
        <SkipNextIcon
          className={classes.Icon}
          onClick={props.onSkipNext}
          fontSize="large"
        />
      </div>
      <div className={classes.Progress}>
        <Slider
          value={props.progress}
          classes={{ colorPrimary: styles.colorPrimary }}
        />
      </div>
    </div>
  );
};

export default PlayerControls;
