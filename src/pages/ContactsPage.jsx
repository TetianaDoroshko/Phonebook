import { ContactForm } from 'components/Form/Form';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { Container } from 'components/App/App.styled';

export const ContactsPage = () => {
  return (
    <Container>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </Container>
  );
};
