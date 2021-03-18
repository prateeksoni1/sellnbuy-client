import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <div
        className='d-flex flex-column justify-content-center align-items-center'
        style={{
          backgroundImage: `url(/assets/bg.jpg)`,
          minHeight: '95vh',
          width: '100vw',
          backgroundSize: 'cover',
        }}
      >
        <h2 className='display-4'>Welcome to OSBD</h2>
        <Link className='mt-4 btn btn-primary btn-lg' to='/signin'>
          Get Started Now
        </Link>
      </div>
    </>
  );
};

export default Home;
