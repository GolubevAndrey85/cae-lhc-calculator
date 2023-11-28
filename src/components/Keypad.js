import React from "react";

import "react-datepicker/dist/react-datepicker.css";

class Keypad extends React.Component {
  handleClick = (value) => {
    this.props.onClick(value);
  };

  render() {
    return (
      <div className="keypad">
        {/* keypad buttons */}
        <button onClick={() => this.handleClick(1)}>Add</button>
        <button onClick={() => this.handleClick(-1)}>Remove</button>
        {/* <button onClick={() => this.handleClick(3)}>3</button> */}
        {/* and so on */}
      </div>
    );
  }
}

export default Keypad;