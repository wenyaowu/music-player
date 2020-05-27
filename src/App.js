import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./containers/Layout/Layout";
import PlayList from "./containers/Playlist/Playlist"

function App() {
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

export default App;
