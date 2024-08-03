import React from 'react'
// import logo from './Assets/Admin_Assets/nav-logo.svg';
import navprofile from './Assets/Admin_Assets/nav-profile.svg';
import {Link} from 'react-router-dom';
const Adminnav = () => {
  return (
    <div className='flex justify-between px-10 py-2 bg-white'>
      <div className='flex justify-around items-center'>
        <p>Game-Club</p>
      </div>
      <Link to="/listusers"><button>ListUsers</button></Link>
      <Link to="/managerecharges"><button>ManageRecharges</button></Link>
      <div >
        <img src={navprofile} alt="" className='w-15 h-15 rounded-full'/>
      </div>
    </div>
  )
}

export default Adminnav