import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './Owner/OwnerList'


export default class ApplicationViews extends Component {

    state = {
        locations: [],
        animals: [],
        employees: [],
        relationships: [],
        owners: [],
    }

    fireEmployee = (id) => {fetch(`http://localhost:5002/employees/${id}`, {
        "method": "DELETE"
    })
    .then(r => r.json())
    .then(() => fetch("http://localhost:5002/employees")
    .then(r => r.json()))
    .then(employees => this.setState({employees: employees}))

    }

    removePet = (id) => {fetch(`http://localhost:5002/animals/${id}`, {
        "method": "DELETE"
    })
    .then(r => r.json())
    .then(() => fetch("http://localhost:5002/animals")
    .then(r => r.json()))
    .then(animals => this.setState({animals: animals}))

    }

    removeOwner = (id) => {fetch(`http://localhost:5002/owners/${id}`, {
        "method": "DELETE"
    })
    .then(r => r.json())
    .then(() => fetch("http://localhost:5002/owners")
    .then(r => r.json()))
    .then(owners => this.setState({owners: owners}))
    .then(()=> fetch ('http://localhost:5002/relationships')
    .then(r => r.json()))
    .then(relationships => this.setState({relationships: relationships}) )

    }

    componentDidMount() {
        const newState = {}

        fetch("http://localhost:5002/animals")
            .then(r => r.json())
            .then(animals => newState.animals = animals)
            .then(() => fetch("http://localhost:5002/employees")
            .then(r => r.json()))
            .then(employees => newState.employees = employees)
            .then( () => fetch ("http://localhost:5002/relationships")
            .then(r => r.json()))
            .then(relationships => newState.relationships = relationships)
            .then( () => fetch("http://localhost:5002/owners")
            .then(r => r.json()))
            .then(owners => newState.owners = owners)
            .then(() => fetch("http://localhost:5002/locations")
            .then(r => r.json()))
            .then(locations => newState.locations = locations)
            .then(() => this.setState(newState))
    }


    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route path="/animals" render={(props) => {
                    return <AnimalList animals = {this.state.animals} 
                    owners = {this.state.owners} 
                    relationships = {this.state.relationships}
                    removePet = {this.removePet} />
                }} />
                <Route path="/employees" render={(props) => {
                    return <EmployeeList
                    fireEmployee={this.fireEmployee}
                    employees={this.state.employees} />
                }} />
                <Route path="/owners" render={(props) => {
                    return <OwnerList 
                    owners={this.state.owners}
                    removeOwner={this.removeOwner}    />
                }} />
            </React.Fragment>
        )
    }
}

