import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Layout from "./containers/Layout/Layout";
import PlayList from "./containers/Playlist/Playlist";
import Logout from "./containers/Auth/Logout/Logout";
import Feed from "./containers/Feed/Feed";
import Auth from "./containers/Auth/Auth";
import { authInit } from "./store/actions";
class App extends Component {
  componentDidMount() {
    this.props.onAuthInit();
  }
  render() {
    return (
      <div className="App">
        {this.props.isAuth ? (
          <Layout>
            <Switch>
              <Route path="/playlist" component={PlayList}></Route>
              <Route path="/logout" component={Logout}></Route>
              <Route path="/" component={Feed} />
            </Switch>
          </Layout>
        ) : (
          <Auth />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onAuthInit: () => dispatch(authInit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
