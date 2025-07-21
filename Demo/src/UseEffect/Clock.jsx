import { useState,useEffect } from "react";

function Clock(){
    const [time,setTime] = useState(new Date().toLocaleTimeString());
    const [isRunning,setIsRunning] = useState(true);

    useEffect(()=>{
        if(isRunning){
            let intervalId = setInterval(()=>{
                setTime(new Date().toLocaleTimeString());
            },1000);
        }

        return() =>{
            clearInterval(intervalId)
        };
    },[isRunning]);

    const handleStop =() =>{
        setIsRunning(false);
    };

    return(
        <div>
            <h2>Clock</h2>
            <p style={ {fontSize:'24px'} }>{time}</p>
            <button onClick={handleStop}>Stop Time</button>
        </div>
    );
}
export default Clock;