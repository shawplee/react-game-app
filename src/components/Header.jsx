import React from "react";

import "./Header.css";

function Header() {
    return (
        <div className="Header">
            <ul>
                <li><a href="/">Start Game</a></li>
                <li><a href="/scores">High Scores</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </div>
    );
}

export default Header;