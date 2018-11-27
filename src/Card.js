// @flow
import React, { Component } from 'react';
import {Name} from "./Name"
import {Image} from "./Image"
import {Stats} from "./Stats"

type Stat = {
    name: string,
    value: number,
}

type CardProps = {
    name: string,
    imageUrl: string,
    stats: Stat[]
}

export class Card extends Component<CardProps> {
    render() {
        return (
            <div className="card">
                <Name name={this.props.name}/>
                <Image imageUrl={this.props.imageUrl}/>
                <Stats stats={this.props.stats}/>
            </div>
        );
    }
}
type StatefulCardState = {
    card: ?CardProps
}

export class StatefulCard extends Component<{}, StatefulCardState> {
    constructor(props) {
        super(props);
        this.state = {
            card: null
        }
    }
    componentDidMount() {
        const socket = new WebSocket('ws://localhost:4321/ws')
        const self = this
        socket.addEventListener('message', function (json) {
            console.log('event received')
            let event
            if (json.data) {
                event = JSON.parse(json.data)
            } else {
                return;
            }
            console.log(event)
            if (event.eventType === "GameStart") {
                self.setState({
                    card: event.data.nextCards["Player1"]
                });
            }
        });
    }

    render() {
        return (
            <div>
                {this.state.card ? (
                    <Card {...this.state.card}/>
                ) : (
                    <div> Waiting data... </div>
                )}
            </div>
        );
    }
}

