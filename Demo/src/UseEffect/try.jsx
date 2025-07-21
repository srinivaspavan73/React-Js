import { useEffect,useState } from "react";

// function Try(){
    
//     useEffect(()=>{
//         console.log('Component mounted');
//         alert('Component mounted');
//     },[])
// }


function Try() {
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    useEffect(() => {
        // console.log('Component mounted');
        alert('Component mounted');
        // return () => {
        //     console.log('Component unmounted');
        //     alert('Component unmounted');
        // };
    }, [count, count2]); // This effect runs only when count or count2 changes

    return (
        <div>
            <h1>Try Component</h1>
            <button onClick={() => setCount(count + 1)}>Count-1 {count}</button> <br />
            <button onClick={() => setCount2(count2 + 1)}>Count-2 {count2}</button>
        </div>
    );
}

export default Try