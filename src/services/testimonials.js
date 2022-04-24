import axios from 'axios';
import { useEffect, useState } from 'react';

export const deleteTestimonials = (id) => {
  return axios.delete(`http://localhost:3000/testimonials/${id}`, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  });
};

export const GetAllTestimonials = () => {
  const token = localStorage.getItem('token');
  const [refresh, setRefresh] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get('http://localhost:3000/testimonials', {
          headers: {
            Authorization: `${token}`,
          },
        });
        setTestimonials(result.data.testimonials);
      } catch (error) {
        setError(error);
      }
      setRefresh(false);
      setLoading(false);
    };
    fetchData();
  }, [refresh]);

  return { testimonials, loading, error, setRefresh };
};

export const GetTestimonialById = ({id}) => {
  const [testimonial, setTestimonial] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
          setLoading(true);
          try {
              const result = await axios.get(`http://localhost:3000/testimonials/${id}`);
              setTestimonial(result.data.testimonial);
          } catch (error) {
              setError(error);
          }
          setLoading(false);
      };
      fetchData();
  }, [id]);

  return { testimonial, loading, error };
}
