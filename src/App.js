import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Layout from "./containers/Layout/Layout";
import PlayList from "./containers/Playlist/Playlist";
import Logout from "./containers/Auth/Logout/Logout";
import Feed from "./containers/Feed/Feed";
import Auth from "./containers/Auth/Auth";
import { authInit } from "./store/actions";
import Spotify from "./containers/Auth/Spotify/Spotify";
import Connect from "./containers/Connect/Connect";
import Account from "./containers/Account/Account";

const App = (props) => {
  const { onAuthInit } = props;
  useEffect(() => {
    onAuthInit();
  }, [onAuthInit]);

  return (
    <div className="App">
      {props.isAuth ? (
        <Layout>
          <Switch>
            <Route path="/playlist" component={PlayList}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/spotify-callback" component={Spotify}></Route>
            <Route path="/account" component={Account}></Route>
            <Route path="/connect" component={Connect}></Route>
            <Route path="/" component={Feed} />
          </Switch>
        </Layout>
      ) : (
        <Auth />
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuth: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onAuthInit: () => dispatch(authInit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
