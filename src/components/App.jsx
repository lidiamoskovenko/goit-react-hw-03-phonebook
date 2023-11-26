import React, { Component } from "react";
import { nanoid } from 'nanoid';
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList";

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onSubmitAddContact = ({ name, number }) => {
    if(this.state.contacts){
      const existingContact = this.state.contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      );
  
      if (existingContact) {
        alert(`${name} is already in your phonebook!`);
      } else {
        const newContact = {
          id: nanoid(),
          name,
          number,
        };
        this.setState((prevState) => ({
          contacts: [...prevState.contacts, newContact],
        }));
      }
  
    }
  };

  isFilterContact = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDeleteContact = (contactId) => {
    this.setState({
      contacts: this.state.contacts.filter((contact) => contact.id !== contactId),
    });
  };
  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };
  render() {
    const { filter } = this.state;
    const contacts = filter ? this.filterContacts() : this.state.contacts;
    return (
      <div style={{ height: '100px', padding: '20px' }}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onSubmitAddContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.isFilterContact} />
        {contacts && < ContactList contacts={contacts} handleDeleteContact={this.handleDeleteContact} />}
      </div>
    );
  }
}

export default App;
