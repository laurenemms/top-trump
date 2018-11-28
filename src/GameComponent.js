import {Component} from "react";
import React from "react";
import {CardComponent} from "./CardComponent";
import type {CardProps} from "./CardComponent";
import {GameStatusComponent} from "./GameStatusComponent";

type GameProps = {
    playerName: string,
    webSocketUrl: string,
}

type GameState = {
    isFinished: boolean,
    card: ?CardProps,
    isPlayersTurn: boolean,
    socket: WebSocket,
    gameData: Object,
}

export class GameComponent extends Component<GameProps, GameState> {

    constructor(props) {
        super(props);
        this.state = {
            isFinished: false,
            card: null,
            isPlayersTurn: false,
        };
    }

    onStatChosen(stat: string) {
        if (!this.state.socket) {
            console.log('onStatChosen() called, but socket not created');
            return;
        }

        if (!this.state.isPlayersTurn) {
            return;
        }

        this.state.socket.send(
            JSON.stringify({
                eventType: 'StatChosen',
                data: {
                    statName: stat,
                }
            })
        )
    }

    componentDidMount() {
        const socket = new WebSocket(`${this.props.webSocketUrl}?player=${this.props.playerName}`);
        const self = this;

        self.setState({
            socket: socket,
        });

        socket.addEventListener('message', function (json) {
            let event;
            if (json.data) {
                try {
                    event = JSON.parse(json.data)
                } catch (err) {
                    console.log(`unable to parse web socket data - ${event}`);
                    return
                }
            } else {
                console.log('no data attribute in web socket event');
                return;
            }

            console.log(event);

            if (event.eventType === "GameStart") {
                self.setState({
                    card: event.data.nextCards[self.props.playerName],
                    isPlayersTurn: event.data.nextPlayer === self.props.playerName,
                    gameData: event.data.gameData,
                });
                return;
            }

            if (event.eventType === "Result" && event.data.gameData.isFinished) {
                self.setState({
                    isFinished: true,
                });
                return;
            }

            if (event.eventType === "Result" && !event.isFinished) {
                self.setState({
                    card: event.data.nextCards[self.props.playerName],
                    isPlayersTurn: event.data.nextPlayer === self.props.playerName,
                    gameData: event.data.gameData,
                });
            }
        });
    }

    render() {
        let component;
        if (this.state.isFinished) {
            component = <div>Game finished</div>
        } else if (this.state.card) {
            console.log(this.state);
            component =
                <div>
                    <GameStatusComponent
                        score={getScores(this.state.gameData.players)}
                        playerTurn={getPlayersTurn(this.state.isPlayersTurn)}
                    />
                    <CardComponent
                        name={this.state.card.name}
                        imageUrl={this.state.card.imageUrl}
                        stats={this.state.card.stats}
                        onStatChosen={this.onStatChosen.bind(this)}
                    />
                </div>

        } else {
            component = <div> Awaiting game start... </div>
        }
        return (component);
    }
}

type Scores = {
    [name: string]: number
}

function getScores(scores: Scores): string {
    let out = "";
    Object.entries(scores).forEach(([player, score]) =>
        out += `${player}: ${score} `
    );
    return out;
}

function getPlayersTurn(isPlayersTurn: boolean): string {
    return isPlayersTurn ? "It's your turn" : "It's your opponents turn";
}
