import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      try {
        //   console.log(req,res)
        const response = await axios.get(
          'http://localhost:8000/api/v1/products',
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );

        setProducts(response.data.products);
      } catch (err) {
        if (!err.response) {
          setError('Internal Server Error');
        } else setError(err.response.data.message);
      }
    })();
  }, []);
  const addToCart = async productId => {
    try {
      await axios.post(
        'http://localhost:8000/api/v1/orders',
        { productId },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      alert('Added successfully');
    } catch (err) {
      if (!err.response) {
        setError('Internal Server Error');
      } else setError(err.response.data.message);
    }
  };
  return (
    <div style={{ minHeight: '95vh', backgroundColor: '#F0F1F5' }}>
      <div className='pt-4 container'>
        {error && <div className='alert alert-danger'>{error}</div>}
        <h2 className='display-5'>Category A</h2>
        <div className='row'>
          {products.map(product => (
            <div className='col-md-3'>
              <Card product={product} addToCart={addToCart} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
