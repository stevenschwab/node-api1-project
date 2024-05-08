import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/users')
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => {
        console.error('Error fetching users', err);
      });
  }, []);

  return (
    <div>

    </div>
  );
}

export default App;
