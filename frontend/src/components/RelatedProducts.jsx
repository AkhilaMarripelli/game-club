import React from 'react'
import data_product from './Assets/Frontend_Assets/data';
import { Link } from 'react-router-dom';
const RelatedProducts = () => {
  return (
    <>
    <div className='flex justify-center font-semibold text-3xl'>
        <h1 >Related Products</h1>
    </div>
    <div className='m-6 flex justify-between gap-2 flex-wrap'>
    {data_product.map((product,i)=>{
        return(
                <div key={product.id} className='w-80'>
                <Link to={`/product/${product.id}`}><img src={product.image} alt={product.name} onClick={window.scrollTo(0,0)}/></Link>
                <h3>{product.name}</h3>
                <p>New Price: ${product.new_price}</p>
                <p>Old Price: <s>${product.old_price}</s></p>
                </div>
        )
          })}
    </div>
    </>
  )
}

export default RelatedProducts
