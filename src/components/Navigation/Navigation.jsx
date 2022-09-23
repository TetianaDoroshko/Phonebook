import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import styled from 'styled-components';

export const Navigation = () => {
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn) ?? false;

  return (
    <Nav
      style={{
        flex: '1 1 auto',
        justifyContent: 'flex-end',
      }}
      mode="horizontal"
      items={
        isLoggedIn
          ? [
              {
                label: <NavLink to="contacts">Contacts</NavLink>,
                key: 'contacts',
              },
            ]
          : [
              {
                label: <NavLink to="register">Sign Up</NavLink>,
                key: 'signup',
              },
              {
                label: <NavLink to="login">Login</NavLink>,
                key: 'login',
              },
            ]
      }
    />
  );
};

export const Nav = styled(Menu)`
  flex: 1 1 auto;
  justify-content: flex-end;
  font-size: 22px;
  background-color: inherit;
  border: none;
`;
