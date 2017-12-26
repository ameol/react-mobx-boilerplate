import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

@inject('store')
@observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.home;
  }
  login = () => {
    this.store.login()
  }
  logout = () => {
    this.store.logout()
  }
  render() {
    return [
      <div className="logo" key={1}></div>,
      <div className="content" key={2}>
        {
          this.store.username
            ? <div>欢迎：{this.store.username}, <button onClick={this.logout}>退出登录</button></div>
            : this.store.loading 
              ? <button>正在登录...</button> 
              : <button onClick={this.login}>登录</button>
        }
      </div>
    ];
  }
}
