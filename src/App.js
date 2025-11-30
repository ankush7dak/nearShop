import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import { Routes, Route } from "react-router-dom";
import ProductListView from './components/products/ProductListView';
import HamburgerMenu from './components/Hamburger/HamburgerMenu'
import UserProvider from './contexts/Context';
import Logout from './components/Login/Logout';
import AddProduct from './components/products/AddProductScreen/AddProduct';

function App() {
  return (<>
  {/* <UserProvider> */}
  {/* <HamburgerMenu /> */}
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/Logout" element={<UserProvider>
                                      <Logout />
                                  </UserProvider>} />
    <Route path="/products" element= {<UserProvider>
                                          <ProductListView/>  
                                      </UserProvider>}/>
    <Route path="/add-product" element = {<AddProduct />} />
    
  </Routes>
  {/* </UserProvider> */}
  </>
  );
}

export default App;
