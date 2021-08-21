import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Editor from "./Components/Editor";
import About from "./Components/Settings";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
           <Redirect to="/purencool-editor" />
        </Route>
        <Route path="/purencool-editor">
          <Editor />
        </Route>
        <Route path="/purencool-settings">
          <About />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);