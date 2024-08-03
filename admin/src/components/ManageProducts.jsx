import React,{useState,useEffect} from 'react'
import crossicon from './Assets/Admin_Assets/cross_icon.png';
const ManageProducts = () => {
    const [allproducts,setAllProducts]=useState([]);

    const fetchInfo = async ()=>{
        await fetch('http://localhost:5000/allproducts')
        .then((res)=>res.json())
        .then((data)=>{setAllProducts(data)});
    }
    useEffect(()=>{
        fetchInfo();
    },[]);

    const remove_product = async (id)=>{
        const response = await fetch('http://localhost:5000/removeproduct', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          console.log('Response from server:', data); 
          await 
          fetchInfo();
    }

  return (
        <div className='w-[80%] h-screen bg-gray-200'>
            <div className='flex-col flex items-center bg-white m-2 h-screen gap-6'>
                <div><p className='font-semibold text-2xl'>All Products List</p></div>
                <div className='flex justify-around w-full px-10 font-semibold'>
                    <div className='flex gap-6'>
                       <div>Game</div>
                       <div>Title</div>
                    </div>
                    <div className='flex gap-6'>
                        <div>Amount</div>
                        <div>Remove</div>
                    </div>
                </div>
                {/* <div className='flex justify-around w-full px-10'>
                    <div className='flex gap-6'>
                       <div><img className='w-14 h-14' src="" alt="" /></div>
                       <div><p>Lorem ipsum dolor sit.</p></div>
                    </div>
                    <div className='flex gap-6'>
                        <div><p>$120</p></div>
                        <div><p>$80</p></div>
                        <div><p>Women</p></div>
                        <div><button><img src={crossicon} alt="" /></button></div>
                    </div>
                </div> */}
                {
                    allproducts.map((product,index)=>{
                        return <div className='flex justify-around w-full px-10' key={index}>
                        <div className='flex gap-6'>
                           <div><img className='w-14 h-14' src={product.image} alt="" /></div>
                           <div><p>{product.name}</p></div>
                        </div>
                        <div className='flex gap-6'>
                            <div><p>{product.new_price}</p></div>
                            <div><button onClick={()=>{remove_product(product.id)}}><img src={crossicon} alt="" /></button></div>
                        </div>
                    </div>
                    })
                }
            </div>

      </div>
  )
}

export default ManageProducts