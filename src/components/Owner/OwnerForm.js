import React, { Component } from "react";


export default class OwnerForm extends Component {
  // Set initial state
  state = {
    ownerName: "",
    phone: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  /*
        Local method for validation, creating animal object, and
        invoking the function reference passed from parent component
     */
  constructNewOwner = evt => {
    evt.preventDefault();
    if (this.state.ownerName === "" || this.state.phone === "") {
      window.alert("Please fill out all the fields");
    } else {
      const owner = {
        name: this.state.ownerName,
        phone: this.state.phone,
      };

      // Create the animal and redirect user to animal list
      this.props
        .addOwner(owner)
        .then(() => this.props.history.push("/owners"));
    }
  };

  render() {
    return (
      <React.Fragment>
        <form className="ownerForm">
          <div className="form-group">
            <label htmlFor="ownerName">Owner name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="ownerName"
              placeholder="Owner name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="phone"
              placeholder="(555) 555-5555"
            />
          </div>
          <button
            type="submit"
            onClick={this.constructNewOwner}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}