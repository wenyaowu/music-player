import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import {
  search,
  clearSearch,
  addTrackToPlaylist,
} from "../../../store/actions";
import classes from "./Search.module.css";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import SearchResultItem from "./SearchResultItem/SearchResultItem";
import useClickOutside from "../../../hooks/clickOutside";
import useDebounce from "../../../hooks/debounce";

const Search = (props) => {
  const { onSearch, onClearSearchResult } = props;
  const searchboxRef = useRef();
  const [searchResultOpened, setSearchResultOpened] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      onSearch(debouncedSearchTerm);
    } else {
      onClearSearchResult();
    }
  }, [debouncedSearchTerm, onSearch, onClearSearchResult]);

  const onCloseHandler = () => {
    setSearchResultOpened(false);
  };

  const onOpenHandler = () => {
    setSearchResultOpened(true);
  };

  const onInputChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  useClickOutside(searchboxRef, onCloseHandler);

  const onSearchResultAddClickedHandler = (track) => {
    const playlistId = "iBo8IlkzZaykbdg1gtgJ";
    this.props.onAddTrack(playlistId, track);
    console.log("Add clicked: track", track);
  };

  const searchResults = props.results.map((item, idx) => (
    <SearchResultItem
      key={`${item.title}-${item.artist}-${idx}`}
      image={item.image}
      title={item.title}
      artist={item.artist}
      addClick={() => onSearchResultAddClickedHandler(item)}
    />
  ));

  let dropdownContentClasses = [classes.DropdownContent];
  if (!searchResultOpened) {
    dropdownContentClasses.push(classes.Hide);
  }

  return (
    <div className={classes.Search} ref={searchboxRef}>
      <TextField
        onFocus={onOpenHandler}
        style={{ backgroundColor: "#333", color: "white", width: "100%" }}
        variant="outlined"
        onChange={onInputChangeHandler}
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
};

const mapStateToProps = (state) => ({
  loading: state.search.loading,
  error: state.search.error,
  results: state.search.results,
});

const mapDispatchToProps = (dispatch) => ({
  onAddTrack: (playlistId, track) =>
    dispatch(addTrackToPlaylist(playlistId, track)),
  onSearch: (term) => dispatch(search(term)),
  onClearSearchResult: () => dispatch(clearSearch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
