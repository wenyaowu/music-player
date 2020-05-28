import React from "react";
import MUIInput from "@material-ui/core/Input";

import { withStyles } from "@material-ui/core/styles";

const StyledInput = withStyles({
  root: {
    display: "block",
    backgroundColor: "#424141",
    margin: "15px auto 10px auto",
    width: "80%",
    height: "40px",
    borderRadius: 5,
    color: "#fff",
    fontSize: "15px"
  },
  input: {
    padding: "7px 0 7px 10px",
  }
})(MUIInput);

const Input = (props)=> {
  return <StyledInput {...props}/>;
}

export default Input;
