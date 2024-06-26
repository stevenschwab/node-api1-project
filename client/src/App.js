import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const initialFormValues = {
  name: '',
  bio: '',
};

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialFormValues);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:9000/api/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.error('Error fetching users', err));
  }, []);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:9000/api/users/${id}`)
      .then(res => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(err => console.error('Error deleting user', err));
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId !== null & editId !== undefined) {
      axios.put('http://localhost:9000/api/users', form)
        .then(res => {
          setUsers(users.map(user => user.id === editId ? res.data : user));
          setEditId(null);
          setForm(initialFormValues);
        })
        .catch(err => console.error('Error updating user', err));
    } else {
      axios.post('http://localhost:9000/api/users', form)
        .then(res => {
          setUsers([ ...users, res.data ]);
          setForm(initialFormValues);
        })
        .catch(err => console.error('Error creating user', err));
    }
  };

  const handleEdit = ({ id, name, bio }) => {
    setForm({ name: name, bio: bio });
    setEditId(id);
  };

  const clearForm = () => {
    setForm(initialFormValues);
    if (editId !== null & editId !== undefined) setEditId(null);
  }

  return (
    <div className='container'v>
      <h1>Users List</h1>
      <ul className='user-list'>
        {users.map(({id, name, bio}) => (
          <li key={id} className='user-item'>
            <div className='user-info'>
              <div>{name}</div>
              <span className='user-bio'>({bio})</span>
            </div>
            <div className='user-buttons'>
              <button className='button edit' onClick={() => handleEdit({ id, name, bio })}>Edit</button>
              <button className='button delete' onClick={() => deleteUser(id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <form className='user-form' onSubmit={handleSubmit}>
        <input
          type='text'
          className='input'
          name='name'
          placeholder='Name'
          value={form.name}
          onChange={handleInputChange}
        />
        <input
          type='text'
          className='input'
          name='bio'
          placeholder='Bio'
          value={form.bio}
          onChange={handleInputChange}
        />
        <button type='submit' className='button submit'>
          {editId !== null && editId !== undefined ? 'Update' : 'Create'}
        </button>
        {(form.name.length > 0 || form.bio.length > 0) && (
          <button type='button' className='button cancel' onClick={clearForm}>Cancel</button>
        )}
      </form>
    </div>
  );
}

export default App;
