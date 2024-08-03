import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  const handlePlayGame = async () => {
    const response = await fetch('http://localhost:5000/playgame', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      }
    });

    if (response.ok) {
      addToCart(product.id);
      console.log('Game played successfully.');
    } else {
      console.log('Failed to play game.');
    }
  };

  return (
    <>
      <div className='flex m-10 gap-20 '>
        <div className='flex gap-3'>
          <div>
            <img src={product.image} alt="" />
          </div>
        </div>
        <div className='flex-col flex gap-4 items-start'>
          <h1 className='text-3xl font-semibold'>{product.name}</h1>
          <div className='flex gap-4'>
            <div>${product.new_price}</div>
          </div>
          <button onClick={handlePlayGame} className='border-2 px-10 py-2 bg-red-500 text-white font-medium'>
            Play Game
          </button>
          <p><span className='font-medium'>Description: </span>{product.description}</p>
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
