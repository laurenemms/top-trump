// @flow
import React, { Component } from 'react';

type NameProps = {
    name: string
}

export class NameComponent extends Component<NameProps> {
    render() {
        return (
            <h1 className="card-name">{this.props.name}</h1>
        );
    }
}
