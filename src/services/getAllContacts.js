import { useEffect, useState } from "react";
import axios from "axios";
const GetAllContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await axios.get("http://localhost:3000/contacts");
                setContacts(result.data.entries);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
            setRefresh(false);
        };
        fetchData();
    }, [refresh]);

    return { contacts, loading, error,setRefresh };
}

export default GetAllContacts;