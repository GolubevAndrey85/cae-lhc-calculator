import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import "react-datepicker/dist/react-datepicker.css";

class Keypad extends React.Component {
  handleClick = (value) => {
    this.props.onClick(value);
  };

  render() {
    return (
      <div className="keypad">
        <Stack spacing={3} direction="row" alignItems="center">
          <Button variant="contained" onClick={() => this.handleClick(1)}>Add</Button>
          <Button variant="outlined" onClick={() => this.handleClick(-1)}>Remove</Button>
        </Stack>
      </div>
    );
  }
}

export default Keypad;