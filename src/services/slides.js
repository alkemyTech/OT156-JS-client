import axios from 'axios';
import { useEffect, useState } from 'react';

export const GetAllSlides = () => {
    const [refresh, setRefresh] = useState(false);
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await axios.get('http://localhost:3000/slides');
                setSlides(result.data.slides);
            } catch (error) {
                setError(error);
            }
            setRefresh(false);
            setLoading(false);
        };
        fetchData();
    }, [refresh]);

    return { slides, loading, error, setRefresh };
};


export const deleteSlide = (id) => {
    return axios.delete(`http://localhost:3000/slides/${id}`, {
        headers: {
            Authorization: `${localStorage.getItem('token')}`,
        },
    });
};

export const GetSlidesById = ({ id }) => {
    const [slide, setSlide] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await axios.get(`http://localhost:3000/slides/${id}`);
                setSlide(result.data.slide);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        fetchData();
    }, [id]);
    return { slide, loading, error };
}
