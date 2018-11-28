// @flow
import React, { Component } from 'react';

type ImageProps = {
    // NameComponent of person to which the image corresponds
    name: string,
    imageUrl: string,
}

export class ImageComponent extends Component<ImageProps> {
    render() {
        return (
            <img
                className="card-image"
                style={{width: "95%"}}
                src={this.props.imageUrl}
                alt={this.props.name}
            />
        );
    }
}

