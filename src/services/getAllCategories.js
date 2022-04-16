import { useEffect, useState } from "react";
import axios from "axios";
const GetAllCategories = () => {
    const token = localStorage.getItem("token");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await axios.get("http://localhost:3000/categories",
                    {
                        headers: {
                            Authorization: `${token}`
                        }
                    });
                    setCategories(result.data.categories)
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return { categories, loading, error};
}

export default GetAllCategories;