import { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orderHistories, setOrderHistory] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/v1/orderHistory/user',
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );
        console.log(response);
        setOrderHistory(response.data.orderHistories);
      } catch (err) {
        if (!err.response) {
          setError('Internal Server Error');
        } else setError(err.response.data.message);
      }
    })();
  }, []);
  return (
    <>
      <div className='mt-4 container'>
        {error && <div className='alert alert-danger'>{error}</div>}
        {orderHistories.map(orderHistory => {
          const { id, name, price, User: user, image } = orderHistory.Order.Product;
          return (
            <div key={id} className='card' style={{ width: '30rem' }}>
              <div className='card-header'>{user.name}</div>
              <img className='card-img-top' src={image} alt='Card cap' />
              <div className='card-body'>
                <h5 className='card-title'>{name}</h5>
                <h6 className='card-subtitle'>{price}</h6>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OrderHistory;
