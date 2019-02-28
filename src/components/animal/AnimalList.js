import React, { Component } from 'react'
import dog from "./DogIcon.png"
import "./Animal.css"


export default class AnimalList extends Component {
    render () {
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
                                <button
                                    onClick={() => this.props.removePet(animal.id)}
                                    className="card-link">Delete</button>
                            </h5>
                        </div>
                    </div>
                )
            }
            </section>
        )
    }
}