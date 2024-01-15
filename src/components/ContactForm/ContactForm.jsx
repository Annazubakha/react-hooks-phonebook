import React from 'react';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.css';
export class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };
  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <label className={s.label}>
          Name{' '}
          <input
            type="text"
            name="name"
            id={nanoid()}
            required
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <label className={s.label}>
          Number{' '}
          <input
            type="tel"
            name="number"
            required
            id={nanoid()}
            value={this.state.number}
            onChange={this.handleChange}
          />
        </label>
        <button className={s.form_btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
