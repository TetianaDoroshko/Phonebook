import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Form, Input, Button } from 'antd';
import { useAddContactsMutation } from 'redux/contactsSlice';
import { useGetContactsQuery } from 'redux/contactsSlice';
import { SpinnerForButton } from 'components/Spinner/Spinner';
import { useRef } from 'react';
import { UpCircleTwoTone } from '@ant-design/icons';
import styled from 'styled-components';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: contacts } = useGetContactsQuery();

  const [addContact, result] = useAddContactsMutation();

  const { isLoading, isError, isSuccess, error, data } = result;

  const formRef = useRef();

  useEffect(() => {
    if (isSuccess) {
      toast.success(`${data?.name} is added to your phonebook.`);
    }
    if (isError) {
      toast.error(`Can't add a new contact. ${error?.data?.message}`);
    }
  }, [data, error, isError, isSuccess]);

  const onChangeField = evt => {
    const fieldName = evt[0]?.name[0] ?? null;
    switch (fieldName) {
      case 'name':
        setName(evt[0].value);
        break;
      case 'phone':
        setPhone(evt[0].value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = value => {
    if (contacts.some(contact => contact.name === name)) {
      toast(`${name} is already  in contacts`);
      return;
    }
    addContact(value);

    setName('');
    setPhone('');
    formRef.current.resetFields();
  };

  return isFormOpen ? (
    <div>
      <ButtonClose
        style={{ padding: '0' }}
        type="primary"
        shape="circle"
        ghost
        icon={<UpCircleTwoTone />}
        size="large"
        onClick={() => setIsFormOpen(false)}
      />
      <Form
        ref={formRef}
        layout="vertical"
        name="addNumber"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFieldsChange={onChangeField}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please, input your username' }]}
        >
          <Input value={name} type="text" name="name" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: 'Please, input your password' }]}
        >
          <Input autoComplete="off" type="tel" name="phone" value={phone} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            ghost
            htmlType="submit"
            disabled={isLoading}
            block
          >
            {isLoading ? <SpinnerForButton /> : 'Add contact'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  ) : (
    <Button
      type="primary"
      ghost
      block
      style={{ marginBottom: '20px' }}
      onClick={() => setIsFormOpen(true)}
    >
      Add new contact
    </Button>
  );
};

export const ButtonClose = styled(Button)`
  padding: 0;
  & span {
    width: 100%;
    height: 100%;

    & svg {
      width: 100%;
      height: 100%;
    }
  }
`;
