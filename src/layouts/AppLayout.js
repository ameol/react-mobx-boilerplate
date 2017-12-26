import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//Pages
import Home from '../pages/Home';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="wrapper">
            <Switch>
              <Route path={'/'} exact component={Home} />
              <Route path={'/home'} component={Home}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}