import React, { Component } from 'react'
import dog from "./DogIcon.png"
import "./Animal.css"
import { Link } from "react-router-dom"


export default class AnimalList extends Component {
    render() {
        return (
            <section className="animals">
                {
                    this.props.animals.map(animal =>
                        <div key={animal.id} className="card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <img src={dog} alt="dog" className="icon--dog" />
                                    {animal.name}
                                    <br></br>
                                    Owner: {this.props.relationships.filter(r => r.animalId === animal.id)
                                        .map(ownership => this.props.owners
                                            .find(owner => owner.id === ownership.ownerId).name + ", ")}
                                    <Link className="nav-link" to={`/animals/${animal.id}`}>Details</Link>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => {
                                            this.props.history.push(`/animals/${animal.id}/edit`);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => this.props.removePet(animal.id)}
                                        className="card-link">Delete</button>
                                </h5>
                            </div>
                        </div>
                    )
                }
                <button type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push("/animals/new")
                    }
                    }>
                    Admit Animal
                    </button>
            </section>
        )
    }
}