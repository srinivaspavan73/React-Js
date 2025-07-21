import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import App from './Route/App.jsx'
// import App from './FormValidate/App.jsx'
// import './FormValidate/styles.css'
// import './Route/index.css'
// import Salaar from './UseEffect/Salaar.jsx'
// import Timer from './UseRef/Timer.jsx'
import ProductCardGenerator from './Project/Home2.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    {/* <App/> */}
    {/* <App/> */}
    {/* <Salaar/> */}
    {/* <Timer/> */}
    <ProductCardGenerator/>
     </BrowserRouter>
)
