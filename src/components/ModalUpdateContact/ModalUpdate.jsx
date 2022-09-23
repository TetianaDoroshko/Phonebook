import { useState } from 'react';
import { useUpdateContactsMutation } from 'redux/contactsSlice';
import { Form, Input, Modal } from 'antd';
import toast from 'react-hot-toast';

export const ModalUpdateContact = ({ contact, close, isOpen }) => {
  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.number);

  const [updateContacts] = useUpdateContactsMutation();

  const onChangeField = evt => {
    const fieldName = evt[0]?.name[0] ?? null;
    switch (fieldName) {
      case 'name':
        setName(evt[0].value);
        break;
      case 'number':
        setNumber(evt[0].value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = e => {
    console.log(e);
    updateContacts({ id: contact.id, user: { name, number } })
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
          label="Number"
          name="number"
          rules={[{ required: true, message: 'Please, input a number' }]}
        >
          <Input
            autoComplete="off"
            type="tel"
            name="number"
            value={number}
            defaultValue={number}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
