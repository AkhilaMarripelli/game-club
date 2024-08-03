import React, { useState } from 'react'
import Adminnav from './Adminnav';
import ManageProducts from './ManageProducts';
import Product_cart from './Assets/Admin_Assets/Product_Cart.svg';
import Product_list_icon from './Assets/Admin_Assets/Product_list_icon.svg';
import Addproduct from './Addproduct';
const ListProduct = () => {
    const [show,setshow]=useState(true)
  return (
    <div className='bg-gray-200 h-screen w-full'>
      <Adminnav/>
      <div className='flex bg-white mt-1'>
        <div className='flex-col h-screen w-[20%] flex gap-5 items-center py-2'>
            <div><button onClick={()=>{setshow(true)}} className=' px-16 py-2 flex gap-3 bg-gray-100'><img src={Product_cart} alt="" />Add Game</button></div>
            <div><button onClick={()=>{setshow(false)}} className='px-16 py-2 flex gap-3 bg-gray-100'><img src={Product_list_icon} alt="" />List Games</button></div>
        </div>
        {show?<Addproduct/>:<ManageProducts/>}
      </div>
    </div>
  )
}

export default ListProduct