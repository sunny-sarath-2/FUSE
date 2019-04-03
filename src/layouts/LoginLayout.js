import React, { Component } from "react";
import appController from "../controller/controller";
class LoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      email: "",
      password: ""
    };
    this.Login = this.Login.bind(this);
  }
  componentDidMount() {
    let access = appController.checkAccess();
    if (!access) {
      window.location =
        "https://fuseas-dev-ams.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=74b566o357ju94ej02sl6b85p&redirect_uri=https://183.83.216.197:3000/admin/dashboard";
    } else {
      this.props.history.push("/admin/dashboard");
    }
  }

  Login(e) {
    e.preventDefault();
    console.log("checl");
    this.props.history.push("/admin/dashboard");
  }

  render() {
    return null;
    // (
    //   <div className="container main form-middle-main">
    //     <div className="justify-content-center row">
    //       <div className="col-md-8">
    //         <div className="card-group">
    //           <div className="p-4 card">
    //             <div className="card-body">
    //               <form className="all">
    //                 <h1>Login</h1>
    //                 <p className="text-muted">Sign In to your account</p>
    //                 <div className="mb-3 input-group">
    //                   <div className="input-group-prepend">
    //                     <span className="input-group-text">
    //                       <i className="fa fa-user-o" aria-hidden="true" />
    //                     </span>
    //                   </div>
    //                   <input
    //                     placeholder="Username"
    //                     autoComplete="username"
    //                     type="text"
    //                     className="form-control"
    //                   />
    //                 </div>
    //                 <div className="mb-4 input-group">
    //                   <div className="input-group-prepend">
    //                     <span className="input-group-text">
    //                       <i className="fa fa-lock" aria-hidden="true" />
    //                     </span>
    //                   </div>
    //                   <input
    //                     placeholder="Password"
    //                     autoComplete="current-password"
    //                     type="password"
    //                     className="form-control"
    //                   />
    //                 </div>
    //                 <div className="row">
    //                   <div className="col-6">
    //                     <button
    //                       className="px-4 btn btn-primary"
    //                       onClick={this.Login}
    //                     >
    //                       Login
    //                     </button>
    //                   </div>
    //                 </div>
    //               </form>
    //             </div>
    //           </div>
    //           <div
    //             className="text-white bg-primary py-5 d-md-down-none card right-bg"
    //             style={{ width: "44%" }}
    //           >
    //             <div className="text-center card-body">
    //               <div>
    //                 <h2>Sign up</h2>
    //                 <p>
    //                   Lorem ipsum dolor sit amet, consectetur adipisicing elit,
    //                   sed do eiusmod tempor incididunt ut labore et dolore magna
    //                   aliqua.
    //                 </p>
    //                 <a href="#/register">
    //                   <button
    //                     tabIndex="-1"
    //                     className="mt-3 btn btn-primary active"
    //                   >
    //                     Register Now!
    //                   </button>
    //                 </a>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}

export default LoginLayout;
