import logo from "../../logo.svg";
import Communities from "../communities/Communities";
import React from "react";

export default function () {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save treload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Welcome to community event manager
                </a>
            </header>
            <Communities/>
        </div>);
};