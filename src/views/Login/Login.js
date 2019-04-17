import { Component } from "react";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      redirectToReferrer: false,
      email: "",
      password: ""
    };
  }

  Login(e) {
    e.preventDefault();
  }

  render() {
    return null;
  }
}

export default Login;
