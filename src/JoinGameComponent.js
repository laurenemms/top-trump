// @flow
import React, { Component } from 'react';

type JoinGameProps = {
    hasJoined: boolean,
    onJoinGameClicked: void => void,
}

export class JoinGameComponent extends Component<JoinGameProps> {
    render() {
        let component;
        if (this.props.hasJoined) {
            component = <div> Awaiting game start... </div>
        } else {
            component =
                <div>
                    <button onClick={this.props.onJoinGameClicked}>Join Game</button>
                </div>
        }
        return(
            component
        )
    }
}