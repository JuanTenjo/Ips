import React from 'react';
import "./Loader.css";
//rfc   

const Loader = () => {
    return (
        <div>
            <center>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </center>
        </div>
    );
}

export default Loader;