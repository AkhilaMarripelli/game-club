import React, { useEffect,useState,useContext } from 'react';
// import new_collections from './Assets/Frontend_Assets/new_collections';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
const NewGames = () => {

  const [new_collections, setNew_collection] = useState([]);
  const {addToCart} =useContext(ShopContext);

  useEffect(()=>{
    fetch('http://localhost:5000/allproducts')
    .then((response)=>response.json())
    .then((data)=>setNew_collection(data));
  },[])

  return (
    <div className='flex-col flex items-center gap-4 m-24'>
    <div>
        <p className='text-3xl font-semibold'>GAMES COLLECTION</p>
    </div>
    <div className='flex gap-4 flex-wrap justify-around'>
      {new_collections.map((product) => (
        <div key={product.id}>
          <Link to={`/product/${product.id}`}><img src={product.image} alt={product.name} /></Link>
          <h3>{product.name}</h3>
          <p>Price: {product.new_price}</p>
          <p>Description:{product.description}</p>
          <button onClick={()=>{addToCart(product.id)}} className='border-2 px-10 py-2 bg-red-500 text-white font-medium'>Play Game</button>
        </div>
      ))}
    </div>
    </div>
  );
}

export default NewGames;
