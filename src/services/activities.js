import { useEffect, useState } from "react";
import axios from "axios";

export const GetAllActivities = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await axios.get("http://localhost:3000/activities");
                setActivities(result.data)
            } catch (error) {
                setError(error);
            }
            setLoading(false);
            setRefresh(false);
        };
        fetchData();
    }, [refresh]);

    return { activities, loading, error,setRefresh };
}

export const GetActivitiesById = ({id}) => {
    const [activity, setActivity] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await axios.get(`http://localhost:3000/activities/${id}`);
                setActivity(result.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        fetchData();
    }, [id]);

    return { activity, loading, error };
}