import React from 'react';

const AdminCard = ({ admin, approve }) => {
  const { id, name, email, contact } = admin;
  return (
    <div>
      <div className='pt-2'>
        <h5
          className='display-6'
          style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
        >
          {name}
        </h5>
        <h6 className='display-6' style={{ fontSize: '1rem' }}>
          {email}
        </h6>
        <hr />
        <div
          onClick={() => approve(id)}
          className='d-flex align-items-center justify-content-between'
          style={{
            cursor: 'pointer',
          }}
        >
          <h4
            className='text-end display-6'
            style={{ fontSize: '1.8rem', fontWeight: 'bold' }}
          >
            {contact}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
