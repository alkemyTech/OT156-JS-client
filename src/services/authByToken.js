import axios from "axios";

export async function getUserByToken() {
  const token = window.localStorage.getItem("token");
  let response = await axios.get('http://localhost:3000/auth/me', {
    headers: { Authorization: `${token}` },
  });
  return response.data;
}