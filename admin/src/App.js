import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import ProtectedRoutes from "./ProtectedRoutes";
function App() {
  
  // console.log(JSON.parse(localStorage.getItem('persist:root')).currentUser)
  const admin = JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.user).currentUser.isAdmin;
  // console.log(admin)
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            {admin ? <Redirect to="/dashboard" /> : <Login />}
          </Route>
            {
              
              <>
              <Topbar />
            <div className="container">
              <Sidebar />
                <ProtectedRoutes path="/dashboard" component={Home} isAuth={admin} />
                <ProtectedRoutes path="/users" component={UserList} isAuth={admin}>
                
                </ProtectedRoutes>
                <ProtectedRoutes path="/user/:userId" component={User} isAuth={admin}>
                  
                </ProtectedRoutes>
                <Route path="/newUser" component={NewUser} isAuth={admin}>
                 
                </Route>
                <ProtectedRoutes path="/products" component={ProductList} isAuth={admin}>
                  
                </ProtectedRoutes>
                <ProtectedRoutes path="/product/:productId" component={Product} isAuth={admin}>
                
                </ProtectedRoutes>
                <ProtectedRoutes path="/newproduct" component={NewProduct} isAuth={admin}>
                  
                </ProtectedRoutes>
              
          </div>
          </>}
        </Switch>
    </Router>
  );
}

export default App;
