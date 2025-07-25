import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './Route/VoteApp/Styles.css'
// import Context from './Context&prop_Drilling/Context.jsx'
import VotingApp from './Route/VoteApp/VotingApp.jsx'
// import Theme from './Context&prop_Drilling/Theme.jsx'
// import App from './Final_Project/App2.jsx'
// import Reducer from './P/Reducer.jsx'
// import PropDrill from './Context&prop_Drilling/PropDrill.jsx'
// import './Context&prop_Drilling/context.css'
// import App from './Route/App.jsx'
// import App from './FormValidate/App.jsx'
// import './FormValidate/styles.css'
// import './Route/index.css'
// import Salaar from './UseEffect/Salaar.jsx'
// import Timer from './UseRef/Timer.jsx'
// import ProductCardGenerator from './Project/Home2.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <VotingApp />
     </BrowserRouter>,
)
