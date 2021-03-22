import { privateApi } from './api';

export const getCartItems = () => {
  return privateApi.get('/orders/cart', {
    params: {
      isPurchased: 0,
    },
  });
};

export const deleteFromCart = orderId => {
  return privateApi.delete(`/orders/${orderId}`);
};
