import axios from "axios";

export async function getRequest(link) {
  const token = window.localStorage.getItem("token");
  let response = await axios.get(link, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function postRequest(link, values) {
  const token = window.localStorage.getItem("token");
  let response = await axios.post(
    link,
    { ...values, token },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

export async function deleteRequest(link) {
  let response = await axios.delete(link);
  return response.data;
}
