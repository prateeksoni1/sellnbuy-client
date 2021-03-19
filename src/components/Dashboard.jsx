import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = (req, res) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        'http://localhost:8000/api/v1/products',
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      setProducts(response.data.products);
    })();
  }, []);
  const addToCart = () => {};
  return (
    <>
      <div className='mt-4 container'>
        {products.map(product => {
          const { id, name, price, User: user, image } = product;
          return (
            <div key={id} className='card' style={{ width: '30rem' }}>
              <div className='card-header'>{user.name}</div>
              <img className='card-img-top' src={image} alt='Card cap' />
              <div className='card-body'>
                <h5 className='card-title'>{name}</h5>
                <h6 className='card-subtitle'>{price}</h6>
                <button className='btn btn-primary w-100' onClick={addToCart}>
                  ADD TO CART
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
