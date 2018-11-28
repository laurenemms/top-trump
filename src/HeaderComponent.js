// @flow
import React, { Component } from 'react';
import logo from './guardian-logo.svg';


export class HeaderComponent extends Component<{}> {
    render() {
        return (
            <div className="header">
                <img className="logo" src={logo} alt=""/>
            </div>
        );
    }
}