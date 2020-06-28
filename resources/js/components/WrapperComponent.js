import React from 'react';
import ReactDOM from 'react-dom';
import NewMap from "./NewMap";

function WrapperComponent() {
    return (
        <div className="container">
          <NewMap/>
        </div>
    );
}

export default WrapperComponent;

if (document.getElementById('wrapper')) {
    ReactDOM.render(<WrapperComponent />, document.getElementById('wrapper'));
}
