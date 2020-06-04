import React from "react";
import classes from "./Welcome.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(1),
    },
  },
}));

const Welcome = (props) => {
  const styles = useStyles();
  return (
    <div className={[classes.Welcome, styles.root].join(" ")}>
      <h2>Play any song on all platforms, in one application</h2>
      <Button
        color="primary"
        size="large"
        variant="contained"
        fullWidth={true}
        onClick={props.onSignUpClicked}
      >
        Sign Up For Free
      </Button>
      <Button
        color="default"
        size="large"
        variant="contained"
        fullWidth={true}
        onClick={props.onSignInClicked}
      >
        Log In
      </Button>
    </div>
  );
};

export default Welcome;
