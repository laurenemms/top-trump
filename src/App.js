import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Card} from "./Card"
import {StatefulCard} from "./Card"

const exampleCardData: CardProps = {
    name: "Donald Trump",
    imageUrl: "https://cdn.theatlantic.com/assets/media/img/mt/2016/09/RTX1GZCO/lead_720_405.jpg?mod=1533691850",
    stats: [
        {
            name: 'popularity',
            value: 10,
        }
    ]
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <StatefulCard/>
      </div>
    );
  }
}

export default App;

