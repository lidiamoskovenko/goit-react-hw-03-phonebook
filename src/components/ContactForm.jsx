import React, { Component } from "react";
import { nanoid } from 'nanoid'

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  } 
  nameId = nanoid();
  numberId = nanoid();

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.currentTarget.name]: e.target.value });
  };

  onSabmithandleChange = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({  name: '',
    number: '', });
  };

  render() {
    return (
      <form onSubmit={this.onSabmithandleChange} style={{ display: 'flex', gap:'10px' }}>
        <label htmlFor={this.nameId}>Name</label>

        <input
  type="text"
  name="name"
  id={this.nameId}
  value={this.state.name}
  pattern="^[a-zA-Zа-яА-Я]+([ '\\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*$"
  onChange={this.handleChange}
required/>
        <label htmlFor={this.numberId} required>Number</label>

        <input 
        type="tel" 
        name="number" 
        id={this.numberId} 
        value={this.state.number} 
        required pattern="^\+?\d{1,4}[ .\-]?\(?\d{1,3}\)?[ .\-]?\d{1,4}[ .\-]?\d{1,4}[ .\-]?\d{1,9}$" 
        onChange={this.handleChange}/>

        <button type="submit"  style={{ borderRadius: '30px', border:'1px solid black' }}>Add contact</button>
      </form>
    );
  }
}

export default ContactForm;
