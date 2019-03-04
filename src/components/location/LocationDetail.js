import React, { Component } from "react"




export default class LocationDetail extends Component {
    render() {
        /*
            Using the route parameter, find the animal that the
            user clicked on by looking at the `this.props.animals`
            collection that was passed down from ApplicationViews
        */
        const location = this.props.locations.find(a => a.id === parseInt(this.props.match.params.locationId)) || {}

        return (
            <section>
                <div key={location.id} >
                    <div >
                        <h4 >
                            {location.name}
                        </h4>
                        <h6>{location.address}</h6>

                    </div>
                </div>
            </section>
        )
    }
}