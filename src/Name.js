// @flow
import React, { Component } from 'react';

type NameProps = {
    name: string
}

export class Name extends Component<NameProps> {
    render() {
        return (
            <h1>{this.props.name}</h1>
        );
    }
}
