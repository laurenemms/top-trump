// @flow
import React, { Component } from 'react';
import {NameComponent} from "./NameComponent"
import {ImageComponent} from "./ImageComponent"
import type {Stats} from "./StatsComponent"
import {StatsComponent} from "./StatsComponent";

export type CardProps = {
    name: string,
    imageUrl: string,
    stats: Stats,
    onStatChosen: string => void
}

export class CardComponent extends Component<CardProps> {
    render() {
        return (
            <div className="card">
                <NameComponent
                    name={this.props.name}
                />
                <ImageComponent
                    imageUrl={this.props.imageUrl}
                    name={this.props.name}
                />
                <StatsComponent
                    stats={this.props.stats}
                    onStatChosen={this.props.onStatChosen}
                />
            </div>
        );
    }
}

