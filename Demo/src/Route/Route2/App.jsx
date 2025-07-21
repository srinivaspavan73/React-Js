import { Routes,Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Product from "./Product";
import Navbar from "./Navbar";


function App(){
  return(
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About />}/>
        <Route path="/product" element={<Product />}/>
      </Routes>
    </div>
  );
}

export default App;

// import Navbar from "./Navbar";
// import { Routes,Route } from "react-router-dom";
// import Home from "./Home";
// import About from "./About";
// import Product from "./Product";

// function App(){
//   return(
//     <div>
//       <Navbar/>
//       <Routes>
//         <Route path="/" element={<Home/>}/>
//         <Route path="/about" element={<About />}/>
//         <Route path="/product" element={<Product />}>
//           <Route path="laptop" element={<p>This is Laptop</p>}></Route>
//         </Route>
//       </Routes>
//     </div>
//   );
// }

// export default App;
