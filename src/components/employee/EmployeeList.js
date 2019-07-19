import React, { Component } from 'react'
import { Link } from "react-router-dom"


class EmployeeList extends Component {
    render() {
        return (
            <section className="employees">
                {
                    this.props.employees.map(employee =>
                        <div key={employee.id}>
                            {employee.name}
                            <Link className="nav-link" to={`/employees/${employee.id}`}>Details</Link>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => {
                                    this.props.history.push(`/employees/${employee.id}/edit`);
                                }}
                            >
                                Edit
                                    </button>
                            <button id={`fireEmployee`}
                                onClick={() => { this.props.fireEmployee(employee.id) }}>Fire</button>
                        </div>
                    )
                }
                <button type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push("/employees/new")
                    }
                    }>
                    Add Employee
                    </button>
            </section>
        )
    }
}

export default EmployeeList