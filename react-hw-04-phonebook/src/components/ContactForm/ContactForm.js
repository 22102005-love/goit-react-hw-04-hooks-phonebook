import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import s from './ContactForm.module.css';

export default function ContactForm({ onAdd, onCheckUnique }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [id, setId] = useState('');

  const handleChangeForm = ({ target }) => {
    // console.log(target);
    const { name, value } = target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        return;
    }
    setId(uuidv4());
  };
  const handleFormSubmite = event => {
    event.preventDefault();
    onCheckUnique(name)
      ? alert('Contact is exists')
      : onAdd({ id, name, phone });
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPhone('');
  };

  return (
    <form onSubmit={handleFormSubmite} className={s.form}>
      <label className={s.formInput}>
        Name
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={handleChangeForm}
        ></input>
      </label>
      <label className={s.formInput}>
        Number
        <input
          type="tel"
          name="phone"
          placeholder="Enter phone"
          value={phone}
          onChange={handleChangeForm}
        ></input>
      </label>

      <button type="submit">Add contact</button>
    </form>
  );
}
