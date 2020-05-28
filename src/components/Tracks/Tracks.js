import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import classes from "./Tracks.module.css";

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      stickyHeader: {
        backgroundColor: "inherit",
        color: "#fff",
      },
      body: {
        color: "#fff",
      },
    },
  },
});

const Tracks = (props) => {
  return (
    <div className={classes.Tracks}>
      <ThemeProvider theme={theme}>
        <TableContainer>
          <Table stickyHeader={true} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <strong>Title</strong>
                </TableCell>
                <TableCell align="left">
                  <strong>Artist</strong>
                </TableCell>
                <TableCell align="left">
                  <strong>Album</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.tracks.map((track, idx) => (
                <TableRow key={`${track.title}-${idx}`}>
                  <TableCell align="center">
                    <PlayCircleOutlineIcon
                      onClick={() => props.onTrackSelected(props.tracks, idx)}
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
      </ThemeProvider>
    </div>
  );
};

export default Tracks;
