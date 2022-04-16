import { useEffect, useState } from "react";
import axios from "axios";
const GetAllNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await axios.get("http://localhost:3000/news");
                setNews(result.data.entries);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
            setRefresh(false);
        };
        fetchData();
    }, [refresh]);

    return { news, loading, error,setRefresh };
}

export default GetAllNews;