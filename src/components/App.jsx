import React, { Component } from "react";
import { nanoid } from 'nanoid';

import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList";

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
   const savedContacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(savedContacts);
    this.setState({
      contacts:parsedContacts,
    });
  }
  componentDidUpdate(prevState){
    if(this.state.contacts !== prevState.contacts){
      localStorage.setItem('contacts',JSON.stringify(this.state.contacts))

    }
    }
    
  onSubmitAddContact = ({ name, number }) => {
    const existingContact = this.state.contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());

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

  render() {
    const { contacts, filter } = this.state;
    if(contacts){
      const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <div style={{ height: '100px', padding: '20px' }}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onSubmitAddContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.isFilterContact} />
        <ContactList contacts={filteredContacts} handleDeleteContact={this.handleDeleteContact} />
      </div>
    );

    }
  }
}
