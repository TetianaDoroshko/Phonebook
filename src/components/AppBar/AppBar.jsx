import { Navigation } from 'components/Navigation/Navigation';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { useSelector } from 'react-redux';
import { Layout, Image, Typography, Space } from 'antd';
import logo from 'images/phone-book (1).png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AppBar = () => {
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn) ?? false;
  return (
    <Header>
      <Link to="/">
        <Space style={{ alignItems: 'center' }}>
          <Image width={80} src={logo} preview={false} />{' '}
          <Typography.Title style={{ marginBottom: '0', fontSize: '26px' }}>
            Phonebook
          </Typography.Title>
        </Space>
      </Link>

      <Navigation />
      {isLoggedIn && <UserMenu />}
    </Header>
  );
};

export const Header = styled(Layout.Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: lightsteelblue;
  height: 100px;
  font-size: 18px;
`;
