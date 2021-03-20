import React from 'react';

const Card = ({ children }) => {
  return (
    <div
      style={{
        boxShadow: '3px 1px 8px 0px rgba(0,0,0,0.33)',
        borderRadius: 20,
        background: '#fff',
      }}
      className='p-3'
    >
      {children}
    </div>
  );
};

export default Card;
