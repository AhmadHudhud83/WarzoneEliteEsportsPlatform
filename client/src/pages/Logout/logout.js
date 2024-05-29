import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const LogoutButton = ({ pageName }) => {
  const handleLogout = async (pageName) => {
    try {
      const response = await axios.post('http://localhost:5000/user/logout', {}, { withCredentials: true })
        .then((response) => {
          if (pageName === "login") {
            Cookies.remove('user_id');
          } else {
            Cookies.remove('supervisor_id');
          }
          return response;
        });
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
    <button className="btn btn-md btn-primary text-white  custom-btn d-block ms-auto w-100"
      style={{ background: "linear-gradient(286.57deg, #6600D5 0%, #4221E3 49.09%, #005FFF 100%)" }} onClick={() => handleLogout(pageName)}>Logout</button>
  );
};

export default LogoutButton;