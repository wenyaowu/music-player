import React, { useState } from "react";
import Modal from "../../components/UI/Modal/Modal";
import { connect } from "react-redux";
import { clearAuthError } from "../../store/actions";
import { AuthSteps } from "./auth.constants";
import Welcome from "./Welcome/Welcome";
import Authentication from "./Authentication/Authentication";

const Auth = (props) => {
  const [authState, setAuthState] = useState(AuthSteps.WELCOME);
  const [isSignUp, setIsSignUp] = useState(true);

  const onTrasitionToSignInHandler = () => {
    props.clearError();
    setAuthState(AuthSteps.AUTHENTICATION);
    setIsSignUp(false);
  };

  const onTrasitionToSignUpHandler = () => {
    props.clearError();
    setAuthState(AuthSteps.AUTHENTICATION);
    setIsSignUp(true);
  };

  let body = (
    <Welcome
      onSignUpClicked={onTrasitionToSignUpHandler}
      onSignInClicked={onTrasitionToSignInHandler}
    />
  );
  if (authState === AuthSteps.AUTHENTICATION) {
    body = (
      <Authentication
        isSignUp={isSignUp}
        onSwitchToSignIn={onTrasitionToSignInHandler}
        onSwitchToSignUp={onTrasitionToSignUpHandler}
      />
    );
  }

  return (
    <div>
      <Modal show={true}>{body}</Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(clearAuthError()),
});

export default connect(null, mapDispatchToProps)(Auth);
