import { useState, useEffect } from 'react';
import './App.css';
import ContactForm from './components/ContactForm/ContactForm.js';
import ContactList from './components/ContactList/ContactList.js';
import Filter from './components/Filter/Filter.js';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = newContact => {
    // console.log(newContact);
    setContacts([...contacts, newContact]);
  };

  const handleCheckUniqueContact = name => {
    const existContact = contacts.find(contact => contact.name === name);
    return existContact;
  };

  const handleRemoveContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleFilterChange = filter => setFilter(filter);

  const visibleContacts = contacts.filter(function (contact) {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div>
      <h2 style={{ fontSize: 40 }}>Form Contact</h2>
      <ContactForm
        onAdd={handleAddContact}
        onCheckUnique={handleCheckUniqueContact}
      ></ContactForm>
      <h2 style={{ fontSize: 40 }}>Contacts</h2>
      <Filter filter={filter} onChange={handleFilterChange}></Filter>
      <ContactList
        contacts={visibleContacts}
        onRemove={handleRemoveContact}
      ></ContactList>
    </div>
  );
}
