import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.css';
export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ name: name, number: number });
    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };
  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
        Name{' '}
        <input
          type="text"
          name="name"
          id={nanoid()}
          required
          value={name}
          onChange={handleChange}
        />
      </label>
      <label className={s.label}>
        Number{' '}
        <input
          type="tel"
          name="number"
          required
          id={nanoid()}
          value={number}
          onChange={handleChange}
        />
      </label>
      <button className={s.form_btn} type="submit">
        Add contact
      </button>
    </form>
  );
};
