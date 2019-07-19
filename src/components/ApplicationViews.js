import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './Owner/OwnerList'
import AnimalManager from '../modules/AnimalManager'
import OwnerManager from '../modules/OwnerManager'
import EmployeeManager from '../modules/EmployeeManager'
import LocationManager from '../modules/LocationManager'
import AnimalDetail from './animal/AnimalDetail'
import OwnerDetail from './Owner/OwnerDetail'
import LocationDetail from './location/LocationDetail'
import EmployeeDetail from './employee/EmployeeDetail'
import AnimalForm from './animal/AnimalForm'
import EmployeeForm from './employee/EmployeeForm'
import OwnerForm from './Owner/OwnerForm'
import Login from './authentication/Login'
import AnimalEditForm from "./animal/AnimalEditForm"
import EmployeeEditForm from "./employee/EmployeeEditForm"

export default class ApplicationViews extends Component {

    state = {
        locations: [],
        animals: [],
        employees: [],
        relationships: [],
        owners: [],
    }

    isAuthenticated = () => sessionStorage.getItem("credentials") !== null


    addAnimal = animal =>
        AnimalManager.admitAnimal(animal)
            .then(() => AnimalManager.getAll())
            .then(animals =>
                this.setState({
                    animals: animals
                })
            );

    addEmployee = employee =>
        EmployeeManager.addEmployee(employee)
            .then(() => EmployeeManager.getAll())
            .then(employees =>
                this.setState({
                    employees: employees
                })
            );

    addOwner = owner =>
        OwnerManager.addOwner(owner)
            .then(() => OwnerManager.getAll())
            .then(owners =>
                this.setState({
                    owners: owners
                })
            );

    fireEmployee = (id) => {
        fetch(`http://localhost:5002/employees/${id}`, {
            "method": "DELETE"
        })
            .then(r => r.json())
            .then(() => fetch("http://localhost:5002/employees")
                .then(r => r.json()))
            .then(employees => this.setState({ employees: employees }))

    }

    removePet = (id) => {
        return AnimalManager.deleteOne(id)
            .then(AnimalManager.getAll)
            .then(animals => this.setState({ animals: animals }))

    }

    removeOwner = (id) => {
        fetch(`http://localhost:5002/owners/${id}`, {
            "method": "DELETE"
        })
            .then(r => r.json())
            .then(() => fetch("http://localhost:5002/owners"))
            .then(r => r.json())
            .then(owners => this.setState({ owners: owners }))
            .then(() => fetch('http://localhost:5002/relationships')
                .then(r => r.json()))
            .then(relationships => this.setState({ relationships: relationships }))

    }

    updateAnimal = (editedAnimalObject) => {
        return AnimalManager.editAnimal(editedAnimalObject)
        .then(() => AnimalManager.getAll())
        .then(animals => {
          this.setState({
            animals: animals
          })
        });
      };

      updateEmployee = (editedEmployeeObject) => {
        return EmployeeManager.editEmployee(editedEmployeeObject)
        .then(() => EmployeeManager.getAll())
        .then(employees => {
          this.setState({
            employees: employees
          })
        });
      };

    componentDidMount() {
        const newState = {}

        AnimalManager.getAll().then(allAnimals => {
            this.setState({ animals: allAnimals })
        })
            .then(() => EmployeeManager.getAll())
            .then(employees => { this.setState({ employees: employees }) })
            .then(() => fetch("http://localhost:5002/relationships")
                .then(r => r.json()))
            .then(relationships => newState.relationships = relationships)
            .then(() => OwnerManager.getAll())
            .then(owners => { this.setState({ owners: owners }) })
            .then(() => LocationManager.getAll())
            .then(locations => { this.setState({ locations: locations }) })
            .then(() => this.setState(newState))
    }


    render() {
        return (
            <React.Fragment>
                <Route path="/login" component={Login} />
                <Route exact path="/" render={(props) => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route exact path="/animals" render={props => {
                    if (this.isAuthenticated()) {
                        return <AnimalList {...props}
                            animals={this.state.animals}
                            owners={this.state.owners}
                            relationships={this.state.relationships}
                            removePet={this.removePet} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/animals/new" render={(props) => {
                    return <AnimalForm {...props}
                        addAnimal={this.addAnimal}
                        employees={this.state.employees} />
                }} />

                <Route exact path="/employees" render={props => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList {...props}
                            deleteEmployee={this.frieEmployee}
                            employees={this.state.employees} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/employees/new" render={(props) => {
                    return <EmployeeForm {...props}
                        addEmployee={this.addEmployee}
                    />
                }} />
                <Route exact path="/owners" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <OwnerList {...props}
                            owners={this.state.owners}
                            removeOwner={this.removeOwner} />
                    }
                    else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/owners/new" render={(props) => {
                    return <OwnerForm {...props}
                        addOwner={this.addOwner}
                    />
                }} />
                <Route exact path="/animals/:animalId(\d+)" render={(props) => {
                    return <AnimalDetail {...props}
                        removePet={this.removePet}
                        animals={this.state.animals} />
                }} />
                <Route
                    path="/animals/:animalId(\d+)/edit" render={props => {
                        return <AnimalEditForm {...props}
                        employees={this.state.employees}
                        updateAnimal={this.updateAnimal} />
                    }}
                />
                <Route
                    exact path="/employees/:employeeId(\d+)/edit" render={props => {
                        return <EmployeeEditForm {...props}
                        employees={this.state.employees}
                        updateEmployee={this.updateEmployee} />
                    }}
                />
                <Route exact path="/owners/:ownerId(\d+)" render={(props) => {
                    return <OwnerDetail {...props}
                        removeOwner={this.removeOwner}
                        owners={this.state.owners} />
                }} />
                <Route path="/locations/:locationId(\d+)" render={(props) => {
                    return <LocationDetail {...props}
                        locations={this.state.locations} />
                }} />
                <Route exact path="/employees/:employeeId(\d+)" render={(props) => {
                    return <EmployeeDetail {...props}
                        employees={this.state.employees} />
                }} />
            </React.Fragment>
        )
    }
}

