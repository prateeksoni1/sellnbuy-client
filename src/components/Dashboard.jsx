import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { toast } from 'react-toastify';

import ProductCard from './ProductCard';

const Dashboard = () => {
  const [products, setProducts] = useState([]);

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
          toast.error('Internal Server Error');
        } else toast.error(err.response.data.message);
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
      toast.success('Added to cart successfully');
    } catch (err) {
      if (!err.response) {
        toast.error('Internal Server Error');
      } else toast.error(err.response.data.message);
    }
  };
  return (
    <div style={{ minHeight: '95vh', backgroundColor: '#F0F1F5' }}>
      <div className='pt-4 container'>
        <h2 className='display-5'>Category A</h2>
        <div className='row'>
          {products.map(product => (
            <div className='col-md-3'>
              <Card key={product.id}>
                <ProductCard product={product} addToCart={addToCart} />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
