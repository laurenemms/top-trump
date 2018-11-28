import {Component} from "react";
import React from "react";
import {CardComponent} from "./CardComponent";
import type {CardProps} from "./CardComponent";
import {GameStatusComponent} from "./GameStatusComponent";
import {JoinGameComponent} from "./JoinGameComponent";

type GameProps = {
    webSocketUrl: string,
}

type GameState = {
    isFinished: boolean,
    card: ?CardProps,
    isPlayersTurn: boolean,
    socket: WebSocket,
    gameData: Object,
    hasJoined: boolean,
    playerName: string,
}

export class GameComponent extends Component<GameProps, GameState> {

    constructor(props) {
        super(props);
        this.state = {
            isFinished: false,
            card: null,
            isPlayersTurn: false,
            hasJoined: false,
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

    onJoinGameClicked() {
        const url = new URL(window.location.href);
        let player = url.searchParams.get("player");
        if (!player) {
            player = prompt("please enter player name", "player name");
        }

        const socket = new WebSocket(`${this.props.webSocketUrl}?player=${player}`);
        const self = this;

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
                    card: event.data.nextCards[self.state.playerName],
                    isPlayersTurn: event.data.nextPlayer === self.state.playerName,
                    gameData: event.data.gameData,
                });
                return;
            }

            if (event.eventType === "Result" && event.data.gameData.isFinished) {
                self.setState({
                    isFinished: true,
                    gameData: event.data.gameData,
                });
                return;
            }

            if (event.eventType === "Result" && !event.isFinished) {
                self.setState({
                    card: event.data.nextCards[self.state.playerName],
                    isPlayersTurn: event.data.nextPlayer === self.state.playerName,
                    gameData: event.data.gameData,
                });
            }
        });

        this.setState({
            playerName: player,
            hasJoined: true,
            socket: socket,
        });
    }

    render() {
        let component;
        if (this.state.isFinished) {
            component =
                <div>
                    <div><span>Game finished</span></div>
                    <span>{getScores(this.state.gameData.players)}</span>
                </div>
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
            component =
                <JoinGameComponent
                    hasJoined={this.state.hasJoined}
                    onJoinGameClicked={this.onJoinGameClicked.bind(this)}
                />
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
