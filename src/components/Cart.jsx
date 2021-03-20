import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Cart = ({ history }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/v1/orders/cart',
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );

        setOrders(response.data.orders);
      } catch (err) {
        if (!err.response) {
          setError('Internal Server Error');
        } else setError(err.response.data.message);
      }
    })();
  }, []);

  const removeFromCart = async orderId => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/orders/${orderId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setOrders(orders.filter(order => order.id !== orderId));
      toast.success('Order removed successfully');
    } catch (err) {
      if (!err.response) {
        setError('Internal Server Error');
      } else setError(err.response.data.message);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/orderhistory',
        { orders: orders.map(order => order.id) },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      console.log(response);
      toast.success('Products ordered successfully');
      history.push('/dashboard');
    } catch (err) {
      if (!err.response) {
        setError('Internal Server Error');
      } else setError(err.response.data.message);
    }
  };
  return (
    <>
      <div className='mt-4 container'>
        {error && <div className='alert alert-danger'>{error}</div>}
        <div className='row gx-2'>
          {orders.map(order => {
            const { id, name, price } = order.Product;
            return (
              <div key={id} className='col-6 card mt-2'>
                <div className='card-body  d-flex flex-row align-items-center'>
                  <h5 className='card-title'>{name}</h5>
                  <h6 className='ms-4 card-subtitle'>{price}</h6>
                  <button
                    className='ms-auto btn btn-danger'
                    onClick={() => removeFromCart(order.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className='card mt-2'>
          <div className='card-body d-flex flex-row align-items-center'>
            <h5 className='card-title'>
              Total Items: {orders.reduce((count, _) => count + 1, 0)}
            </h5>
            <h5 className='ms-4 card-title'>
              Total Price:{' '}
              {orders.reduce((sum, order) => sum + order.Product.price, 0)}
            </h5>
            {orders.length > 0 && (
              <button
                className='ms-auto btn btn-success'
                onClick={handleCheckout}
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
