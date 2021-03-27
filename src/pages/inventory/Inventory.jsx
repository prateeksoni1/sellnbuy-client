import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/hoc/Card';
import { toast } from 'react-toastify';

import ProductCard from '../dashboard/components/ProductCard';
import { getUserProducts } from '../../services';


const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getUserProducts();
        setProducts(response.data.products);
      } catch (err) {
        if (!err.response) {
          toast.error('Internal Server Error');
        } else toast.error(err.response.data.message);
      }
    })();
  }, []);
  const removeProduct = async productId => {
    try {
      await axios.delete(
        'http://localhost:8000/api/v1/orders',
        { productId },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      toast.success('Deleted the Product successfully');
    } catch (err) {
      if (!err.response) {
        toast.error('Internal Server Error');
      } else toast.error(err.response.data.message);
    }
  };
  return (
    <div style={{ minHeight: '95vh', backgroundColor: '#F0F1F5' }}>
      <div className='pt-4 container'>
      <div className='row'>
      {products.length != 0 && (
            <h4 className='display-5 text-center'>Your Inventory</h4>
          )}
      </div>
        <div className='row'>
          {products.length === 0 && (
            <h4 className='display-5 text-center'>Your Inventory is Empty</h4>
          )}
          {products.map(product => (
            <div key={product.id} className='col-md-3'>
              <Card>
                <ProductCard product={product} addToCart={removeProduct} />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
