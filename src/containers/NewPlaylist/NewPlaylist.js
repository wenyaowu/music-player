import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { connect } from "react-redux";
import { createPlaylist } from "../../store/actions";
class NewPlaylist extends Component {
  state = {
    form: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "My Playlist Name",
          required: true,
        },
        value: "",
        touched: false,
      },
      description: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Give your playlist a description",
          required: true,
          multiline: true,
        },
        value: "",
        touched: false,
      },
    },
    formIsValid: false,
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

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onCreatePlaylist(
      this.props.userId,
      this.state.form.name.value,
      this.state.form.description.value
    );
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
      <div>
        <h1>Add new playlist</h1>
        <form onSubmit={this.onSubmitHandler}>
          {form.map((f) => {
            return (
              <Input
                onChange={(event) => this.inputChangeHandler(event, f.id)}
                key={f.id}
                type={f.config.elementConfig.type}
                placeholder={f.config.elementConfig.placeholder}
                fullWidth={true}
                value={f.config.value}
                multiline={f.config.elementConfig.multiline}
                required={f.config.elementConfig.required}
              />
            );
          })}
          <Button disabled={!this.state.formIsValid} type="submit">
            Create
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  onCreatePlaylist: (userId, name, description) =>
    dispatch(createPlaylist(userId, name, description)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPlaylist);
