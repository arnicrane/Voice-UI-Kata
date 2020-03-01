import React, { Component } from "react";
import TuiLogo from "../icons/tui.png";

class HeaderBar extends Component {
  render() {
    return (
      <header>
        <nav className="side-by-side">
          <img src={TuiLogo} title="Customer Hotel Info App" alt="TUI Hotels" />
          <h3 id="title">Customer Hotel Info App </h3>
        </nav>
      </header>
    );
  }
}

export default HeaderBar;
