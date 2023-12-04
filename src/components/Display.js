import React from "react";
import Moment from 'moment';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


class Display extends React.Component {
    render() {
        return (
            <div>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="CAE" variant="outlined" value={'CAE: ' + this.props.value}/>
                    <TextField id="outlined-basic" label="LHC" variant="outlined" value={'LHC: ' + ((this.props.value - 30) * 2)}/>
                    <TextField id="outlined-basic" label="DOB 30" variant="outlined" value={'DOB 30: ' + (Moment(this.props.dob30).format('DD MMM YYYY'))}/>
                </Box>
                {/* <input type="text" className="display" value={'CAE: ' + this.props.value} />
                <input type="text" className="display" value={'LHC: ' + ((this.props.value - 30) * 2)} />
                <input type="text" className="display" value={'DOB 30: ' + (Moment(this.props.dob30).format('DD MMM YYYY'))} /> */}
            </div>
        );
    }
}

export default Display;