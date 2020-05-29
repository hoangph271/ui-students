import { toast } from 'react-toastify'

const API_ROOT = 'https://rest-students.herokuapp.com'
// const API_ROOT = "http://localhost:8080";

const _fetchApi = async ({ url, method = 'GET', body, headers = {} }) => {
  const res = await fetch(`${API_ROOT}${url}`, {
    method,
    ...(body && { body }),
    ...(headers && { headers })
  }).catch(e => {
    toast.error(e.message)
    throw e
  })

  return res
}

export const getApi = ({ url }) => _fetchApi({ url })
export const deleteApi = ({ url }) => _fetchApi({ url, method: 'DELETE' })
export const postApi = ({ url, body }) => {
  return _fetchApi({
    url,
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
