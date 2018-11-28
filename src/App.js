import React, { Component } from 'react';
import './App.css';
import {GameComponent} from "./GameComponent";


function getPlayer() {
    const url = new URL(window.location.href);
    const player = url.searchParams.get("player");
    if (player) {
        return player;
    }
    return prompt("please enter player name", "player name");
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <GameComponent
                    playerName={getPlayer()}
                    webSocketUrl="ws://localhost:4321/ws"
                />
            </div>
        );
    }
}

export default App;
