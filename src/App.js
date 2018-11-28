import React, { Component } from 'react';
import './App.css';
import {GameComponent} from "./GameComponent";

class App extends Component {
    render() {
        return (
            <div className="App">
                <GameComponent webSocketUrl="ws://localhost:4321/ws"/>
            </div>
        );
    }
}

export default App;
