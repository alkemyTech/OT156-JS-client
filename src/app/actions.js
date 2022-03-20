import axios from "axios";

export function getRequest(link, stateName) {
  return async function (dispatch) {
    const token = window.localStorage.getItem("token");
    let res = await axios.get(link, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "GET_REQUEST", data: res.data, name: stateName });
  };
}

export function postRequest(link, values) {
  return async function (dispatch) {
    const token = window.localStorage.getItem("token");
    let res = await axios.post(
      link,
      { ...values, token },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({ type: "POST_REQUEST", data: res.data });
  };
}
