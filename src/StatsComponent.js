// @flow
import React, { Component } from 'react';

export type Stats = {
    [name: string]: number,
}

type StatsProps = {
    stats: Stats,
    onStatChosen: string => void,
}

export class StatsComponent extends Component<StatsProps> {
    render() {
        return (
            <ul>{
                Object.entries(this.props.stats).map(
                    ([name, value], index) =>
                        <StatComponent
                            key={index}
                            name={name}
                            value={value}
                            onStatChosen={this.props.onStatChosen}
                        />
                )
            }</ul>
        );
    }
}

type StatProps = {
    name: string,
    value: string,
    onStatChosen: string => void,
}

class StatComponent extends Component<StatProps> {
    render() {
        return (
            <li onClick={() => this.props.onStatChosen(this.props.name)}>
                {`${this.props.name}: ${this.props.value}`}
            </li>
        );
    }
}