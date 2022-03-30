import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import SingleProduct from "./pages/SingleProduct";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { useSelector } from "react-redux";
function App() {
  const user = useSelector(state => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/products/:cateogry' element={<ProductList/>}/>
        <Route path='/product/:id' element={<SingleProduct/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={user ?<Navigate to='/' /> : <Login/>}/>
        <Route path='/register' element={user ?<Navigate to='/' /> : <Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
