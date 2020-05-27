import React from "react";
import classes from "./TrackInfo.module.css";

const TrackInfo = (props) => {
  return (
    <div className={classes.TrackInfo}>
      <img
        className={classes.AlbumCover}
        src="https://vignette.wikia.nocookie.net/wherearetheavocados/images/0/06/DyGkj-cU0AAGLH-.jpeg/revision/latest?cb=20190525003458"
      ></img>
      <div className={classes.Info}>
        <p>
          <strong>Bad Guy</strong>
        </p>
        <p>Billie Eilish</p>
      </div>
    </div>
  );
};

export default TrackInfo;
