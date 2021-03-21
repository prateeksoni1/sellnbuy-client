import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/hoc/Card';
import { toast } from 'react-toastify';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/v1/orders/cart',
          {
            params: {
              isPurchased: 1,
            },
            headers: {
              authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );
        console.log(response);
        setOrders(
          response.data.orders.reduce((orders, order) => {
            const index = orders.findIndex(
              orderItem => orderItem.Product.id === order.Product.id
            );

            if (index === -1) {
              orders.push({
                ...order,
                quantity: 1,
                ids: [order.id],
                totalPrice: order.Product.price,
              });
            } else {
              orders[index].ids.push(order.id);
              orders[index].quantity++;
              orders[index].totalPrice =
                orders[index].Product.price * orders[index].quantity;
            }

            return orders;
          }, [])
        );
      } catch (err) {
        if (!err.response) {
          toast.error('Internal Server Error');
        } else toast.error(err.response.data.message);
      }
    })();
  }, []);

  return (
    <>
      <div className='mt-4 container'>
        <div className='row gx-2'>
          {orders.map(order => {
            const { quantity, totalPrice } = order;
            const { id, name, image } = order.Product;
            return (
              <div key={id} className='col-6 mt-2'>
                <Card>
                  <div className='d-flex flex-row align-items-center'>
                    <div
                      style={{ height: 80, width: 80, borderRadius: 40 }}
                      className='me-4'
                    >
                      <img
                        style={{
                          height: 80,
                          width: 80,
                          borderRadius: 40,
                          objectFit: 'cover',
                        }}
                        src={image}
                        alt='product'
                      />
                    </div>
                    <div className='d-flex flex-column'>
                      <h5 className='display-6' style={{ fontSize: '1.8rem' }}>
                        {name}
                      </h5>
                      <h6 className=''>Quantity: {quantity}</h6>
                    </div>
                    <div className='d-flex ms-auto'>
                      <h5
                        className='display-6 me-4'
                        style={{ fontSize: '1.8rem', fontWeight: 'bold' }}
                      >
                        &#x20B9;{totalPrice}
                      </h5>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
        <div className='card mt-2'>
          <div className='card-body d-flex flex-row align-items-center'>
            <h5 className='card-title'>
              Total Items:{' '}
              {orders.reduce((count, order) => count + order.quantity, 0)}
            </h5>
            <h5 className='ms-4 card-title'>
              Total Price: &#x20B9;
              {orders.reduce(
                (sum, order) => sum + order.Product.price * order.quantity,
                0
              )}
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
