import React from 'react';
import axios from 'axios';

const LogoutButton = ({ pageName }) => {
  const handleLogout = async (pageName) => {
    try {
      const response = await axios.post('http://localhost:5000/user/logout', {}, { withCredentials: true });
      console.log(response);
      if (response.status === 200) {
        window.location.href = `/${pageName}`; 
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('An error occurred during logout. Please try again.');
    }
  };

  return (
    <button onClick={()=>handleLogout(pageName)}>Logout</button>
  );
};

export default LogoutButton;