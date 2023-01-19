import { useSelector } from 'react-redux';
import { Contact } from 'components/Contact/Contact';
import { useGetContactsQuery } from 'redux/contactsSlice';
import { useMemo, useEffect } from 'react';
import { Spinner } from 'components/Spinner/Spinner';
import toast from 'react-hot-toast';
import { List } from 'antd';

export const ContactList = () => {
  const filter = useSelector(state => state.filter);

  const {
    data: contacts,
    error,
    isLoading,
  } = useGetContactsQuery(null, { refetchOnMountOrArgChange: true });

  const renderList = useMemo(
    () =>
      contacts?.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      ) ?? [],
    [contacts, filter]
  );
  useEffect(() => {
    if (error) {
      toast.error(
        `We couldn'n get your contacts. Try again later. Error code: ${error.status}`
      );
    }
    return;
  }, [error]);

  return (
    <>
      {isLoading && <Spinner />}

      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={renderList}
        renderItem={contact => <Contact key={contact._id} contact={contact} />}
      />
    </>
  );
};
