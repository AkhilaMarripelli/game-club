import { useState } from 'react'
import Home from './components/Home';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
// import ListProduct from '../../admin/src/components/ListProduct';
import Product from './components/Product';
import Login from './components/Login';
import Signup from './components/Signup';
import Cart from './components/Cart';
import WalletRecharge from './components/WalletRecharge';
function App() {
  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path="/walletrecharge" element={<WalletRecharge />} />
      <Route path='signup' element={<Signup/>}/>
      <Route path='/product/:id' element={<Product/>}/>
      <Route path='/cart' element={<Cart/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
