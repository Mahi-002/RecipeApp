import axios from 'axios';

const API_URL = `http://localhost:3002/auth`

// Corrected the function name to `signIn`
export async function signIn(data) {
  try {
    const response = await axios.post(
      `${API_URL}/register`, // Corrected endpoint
      data
    );
    return response.data;
  } catch (err) {
    throw new Error(
      err?.response?.data?.message ||
        `Something went wrong! Please try again later.`
    );
  }
}
export async function login(data) {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (err) {
    throw new Error(
      err?.response?.data?.message ||
        `Something went wrong! Please try again later.`
    );
  }
}
