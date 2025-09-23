import React, { useState, useEffect, useMemo } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from './services/api';
import UserTable from './components/UserTable';
import './index.css'; // Ensure global styles are imported
import 'animate.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async (user) => {
    try {
      // NOTE: JSONPlaceholder simulates this; it won't be saved on the server.
      // We get a new object back and add it to our local state for a seamless UI experience.
      const newUser = await addUser(user);
      // Let's add the extra fields our UI needs
      const processedNewUser = {
          ...newUser,
          firstName: user.firstName,
          lastName: user.lastName,
          department: user.department
      };
      setUsers(prevUsers => [processedNewUser, ...prevUsers]);
    } catch (err) {
      alert('Failed to add user.');
    }
  };

  const handleUpdateUser = async (id, updatedData) => {
    try {
        const updatedUser = await updateUser(id, updatedData);
        setUsers(users.map(u => (u.id === id ? { ...u, ...updatedData } : u)));
    } catch (err) {
        alert('Failed to update user.');
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
        try {
            await deleteUser(id);
            setUsers(users.filter(u => u.id !== id));
        } catch (err) {
            alert('Failed to delete user.');
        }
    }
  };


  return (
    <div className="container">
      <h1>User Management Dashboard</h1>
      
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!loading && !error && (
        <UserTable
          users={users}
          onAddUser={handleAddUser}
          onUpdateUser={handleUpdateUser}
          onDeleteUser={handleDeleteUser}
        />
      )}
    </div>
  );
}

export default App;
