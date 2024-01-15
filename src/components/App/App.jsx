import React, { useEffect, useState } from 'react';
import { Container, Title } from './App.styled';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList ';
import { ContactsFilter } from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('CONTACTS'));
    if (contacts?.length) {
      return contacts;
    }
    return [];
  });
  useEffect(() => {
    localStorage.setItem('CONTACTS', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = data => {
    const newObject = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    const oldContact = contacts.some(
      ({ name }) => name.toLowerCase() === newObject.name.toLowerCase()
    );
    if (!oldContact) {
      setContacts(prevState => [...prevState, newObject]);
    } else {
      window.alert(`${newObject.name} is already in contacts.`);
    }
  };
  const handleDeleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };
  const handleChangeFilterStr = e => {
    setFilter(e.target.value);
  };

  const getFilteredData = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const filteredUsers = getFilteredData();
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <Title>Contacts</Title>
      <ContactsFilter
        onChangeFilter={handleChangeFilterStr}
        filterStr={filter}
      />
      <ContactList
        contacts={filteredUsers}
        onDeleteContact={handleDeleteContact}
      />
    </Container>
  );
};
