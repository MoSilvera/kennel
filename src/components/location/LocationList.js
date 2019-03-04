import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class LocationList extends Component {
    render() {
        return (
            <section className="LocationList">
            {
                this.props.locations.map(location =>
                    <div key={location.id}>
                       <h1>{location.name}</h1>
                        {location.address}
                        <Link className="nav-link" to={`/locations/${location.id}`}>Details</Link>
                    </div>

                )
            }
            </section>
        );
    }
}