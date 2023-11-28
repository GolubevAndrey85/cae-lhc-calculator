import React from "react";
import Moment from 'moment';

class Display extends React.Component {
    render() {
        return (
            <div>
                <input type="text" className="display" value={'CAE: ' + this.props.value} />
                <input type="text" className="display" value={'LHC: ' + ((this.props.value - 30) * 2)} />
                <input type="text" className="display" value={'DOB 30: ' + (Moment(this.props.dob30).format('DD MMM YYYY'))} />
            </div>
        );
    }
}

export default Display;