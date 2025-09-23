import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

// Assumption: The API doesn't provide a 'department'. 
// We'll add a few sample departments to assign randomly.
const departments = ['Engineering', 'Marketing', 'Sales', 'Human Resources', 'Design'];

// Helper to split name and add a random department
const processUserData = (user) => {
  const nameParts = user.name.split(' ');
  return {
    ...user,
    firstName: nameParts[0] || '',
    lastName: nameParts.slice(1).join(' ') || '',
    department: departments[Math.floor(Math.random() * departments.length)]
  };
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  // Process each user to add firstName, lastName, and department
  return response.data.map(processUserData);
};

export const addUser = async (user) => {
  // The API will simulate the creation and return the new object with an ID
  const response = await axios.post(`${API_URL}/users`, user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await axios.put(`${API_URL}/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  // The API will return an empty object with a 200 status code on success
  const response = await axios.delete(`${API_URL}/users/${id}`);
  return response.data;
};
