// @flow
import React, { Component } from 'react';

type GameStatusProps = {
    score: string,
    playerTurn: string
}

export class GameStatusComponent extends Component<GameStatusProps> {
    render() {
        return (
            <div className>
                <div className="score">{this.props.score}</div>
                <div className="playerTurn">{this.props.playerTurn}</div>
            </div>
        );
    }
}
