import { DropdownMenu } from '@radix-ui/themes';
import React from 'react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useDispatch, useSelector } from 'react-redux';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { toggleTheme } from '../state/AppSlice';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutAlert from './LogoutAlert';
import { Link } from 'react-router-dom';

// Dropdown menu component in the navbar
const NavbarMenu = () => {
  // Access theme and user information from the Redux store
  const theme = useSelector((state) => state.app.theme);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // Render nothing if user is not loaded yet
  if (!user) {
    return null;
  }

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {/* Menu icon to trigger the dropdown */}
          <div className="cursor-pointer">
            <MenuRoundedIcon />
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {/* Link to user profile */}
          {user && (
            <Link to={`/profile/${user._id}`}>
              <DropdownMenu.Item className="flex gap-3">
                <p>Profile</p>
                <AccountCircleOutlinedIcon fontSize="small" />
              </DropdownMenu.Item>
            </Link>
          )}
          {/* Theme toggle button */}
          <DropdownMenu.Item
            className="flex gap-3"
            onClick={(e) => {
              e.preventDefault();
              dispatch(toggleTheme());
            }}
          >
            <p>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</p>
            {theme === 'dark' ? (
              <LightModeRoundedIcon fontSize="small" />
            ) : (
              <DarkModeRoundedIcon fontSize="small" />
            )}
          </DropdownMenu.Item>
          {/* Logout button */}
          {user && (
            <DropdownMenu.Item
              color="red"
              onClick={(e) => e.preventDefault()}
              className="flex gap-3"
            >
              <LogoutAlert />
              <LogoutRoundedIcon fontSize="small" />
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default NavbarMenu;
