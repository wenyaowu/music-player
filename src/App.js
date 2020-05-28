import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { getUserPlaylists } from "./store/actions";
import "./App.css";
import Layout from "./containers/Layout/Layout";
import PlayList from "./containers/Playlist/Playlist";

class App extends Component {
  componentDidMount() {
    this.props.onLoggedIn();
  }
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/playlist" component={PlayList}></Route>
            <Route path="/" component={PlayList} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLoggedIn: () => dispatch(getUserPlaylists("1234")),
});

export default connect(null, mapDispatchToProps)(App);
