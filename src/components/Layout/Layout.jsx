import { Outlet } from 'react-router-dom';
import { AppBar } from 'components/AppBar/AppBar';
import { Layout } from 'antd';

export const AppLayout = () => {
  return (
    <Layout>
      <AppBar />
      <Layout.Content
        style={{
          minHeight: '100vh',
          textAlign: 'center',
          padding: '30px 50px',
        }}
      >
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};
