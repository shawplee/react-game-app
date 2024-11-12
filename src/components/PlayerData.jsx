import React, { useState } from "react";

function PlayerData(props) {
    const [ready, setReady] = useState(false);

    function handleNameChange(e){
        if(e.target.value != ""){
            props.setName(e.target.value);
            setReady(true);
        }
    }

    return (
        <p className="ctr">Enter Player Name :
            <input type="text" name="playerName" onChange={handleNameChange} />
            <button onClick={props.handleStartClick} disabled={!ready}>Start</button>
        </p>
    );
}

export default PlayerData;