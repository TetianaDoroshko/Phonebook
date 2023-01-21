import { useEffect, useState } from 'react';
import { useUpdateContactsMutation } from 'redux/contactsSlice';
import { Form, Input, Modal } from 'antd';
import toast from 'react-hot-toast';
import { SpinnerForButton } from 'components/Spinner/Spinner';

export const ModalUpdateContact = ({ contact, close, isOpen }) => {
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);

  const [updateContacts, result] = useUpdateContactsMutation();

  const { isLoading, isError, error, isSuccess, data } = result;

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

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Contact ${data?.name} was update.`);
      close();
    }
    if (isError) {
      toast.error(`Can't update a new contact. ${error?.data?.message}`);
    }
  }, [isError, error, isSuccess, data, close]);

  const handleSubmit = e => {
    updateContacts({ id: contact._id, user: { name, phone } });
  };

  return (
    <Modal
      title="Update contact"
      open={isOpen}
      onOk={handleSubmit}
      okText={isLoading ? <SpinnerForButton /> : 'Update contact'}
      onCancel={close}
      centered={true}
    >
      <Form
        layout="vertical"
        name="updateContact"
        initialValues={{ name: name, phone: phone }}
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
          rules={[{ required: true, message: 'Please, input a phone number' }]}
        >
          <Input autoComplete="off" type="tel" name="phone" value={phone} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
