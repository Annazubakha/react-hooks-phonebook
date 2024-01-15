import React from 'react';
import { Container, Title } from './App.styled';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList ';
import { ContactsFilter } from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('CONTACTS'));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('CONTACTS', JSON.stringify(this.state.contacts));
    }
  }
  handleAddContact = data => {
    const newObject = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    const oldContact = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === newObject.name.toLowerCase()
    );
    if (!oldContact) {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newObject],
      }));
    } else {
      window.alert(`${newObject.name} is already in contacts.`);
    }
  };
  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  handleChangeFilterStr = e => {
    this.setState({ filter: e.target.value });
  };

  getFilteredData = (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter, contacts } = this.state;
    const filteredUsers = this.getFilteredData(contacts, filter);
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleAddContact} />
        <Title>Contacts</Title>
        <ContactsFilter
          onChangeFilter={this.handleChangeFilterStr}
          filterStr={filter}
        />
        <ContactList
          contacts={filteredUsers}
          onDeleteContact={this.handleDeleteContact}
        />
      </Container>
    );
  }
}
