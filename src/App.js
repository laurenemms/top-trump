import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Card} from "./Card"
import {StatefulCard} from "./Card"

const exampleCardData: CardProps = {
    name: "DONALD TRUMP",
    imageUrl: "https://cdn.theatlantic.com/assets/media/img/mt/2016/09/RTX1GZCO/lead_720_405.jpg?mod=1533691850",
    stats: [
        {
            name: 'popularity',
            value: 3,
        },
        {
            name: 'global influence',
            value: 9,
        },
        {
            name: 'danger to world',
            value: 10,
        },
        {
            name: 'strategy',
            value: 0,
        }
    ]
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Card {...exampleCardData}/>
      </div>
    );
  }
}

export default App;

