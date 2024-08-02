import React from 'react';
import Feed from './Feed';
import LeftBar from './LeftBar';

// Main body component for the page layout
const Body = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'powderblue', display: 'flex', justifyContent: 'center', gap: '24px' }}>
      {/* Left sidebar component */}
      <div style={{ flex: '0 0 auto', backgroundColor: 'white', padding: '16px', borderRadius: '8px' }}>
        <LeftBar />
      </div>
      {/* Main feed/content component */}
      <div style={{ flex: '1 1 auto' }}>
        <Feed />
      </div>
    </div>
  );
};

export default Body;

