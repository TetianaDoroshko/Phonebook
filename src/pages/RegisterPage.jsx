import { useDispatch, useSelector } from 'react-redux';
import { signupThunk } from 'redux/authThunk';
import { Form, Button, Input } from 'antd';
import { Container } from 'components/App/App.styled';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const error = useSelector(store => store.auth.error);
  useEffect(() => {
    if (error) {
      if (error.name) {
        toast.error(`${error.name}`);
      }
      if (error.email) {
        toast.error(`${error.email}`);
      }
      if (error.password) {
        toast.error(`${error.password}`);
      }
    }
  }, [error]);

  const onFormSubmit = value => {
    dispatch(signupThunk(value));
  };
  return (
    <Container>
      <Form
        layout="vertical"
        name="basic"
        onSubmit={onFormSubmit}
        initialValues={{ remember: true }}
        onFinish={onFormSubmit}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please, input your username' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please, input your email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please, input your password, minimum 7 symbols',
            },
          ]}
        >
          <Input.Password autoComplete="off" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" ghost htmlType="submit">
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};
