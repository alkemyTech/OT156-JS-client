import { useEffect, useState } from "react";
import axios from "axios";

export const GetAllMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await axios.get("http://localhost:3000/members");
                setMembers(result.data.members);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
            setRefresh(false);
        };
        fetchData();
    }, [refresh]);

    return { members, loading, error,setRefresh };
}
