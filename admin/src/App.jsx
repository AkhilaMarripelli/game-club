import Adminnav from "./components/Adminnav"
import ListProduct from "./components/ListProduct"
import ListUsers from './components/ListUsers';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import ManageRecharges from './components/ManageRecharges';
export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<ListProduct/>}/>
    <Route path='/listusers' element={<ListUsers/>}/>
    <Route path="/managerecharges" element={<ManageRecharges />} />
    </Routes>
    </BrowserRouter>
    
    </>
  )
}