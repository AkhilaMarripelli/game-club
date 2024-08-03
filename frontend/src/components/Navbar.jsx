import React,{useContext, useState} from 'react'
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const[menu,setMenu]=useState('shop');
  const{getTotalCartItems}=useContext(ShopContext);
  const isLoggedIn = !!localStorage.getItem('auth-token');
  return (
    <div className='flex justify-around shadow-black items-center bg-blue-200'>
      <div className='flex items-center gap-10'>
        {/* <img src={logo} alt="logo" /> */}
        <p className='text-black-600 size-[38px] font-semibold content-center'><Link to='/'>GamingClub</Link></p>
      </div>
      <div className='flex gap-4 items-center cursor-pointer'>
      <Link to="/cart"><button>PlayedGames</button></Link>
      {isLoggedIn && (
          <Link to="/walletrecharge">
            <button className='border-2 border-black px-4 py-1 rounded-full'>
              Wallet Recharge
            </button>
          </Link>
        )}
        <div className='px-2 border-1 bg-red-600 text-white rounded-full'>{getTotalCartItems()}</div>
        
        {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:
        <button className='border-2 border-black px-4 py-1 rounded-full'><Link to='/login'>Login</Link></button>}
         </div>
    </div>
  )
}

export default Navbar
