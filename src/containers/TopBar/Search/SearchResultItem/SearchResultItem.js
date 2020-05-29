import React from "react";
import classes from "./SearchResultItem.module.css";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
const SearchResultItem = (props) => {
  return (
    <div className={classes.SearchResultItem}>
      <img src={props.image} alt="track"/>
      <div className={classes.Info}>
        <p>
          <strong>{props.title}</strong>
        </p>
        <p>{props.artist}</p>
      </div>
      <IconButton onClick={props.addClick}>
        <AddIcon style={{ color: "white" }} />
      </IconButton>
    </div>
  );
};

export default SearchResultItem;
