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

  useEffect(() => {
    axios.get('http://localhost:9000/api/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.error('Error fetching users', err);
      });
  }, []);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:9000/api/users/${id}`)
      .then(res => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(err => {
        console.error('Error deleting user', err);
      })
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map(({id, name, bio}) => (
          <li key={id}>
            {name} ({bio}) <button onClick={() => deleteUser(id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={form.name}
          onChange={handleInputChange}
        />
        <input
          type='text'
          name='bio'
          placeholder='Bio'
          value={form.bio}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

export default App;
