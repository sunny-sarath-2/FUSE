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

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  Login(e) {
    e.preventDefault();
  }

  render() {
    return null;
  }
}

export default Login;
