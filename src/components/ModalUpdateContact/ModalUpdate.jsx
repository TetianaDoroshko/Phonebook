import { useState } from 'react';
import { useUpdateContactsMutation } from 'redux/contactsSlice';
import { Form, Input, Modal } from 'antd';
import toast from 'react-hot-toast';

export const ModalUpdateContact = ({ contact, close, isOpen }) => {
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);

  const [updateContacts, result] = useUpdateContactsMutation();

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

  const handleSubmit = e => {
    updateContacts({ id: contact._id, user: { name, phone } })
      .then(() => toast.success(`${name} was updated in your phonebook.`))
      .catch(() => toast.error(`Error happend. We can't update the contact.`));
    close();
  };

  return (
    <Modal
      title="Update contact"
      open={isOpen}
      onOk={handleSubmit}
      okText="Update contact"
      onCancel={close}
      centered={true}
    >
      <Form
        layout="vertical"
        name="updateContact"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFieldsChange={onChangeField}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please, input your username' }]}
        >
          <Input value={name} type="text" name="name" defaultValue={name} />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: 'Please, input a phone number' }]}
        >
          <Input
            autoComplete="off"
            type="tel"
            name="phone"
            value={phone}
            defaultValue={phone}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
