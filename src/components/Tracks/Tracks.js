import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import classes from "./Tracks.module.css";

const Tracks = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table className={classes.Table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="left">Artist</TableCell>
            <TableCell align="left">Album</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tracks.map((track, idx) => (
            <TableRow key={`${track.title}-${idx}`}>
              <TableCell align="center">
                <PlayCircleOutlineIcon
                  onClick={(event) => props.onTrackSelected(track)}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {track.title}
              </TableCell>
              <TableCell align="left">{track.artist}</TableCell>
              <TableCell align="left">{track.album}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tracks;
