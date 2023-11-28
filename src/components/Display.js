import React from "react";

class Display extends React.Component {
    render() {
        return (
            <div>
                <input type="text" className="display" value={'CAE: ' + this.props.value} />
                <input type="text" className="display" value={'LHC: ' + ((this.props.value - 30) * 2)} />
            </div>
        );
    }
}

export default Display;