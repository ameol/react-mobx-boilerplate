import { observable, action } from "mobx";
import UseLoading from "./UseLoading";

@UseLoading('login')
export default class HomeState {
  @observable username;

  async login() {
    const value = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('张三')
      }, 2000)
    })
    this.setUserName(value);
  }

  @action setUserName(value) {
    this.username = value;
  }
  @action logout() {
    this.username = '';
  }
}