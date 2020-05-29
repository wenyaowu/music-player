import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { search, clearSearch,addTrackToPlaylist } from "../../../store/actions";
import * as debounce from "lodash/debounce";
import classes from "./Search.module.css";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import SearchResultItem from "./SearchResultItem/SearchResultItem";

class Search extends Component {
  state = {
    searchResultOpened: false,
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  onInputChangeHandler = (event) => {
    // Use this to trigger search
    event.persist();
    if (!this.debouncedFn) {
      this.debouncedFn = debounce(() => {
        let v = event.target.value;
        if (v && v.length > 0) {
          this.props.onSearch(v);
        }
        if (v.length === 0) {
          this.props.onClearSearchResult();
        }
      }, 500);
    }
    this.debouncedFn();
  };

  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.onCloseHandler();
  };

  onCloseHandler = () => {
    this.setState({
      searchResultOpened: false,
    });
  };

  onOpenHandler = () => {
    this.setState({
      searchResultOpened: true,
    });
  };

  onSearchResultAddClickedHandler = (track) => {
    const playlistId = "iBo8IlkzZaykbdg1gtgJ";
    this.props.onAddTrack(playlistId, track);
    console.log("Add clicked: track", track);
  };

  render() {
    const searchResults = this.props.results.map((item, idx) => (
      <SearchResultItem
        key={`${item.title}-${item.artist}-${idx}`}
        image={item.image}
        title={item.title}
        artist={item.artist}
        addClick={() => this.onSearchResultAddClickedHandler(item)}
      />
    ));

    let dropdownContentClasses = [classes.DropdownContent];
    if (!this.state.searchResultOpened) {
      dropdownContentClasses.push(classes.Hide);
    }

    return (
      <div
        className={classes.Search}
        ref={(node) => {
          this.node = node;
        }}
      >
        <TextField
          onFocus={this.onOpenHandler}
          style={{ backgroundColor: "#333", color: "white", width: "100%" }}
          variant="outlined"
          onChange={this.onInputChangeHandler}
          InputProps={{
            style: { color: "white" },
            placeholder: "Search",
            startAdornment: (
              <InputAdornment position="start">
                <IconButton style={{ color: "white" }}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className={dropdownContentClasses.join(" ")}>{searchResults}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.search.loading,
  error: state.search.error,
  results: state.search.results,
});

const mapDispatchToProps = (dispatch) => ({
  onAddTrack: (playlistId, track) => dispatch(addTrackToPlaylist(playlistId, track)),
  onSearch: (term) => dispatch(search(term)),
  onClearSearchResult: () => dispatch(clearSearch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
