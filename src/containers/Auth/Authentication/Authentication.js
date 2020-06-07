import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { signup, auth } from "../../../store/actions";
import classes from "./Authentication.module.css";
import Input from "../../../components/UI/Input/Input";
import Button from "@material-ui/core/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

class Authentication extends Component {
  state = {
    form: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
          required: true,
        },
        value: "",
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
          required: true,
        },
        value: "",
        touched: false,
      },
    },
    formIsValid: false,
  };

  onSignUp = (event) => {
    event.preventDefault();
    this.props.onSignUp(
      this.state.form.email.value,
      this.state.form.password.value
    );
  };

  onSignIn = (event) => {
    event.preventDefault();
    this.props.onSignIn(
      this.state.form.email.value,
      this.state.form.password.value
    );
  };

  inputChangeHandler = (event, inputIdentifier) => {
    // TODO: Add Validation on form
    const updatedForm = {
      ...this.state.form,
    };
    const updatedFormElement = { ...updatedForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let key of Object.keys(this.state.form)) {
      formIsValid = formIsValid && this.state.form[key].touched;
    }
    this.setState({ form: updatedForm, formIsValid });
  };

  render() {
    const form = [];
    for (let key of Object.keys(this.state.form)) {
      form.push({
        id: key,
        config: this.state.form[key],
      });
    }
    return (
      <div classes={classes.SignUp}>
        <h2>
          {this.props.isSignUp
            ? "Sign up for free to access music on all platforms"
            : "Sign in to start listen to music from everywhere"}
        </h2>

        {this.props.loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {this.props.error && (
              <p className={classes.Error}> {this.props.error} </p>
            )}
            <form>
              {form.map((f) => {
                return (
                  <Input
                    onChange={(event) => this.inputChangeHandler(event, f.id)}
                    key={f.id}
                    type={f.config.elementConfig.type}
                    placeholder={f.config.elementConfig.placeholder}
                    fullWidth={true}
                    value={f.config.value}
                    required={f.config.elementConfig.required}
                  />
                );
              })}

              <Button
                disabled={!this.state.formIsValid}
                variant="contained"
                color="primary"
                onClick={this.props.isSignUp ? this.onSignUp : this.onSignIn}
              >
                {this.props.isSignUp ? "Sign Up" : "Sign In"}
              </Button>

              {this.props.isSignUp ? (
                <p style={{ color: "#fff" }}>
                  Already have an account?{" "}
                  <button
                    className={classes.SwitchModeButton}
                    onClick={this.props.onSwitchToSignIn}
                  >
                    LOGIN
                  </button>
                </p>
              ) : (
                <p style={{ color: "#fff" }}>
                  Don't have an account?{" "}
                  <button
                    className={classes.SwitchModeButton}
                    onClick={this.props.onSwitchToSignUp}
                  >
                    SIGN UP
                  </button>
                </p>
              )}
            </form>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  onSignUp: (email, password) => dispatch(signup(email, password)),
  onSignIn: (email, password) => dispatch(auth(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
