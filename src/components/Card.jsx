import React from 'react';

const Card = ({ product, addToCart }) => {
  const { id, User: user, image, name, price } = product;

  return (
    <div
      key={id}
      style={{
        boxShadow: '3px 1px 8px 0px rgba(0,0,0,0.33)',
        borderRadius: 20,
        background: '#fff',
      }}
      className='p-3'
    >
      <img
        style={{
          borderRadius: 20,
          height: '250px',
          width: '100%',
          objectFit: 'cover',
        }}
        src={image}
        alt='Card cap'
      />
      <div className='mt-2'>
        <h5
          className='display-6'
          style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
        >
          {name}
        </h5>
        <h6 className='display-6' style={{ fontSize: '1rem' }}>
          {user.name}
        </h6>
        <hr />
        <div className='d-flex align-items-center justify-content-between'>
          <img src='/assets/cart.svg' alt='cart logo' />
          <h4
            className='text-end display-6'
            style={{ fontSize: '1.8rem', fontWeight: 'bold' }}
          >
            &#x20B9;{price}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Card;
