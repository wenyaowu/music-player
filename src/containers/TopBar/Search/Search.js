import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { search, clearSearch } from "../../../store/actions";
import * as debounce from "lodash/debounce";

class Search extends Component {
  state = {
    autocompleteOpened: false,
  };


  onInputChangeHandler = (event, value) => {
    // Use this to trigger search
    event.persist();
    if (!this.debouncedFn) {
      this.debouncedFn = debounce(() => {
        let v = event.target.value
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

  onCloseHandler = () => {
    console.log("closed");
    this.setState({
      autocompleteOpened: false,
    });
  };

  onOpenHandler = () => {
    console.log("opened");
    this.setState({
      autocompleteOpened: true,
    });
  };

  render() {
    return (
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.search.loading,
  error: state.search.error,
  results: state.search.results,
});

const mapDispatchToProps = (dispatch) => ({
  onSearch: (term) => dispatch(search(term)),
  onClearSearchResult: () => dispatch(clearSearch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
