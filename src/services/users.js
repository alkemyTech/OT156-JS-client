import axios from 'axios';
import { useEffect, useState } from 'react';

export const deleteUsers = (id) => {
  return axios.delete(`http://localhost:3000/users/${id}`, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  });
};

export const GetAllUsers = () => {
  const token = localStorage.getItem('token');
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get('http://localhost:3000/users', {
          headers: {
            Authorization: `${token}`,
          },
        });
        setUsers(result.data.users);
      } catch (error) {
        setError(error);
      }
      setRefresh(false);
      setLoading(false);
    };
    fetchData();
  }, [refresh]);

  return { users, loading, error, setRefresh };
};

export const GetUserById = ({id}) => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
          setLoading(true);
          try {
              const result = await axios.get(`http://localhost:3000/users/${id}`,
              {
                headers: {
                  Authorization: `${token}`,
                },
              });
              setUser(result.data.user);
          } catch (error) {
              setError(error);
          }
          setLoading(false);
      };
      fetchData();
  }, [id]);

  return { user, loading, error };
}
