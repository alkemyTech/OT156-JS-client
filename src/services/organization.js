import axios from 'axios';
import { useEffect, useState } from 'react';

export const GetOrganizationById = ({ id }) => {
    const [organization, setOrganization] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await axios.get(`http://localhost:3000/organizations/${id}`);
                setOrganization(result.data.organization);
            } catch (error) {
                setError(error);
            }
            setRefresh(false);
            setLoading(false);
        };
        fetchData();
    }, [id,refresh]);

    return { organization, loading, error, setRefresh };
}