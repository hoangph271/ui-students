import { toast } from "react-toastify";

const API_ROOT = "https://rest-students.herokuapp.com"
// const API_ROOT = "http://localhost:8080";

const _fetchApi = async ({ url, method = "GET", body, headers = {} }) => {
  const res = await fetch(`${API_ROOT}${url}`, {
    method,
    ...(body && { body }),
    ...(headers && { headers })
  }).catch(e => {
    toast(e.message);
    throw e;
  });

  if (res.ok) {
    return res.json();
  }

  throw new Error(await res.text());
}

export const getApi = ({ url }) => _fetchApi({ url })
export const postApi = ({ url, body }) => {
  return _fetchApi({
    url,
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  });
}