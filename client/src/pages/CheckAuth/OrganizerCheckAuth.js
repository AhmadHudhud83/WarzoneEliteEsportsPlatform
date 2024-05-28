import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrganizerAuthCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/check-auth', { withCredentials: true });
        setIsAuthenticated(response.data.authenticated);
        setIsAuthChecked(true);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setIsAuthenticated(false);
          setIsAuthChecked(true);
        } else {
          console.error('An error occurred while checking authentication:', error);
        }
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthChecked) {
      if (!isAuthenticated) {
        navigate('/organizer');
      }
    }
  }, [isAuthenticated, isAuthChecked, navigate]);

  return { isAuthenticated, isAuthChecked };
};

export default OrganizerAuthCheck;
