import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlayerAuthCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/player/check-auth', { withCredentials: true });
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
        navigate('/player');
      }
    }
  }, [isAuthenticated, isAuthChecked, navigate]);

  return { isAuthenticated, isAuthChecked };
};

export default PlayerAuthCheck;
