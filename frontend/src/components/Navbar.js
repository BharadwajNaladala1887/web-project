import React from 'react';
import NavbarMenu from './NavbarMenu';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CreatePostAlert from './CreatePostAlert';

// Navbar component for top navigation
const Navbar = () => {
  // Access user information from the Redux store
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {/* Top navigation bar */}
      <div
        style={{
          width: '100%',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'var(--bg-black)',
          opacity: 0.95,
          backdropFilter: 'blur(16px)',
          color: 'var(--text-dark)',
          padding: '0 10%',
          height: '3.5rem',
          alignItems: 'center',
          textAlign: 'var(--text-light)',
        }}
      >
        {/* Navbar menu positioned on the left side */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <NavbarMenu />
        </div>
        {/* Navigation links (visible on medium and larger screens) */}
        <div
          style={{
            display: 'none',
            width: '40%',
            justifyContent: 'space-between',
          }}
          className="md:flex"
        >
          <Link
            to="/"
            style={{
              padding: '0.5rem',
              borderRadius: '0.375rem',
              transition: 'all 0.3s ease-in-out',
              cursor: 'pointer',
            }}
            className="hover:bg-gray-300 dark:hover:bg-gray-900"
          >
            <HomeOutlinedIcon fontSize="large" />
          </Link>
          <Link
            to="/search"
            style={{
              padding: '0.5rem',
              borderRadius: '0.375rem',
              transition: 'all 0.3s ease-in-out',
              cursor: 'pointer',
            }}
            className="hover:bg-gray-300 dark:hover:bg-gray-900"
          >
            <SearchRoundedIcon fontSize="large" />
          </Link>
          <div
            style={{
              padding: '0.5rem',
              borderRadius: '0.375rem',
              transition: 'all 0.3s ease-in-out',
              cursor: 'pointer',
            }}
            className="hover:bg-gray-300 dark:hover:bg-gray-900"
          >
            <CreatePostAlert />
          </div>
          <Link
            to={user ? `/profile/${user._id}` : '/login'}
            style={{
              padding: '0.5rem',
              borderRadius: '0.375rem',
              transition: 'all 0.3s ease-in-out',
              cursor: 'pointer',
            }}
            className="hover:bg-gray-300 dark:hover:bg-gray-900"
          >
            <Person2OutlinedIcon fontSize="large" />
          </Link>
        </div>
        {/* Login button or user menu */}
        <div style={{ width: '6rem', textAlign: 'right' }}>
          <Link to="/login">
            {!user ? (
              <button
                style={{
                  padding: '0.5rem 0.75rem',
                  fontSize: '1rem',
                  borderRadius: '0.375rem',
                  transition: 'all 0.3s ease-in-out',
                  color: 'white',
                  backgroundColor: 'gray',
                  cursor: 'pointer',
                }}
              >
                Login
              </button>
            ) : (
              <NavbarMenu />
            )}
          </Link>
        </div>
      </div>
      {/* Bottom navigation bar (visible on small screens) */}
      <div
        style={{
          position: 'fixed',
          zIndex: 50,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          background: 'linear-gradient(to top, white, transparent)',
          backdropFilter: 'blur(16px)',
          padding: '0.75rem',
        }}
        className="md:hidden"
      >
        <Link
          to="/"
          style={{
            padding: '0.5rem',
            borderRadius: '0.375rem',
            transition: 'all 0.3s ease-in-out',
            cursor: 'pointer',
          }}
          className="hover:bg-gray-300 dark:hover:bg-gray-900"
        >
          <HomeOutlinedIcon fontSize="large" />
        </Link>
        <Link
          to="/search"
          style={{
            padding: '0.5rem',
            borderRadius: '0.375rem',
            transition: 'all 0.3s ease-in-out',
            cursor: 'pointer',
          }}
          className="hover:bg-gray-300 dark:hover:bg-gray-900"
        >
          <SearchRoundedIcon fontSize="large" />
        </Link>
        <div
          style={{
            padding: '0.5rem',
            borderRadius: '0.375rem',
            transition: 'all 0.3s ease-in-out',
            cursor: 'pointer',
          }}
          className="hover:bg-gray-300 dark:hover:bg-gray-900"
        >
          <CreatePostAlert />
        </div>
        <Link
          to={user ? `/profile/${user._id}` : '/login'}
          style={{
            padding: '0.5rem',
            borderRadius: '0.375rem',
            transition: 'all 0.3s ease-in-out',
            cursor: 'pointer',
          }}
          className="hover:bg-gray-300 dark:hover:bg-gray-900"
        >
          <Person2OutlinedIcon fontSize="large" />
        </Link>
      </div>
    </>
  );
};

export default Navbar;
