import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import { AuthSteps } from "./auth.constants";
import Welcome from "./Welcome/Welcome";
import Authentication from "./Authentication/Authentication";
class Auth extends Component {
  state = {
    authState: AuthSteps.WELCOME,
    isSignUp: true,
  };

  onTrasitionToSignInHandler = () => {
    this.setState({
      authState: AuthSteps.AUTHENTICATION,
      isSignUp: false,
    });
  };

  onTrasitionToSignUpHandler = () => {
    this.setState({
      authState: AuthSteps.AUTHENTICATION,
      isSignUp: true,
    });
  };

  render() {
    let body = (
      <Welcome
        onSignUpClicked={this.onTrasitionToSignUpHandler}
        onSignInClicked={this.onTrasitionToSignInHandler}
      />
    );
    if (this.state.authState === AuthSteps.AUTHENTICATION) {
      body = (
        <Authentication
          isSignUp={this.state.isSignUp}
          onSwitchToSignIn={this.onTrasitionToSignInHandler}
          onSwitchToSignUp={this.onTrasitionToSignUpHandler}
        />
      );
    }

    return (
      <div>
        <Modal show={true}>{body}</Modal>
      </div>
    );
  }
}

export default Auth;
