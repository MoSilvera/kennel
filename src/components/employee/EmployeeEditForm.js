import React, { Component } from "react"
import EmployeeManager from '../../modules/EmployeeManager'

export default class employeeEditForm extends Component {
    // Set initial state
    state = {
      employeeName: "",
      phone: "",

    }


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingEmployee = evt => {
      evt.preventDefault()
         {
        const editedEmployee = {
          id: this.props.match.params.employeeId,
          name: this.state.employeeName,
          phone: this.state.phone,
        };

    this.props.updateEmployee(editedEmployee)
    .then(() => this.props.history.push("/employees"))
    }
  }

    componentDidMount() {
      EmployeeManager.get(this.props.match.params.employeeId)
      .then(employee => {
        this.setState({
          employeeName: employee.name,
          phone: employee.phone,
        });
      });
    }


    render() {
      return (
        <React.Fragment>
          <form className="employeeForm">
            <div className="form-group">
              <label htmlFor="employeeName">Employee name</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="employeeName"
                value = {this.state.employeeName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="phone"
                value = {this.state.phone}
              />
            </div>
            <button
              type="submit"
              onClick={this.updateExistingEmployee}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </React.Fragment>
      );
    }
}