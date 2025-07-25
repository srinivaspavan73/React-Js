import React, { useReducer } from 'react'

const reducer = (state,action) => {
    switch(action.type){
        case 'INCREMENT':
            return{
                ...state,
                count: state.count + 1
            };
        case 'UPDATE_TEXT':
            const input = action.payload;
            return{
                ...state,
                text: input,
                mirrored: input
            };
        default:
            return state;
    }
}

const initialState = {
    count: 0,
    text: '',
    mirrored: ''
};

function Reducer() {
    const [state,dispatch] = useReducer(reducer,initialState);

  return (
    <div>
      <h2>useReducer Example</h2>

      <div>
        <button onClick={()=> dispatch( {type:'INCREMENT'} )}>
            INCREMENT
        </button>
        <p> Count: {state.count}</p>
      </div>

      <div>
        <input type="text" value={state.text} 
        onChange={ (e) => dispatch( {type:'UPDATE_TEXT',payload:e.target.value} )}/>
        <p>Mirrored: {state.mirrored}</p>
      </div>
    </div>
  )
}

export default Reducer
