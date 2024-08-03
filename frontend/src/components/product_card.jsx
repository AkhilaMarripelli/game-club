import React from 'react'
import {Link} from 'react-router-dom';
const Product_card = (props) => {
  return (
    <div className='px-25 py-25 border-2 flex-col flex gap-4'>
      <div >
                <div>
                    <Link to={`/product/${props.id}`}><img src={props.image} alt="" onClick={window.scrollTo(0,0)} /></Link>
                </div>
                <div>
                    <p>{props.name}</p>
                </div>
                <div className='flex gap-4'>
                    <p>{props.new_price}</p>
                </div>
            </div>
    </div>
  )
}

export default Product_card
