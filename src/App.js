import React, { Component } from 'react';
import './App.css';
import {GameComponent} from "./GameComponent";
import {HeaderComponent} from "./HeaderComponent"

class App extends Component {
    render() {
        return (
            <div className="App">
                <HeaderComponent/>
                <GameComponent webSocketUrl="ws://localhost:4321/ws"/>
            </div>
        );
    }
}

export default App;
