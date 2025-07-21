import { useState } from "react";
import './Counter.css'

function Counter(){
    const [count,setCount] = useState(0);

    function incrementCount(){
        setCount(prevCount => prevCount + 1); // 14
        // setCount(prevCount => prevCount + 1); // 15
    }
    function decrementCount(){
        setCount(prevCount => prevCount - 1); // 14
    }

    return(
        <div className="container">
            <button onClick={incrementCount}>+</button>
            <span>{count}</span>
            <button onClick={decrementCount}>-</button>
        </div>
    );
}
export default Counter;