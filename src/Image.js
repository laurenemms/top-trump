// @flow
import React, { Component } from 'react';

type ImageProps = {
    imageUrl: string
}

export class Image extends Component<ImageProps> {
    render() {
        return (
            <img className="card-image" style={{width: "95%"}} src={this.props.imageUrl}></img>
        );
    }
}

