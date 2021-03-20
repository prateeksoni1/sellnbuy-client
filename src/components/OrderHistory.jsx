import { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
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
        setOrderHistory(response.data.orderHistory);
      } catch (err) {
        if (!err.response) {
          setError('Internal Server Error');
        } else setError(err.response.data.message);
      }
    })();
  }, []);
//   const addToCart = async productId => {
//     try {
//       await axios.post(
//         'http://localhost:8000/api/v1/orders',
//         { productId },
//         {
//           headers: {
//             authorization: `Bearer ${localStorage.getItem('authToken')}`,
//           },
//         }
//       );
//       alert('Added successfully');
//     } catch (err) {
//       if (!err.response) {
//         setError('Internal Server Error');
//       } else setError(err.response.data.message);
//     }
//   };
  return (
    <>
      <div className='mt-4 container'>
        {error && <div className='alert alert-danger'>{error}</div>}
        {orderHistory.map(orderHistory => {
          const { id, name, price, User: user, image } = orderHistory.Order.Product;
          return (
            <div key={id} className='card' style={{ width: '30rem' }}>
              <div className='card-header'>{user.name}</div>
              <img className='card-img-top' src={image} alt='Card cap' />
              <div className='card-body'>
                <h5 className='card-title'>{name}</h5>
                <h6 className='card-subtitle'>{price}</h6>
                <button
                  className='btn btn-primary w-100'
                //   onClick={() => addToCart(order.id)}
                >
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

export default OrderHistory;
