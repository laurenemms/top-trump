// @flow
import React, { Component } from 'react';


type StatsProps = {
    stats: Stat[],
}

export class Stats extends Component<Object> {
    render() {
        return (
            <ul>{
                this.props.stats.map(
                    stat => <Stat name={stat.name} value={stat.value}/>
                )
            }</ul>
        );
    }
}

type StatProps = {
    name: string,
    value: string
}

class Stat extends Component<StatProps> {
    render() {
        const name = `${this.props.name}: ${this.props.value}`
        return (
            <li>{name}</li>
        );
    }
}