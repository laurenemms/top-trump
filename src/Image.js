// @flow
import React, { Component } from 'react';

type ImageProps = {
    imageUrl: string
}

export class Image extends Component<ImageProps> {
    render() {
        return (
            <img className="card-image" src={this.props.imageUrl}></img>
        );
    }
}

