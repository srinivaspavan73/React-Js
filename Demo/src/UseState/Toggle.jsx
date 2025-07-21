import { useState } from "react";
import './Toggle.css';

function Toggle(){
    const [isOn,setIsOn] = useState(false);
    function handleToggle(){
        setIsOn(!isOn);
    }
    return(
        <div className="container">
            <h2>Toggle App</h2>
            <p className="text">
            The Switch is <b>{isOn ? "ON" : "OFF"}</b>
            </p>
            <button onClick={handleToggle}>Toggle</button>
        </div>
    );
}
export default Toggle;