import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

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
  }

  return (
    <div>
      <ul>
        {users.map(({id, name, bio}) => (
          <li key={id}>
            {name} ({bio})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
