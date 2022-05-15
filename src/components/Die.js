import React from 'react'

function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#333" : "Blue",
        color: 'white'
    };
    return (
        <div className="die__face" style={styles} onClick={props.holdDice}>
            <h2 className="die__number">{props.value}</h2>
        </div>
    )
}

export default Die