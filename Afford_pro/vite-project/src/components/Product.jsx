import { useEffect, useState } from 'react';
import axios from 'axios';

function Product() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000';

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzc4MTcyLCJpYXQiOjE3MjA3Nzc4NzIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQ3YTFiYmEwLWIzYWItNGU0Zi1iYTYxLTRlZDQ0MTIxZTMzZiIsInN1YiI6InZhbnNoaWthLmFncmF3YWxfY3MyMUBnbGEuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJhZmZvcmRfcHJvIiwiY2xpZW50SUQiOiJkN2ExYmJhMC1iM2FiLTRlNGYtYmE2MS00ZWQ0NDEyMWUzM2YiLCJjbGllbnRTZWNyZXQiOiJLV0x6V3B5eklkUldxU0tkIiwib3duZXJOYW1lIjoiVmFuc2hpa2FhIiwib3duZXJFbWFpbCI6InZhbnNoaWthLmFncmF3YWxfY3MyMUBnbGEuYWMuaW4iLCJyb2xsTm8iOiIyMTE1MDAxMDkyIn0.X1WHKPejmADBpo2NPfbz-7llcYNUjmmMY_mdl82faak' 
          }
        });
        setProducts(response.data);
      } catch (error) {
        setError('Error fetching product data');
      }
    };

    fetchData();
  }, []);

  const sortByPrice = () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    setProducts(sortedProducts);
  };

  const sortByRating = () => {
    const sortedProducts = [...products].sort((a, b) => b.rating - a.rating);
    setProducts(sortedProducts);
  };

  const sortByDiscount = () => {
    const sortedProducts = [...products].sort((a, b) => {
      const discountA = (a.price - a.discount) / a.price;
      const discountB = (b.price - b.discount) / b.price;
      return discountB - discountA;
    });
    setProducts(sortedProducts);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!products.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-2 m-2'>
      <div className='flex justify-between mb-4'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={sortByPrice}>
          Sort by Price
        </button>
        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={sortByRating}>
          Sort by Rating
        </button>
        <button className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded' onClick={sortByDiscount}>
          Sort by Discount
        </button>
      </div>
      <div className='flex flex-wrap justify-around'>
        {products.map(product => (
          <div key={product.id} className='bg-gray-300 border-2 border-black w-64 p-4 m-2 flex flex-col items-center shadow-2xl'>
            <h1 className='text-xl font-bold'>{product.name}</h1>
            <p className='text-gray-700'>Price: {product.price}</p>
            <p className='text-gray-700'>Rating: {product.rating}</p>
            <p className='text-red-500'>Discount: {product.discount}</p>
            <p className='text-green-500'>Available: {product.availability}</p>
            <button>Show product</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
