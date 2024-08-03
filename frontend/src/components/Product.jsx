import React, { useContext } from 'react'
import {ShopContext} from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductDisplay from './ProductDisplay';
const Product = () => {
    const {all_product} = useContext(ShopContext);
    console.log(all_product);
    const {id} = useParams();
    const product = all_product.find((e)=>e.id===Number(id))
  return (
    <div>
      <ProductDisplay product={product}/>
    </div>
  )
}

export default Product
