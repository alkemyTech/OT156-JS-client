import axios from "axios";
import { useEffect, useState } from "react";

export const deleteCategory = (id) => {
    return axios.delete(`http://localhost:3000/categories/${id}`,{
        headers: {
            Authorization: `${localStorage.getItem("token")}`
        }
    });
};

export const GetAllCategories = () => {
    const token = localStorage.getItem("token");
    const [refresh, setRefresh] = useState(false);
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
            setRefresh(false);
            setLoading(false);
        };
        fetchData();
    }, [refresh]);

    return { categories, loading, error,setRefresh};
}
