import { useEffect, useState } from "react";
import axios from "axios";
const GetNewsById = ({id}) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await axios.get(`http://localhost:3000/news/${id}`);
                setNews(result.data.entry);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        fetchData();
    }, [id]);

    return { news, loading, error };
}

export default GetNewsById;