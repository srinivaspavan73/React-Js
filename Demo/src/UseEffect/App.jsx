import { useState } from "react";
// import Interval from "./Interval"
import Try2 from "./Try2";

function App(){
  const [count,setCount] = useState(1);
  return(
    <div>
      {count && <Try2/>}
      <button onClick={()=> setCount(0)}>Stop</button>
    </div>
  );
}
export default App;