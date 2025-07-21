import { useState,useEffect } from "react";

// function Effect(){
//     const [count1,setCount1] = useState(0);
//     const [count2,setCount2] = useState(0);

//     useEffect(()=>{
//         alert('Hello Count');
//     },[count1,count2]); // This effect runs only when count1 changes

//     return(
//         <div>
//             <h1>UseEffect</h1>
//             <button onClick={()=>setCount1(count1+1)}>Count-1 {count1}</button> <br />
//             <button onClick={()=>setCount2(count2+1)}>Count-2 {count2}</button>
//         </div>
//     );
// }

function Effect(){
    useEffect(()=>{
        alert('Hello Count');
    });
}

export default Effect;