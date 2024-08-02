import React from 'react';
import Navbar from '../components/Navbar';
import Body from '../components/Body';

const HomePage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Navbar />
      <Body />
    </div>
  );
};

export default HomePage;
