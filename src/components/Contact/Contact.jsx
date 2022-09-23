import PropTypes from 'prop-types';
import { useDeleteContactsMutation } from 'redux/contactsSlice';
import { useEffect, useState } from 'react';
import { SpinnerForButton } from 'components/Spinner/Spinner';
import toast from 'react-hot-toast';
import { ModalUpdateContact } from 'components/ModalUpdateContact/ModalUpdate';
import { List, Button, Avatar } from 'antd';
import person from 'images/person-295.png';

export const Contact = ({ contact }) => {
  const [isModalShown, setIsModalShown] = useState(false);

  const [deleteContact, result] = useDeleteContactsMutation();

  const { isError, isLoading, isSuccess } = result;

  useEffect(() => {
    if (isSuccess) {
      toast.success(`${contact?.name} was removed from your phonebook.`);
    }
  }, [contact?.name, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(`We can't remove a contact.`);
    }
  }, [isError]);

  return (
    <List.Item
      actions={[
        <Button
          type="primary"
          ghost
          onClick={() => deleteContact(contact.id)}
          disabled={isLoading}
        >
          {isLoading ? <SpinnerForButton /> : 'Delete'}
        </Button>,
        <Button
          type="primary"
          ghost
          onClick={() => setIsModalShown(true)}
          disabled={isLoading}
        >
          Update
        </Button>,
      ]}
      extra={
        isModalShown && (
          <ModalUpdateContact
            contact={contact}
            close={() => setIsModalShown(false)}
            isOpen={isModalShown}
          />
        )
      }
    >
      <List.Item.Meta
        avatar={<Avatar src={person} />}
        title={contact.name}
        description={contact.number}
        style={{ textAlign: 'left', fontSize: '29px' }}
      />
    </List.Item>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};
