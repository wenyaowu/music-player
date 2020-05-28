import React from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./Welcome.module.css";

const Welcome = (props) => {
  return (
    <div className={classes.Welcome}>
      <h2>Play any song on all platforms, in one application</h2>
      <Button onClick={props.onSignUpClicked} fullWidth={true}>
        Sign Up For Free
      </Button>
      <Button btntype="secondary" onClick={props.onSignInClicked} fullWidth={true}>
        Log In
      </Button>
    </div>
  );
};

export default Welcome;
