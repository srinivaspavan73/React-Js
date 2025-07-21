import { useEffect } from "react";

function Interval(){
    useEffect(()=>{
        let interval = setInterval(()=>{
            console.log('Hello i am interval');
        },1000);
        return () => {
            console.log('Component unmounted');
            clearInterval(interval);
        } // cleanup interval
    },[])
    return(
        <h1>This is Interval component</h1>
    );
}
export default Interval;