import MUIButton from "@material-ui/core/Button";
import React from "react";
import { withStyles } from "@material-ui/core/styles";

const PrimaryButton = withStyles({
  root: {
    background: "#1cb954",
    borderRadius: 30,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    display: "block",
    fontWeight: "bold",
    margin: "10px auto 10px auto",
    "&:hover": {
      backgroundColor: "#1cb954",
      opacity: 0.8,
    },
  },
  label: {
    textTransform: "uppercase",
  },
})(MUIButton);

const SecondaryButton = withStyles({
  root: {
    background: "#fff",
    borderRadius: 30,
    border: 0,
    fontSize: 15,
    color: "black",
    height: 48,
    padding: "0 30px",
    fontWeight: "bold",
    display: "block",
    margin: "10px auto 10px auto",
    "&:hover": {
      backgroundColor: "#fff",
      opacity: 0.8,
    },
  },
  label: {
    textTransform: "uppercase",
  },
})(MUIButton);

const Button = (props) => {
  return props.btntype === "secondary" ? (
    <SecondaryButton {...props} />
  ) : (
    <PrimaryButton {...props} />
  );
};

export default Button;
