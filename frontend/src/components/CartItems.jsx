import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Navbar from './Navbar';

const CartItems = () => {
    const {all_product, cartItems } = useContext(ShopContext);
    return (
        <>
            <Navbar />
            <table className='m-16 border-2 w-[80%]'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='px-4 py-2'>Game</th>
                        <th className=' px-4 py-2'>Title</th>
                        <th className=' px-4 py-2'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {all_product.map((product) => {
                        if (cartItems[product.id] > 0) {
                            return (
                                <tr key={product.id} className='border-2'>
                                    <td className='px-4 py-2'>
                                        <img src={product.image} alt={product.name} className='w-18 h-20' />
                                    </td>
                                    <td className='px-4 py-2'>{product.name}</td>
                                    <td className='px-4 py-2'>${product.new_price.toFixed(2)}</td>
                                    {/* <td className='px-4 py-2 flex justify-center'><button className='px-4 py-1 bg-gray-300'>{cartItems[product.id]}</button></td> */}
                                    {/* <td className='px-4 py-2'>${(product.new_price * cartItems[product.id]).toFixed(2)}</td> */}
                                
                                </tr>
                            );
                        }
                        return null;
                    })}
                </tbody>
            </table>
            
        </>
    );
};

export default CartItems;
