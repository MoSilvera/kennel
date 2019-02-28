import React, { Component } from 'react'

export default class OwnerList extends Component {
    render() {
        return (
            <section className="OwnerList">
            {
                this.props.owners.map(owner =>
                    <div key={owner.id}>
                       <h1>{owner.name}</h1>
                        {owner.phone}<button id={`removeOwner`}
                        onClick={ () => {this.props.removeOwner(owner.id)}}>Remove Owner</button>
                    </div>
                )
            }
            </section>
        );
    }
}