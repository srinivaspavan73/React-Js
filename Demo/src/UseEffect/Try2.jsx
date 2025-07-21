import {useEffect} from "react";


function Interval(){
    useEffect(()=>{
        let interval = setInterval(()=>{
            console.log('Hello i am interval');
        },1000);
        return () => {
            console.log('Component unmounted');
            clearInterval(interval);
        } // cleanup interval
 
    },)
}

export default Interval;