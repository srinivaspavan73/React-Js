import { useState } from "react";
import './MirrorInput.css'

function MirrorInput(){
    const [text,setText] = useState("haiiiiiiiiiiiiii")
    function handleChange(event){
        setText(event.target.value)
    }
    return(
        <div>
            <input className="inpt" value={text} onChange={handleChange} />
            <p className="para">You typed: {text}</p>
            <button className="btn1" onClick={()=>setText('hello,')}>
                Reset
            </button>
        </div>
    )
}
export default MirrorInput;