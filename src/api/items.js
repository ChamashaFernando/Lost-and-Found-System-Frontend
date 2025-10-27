// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://172.20.10.3:8096/api/items', // laptop IP + port
//   timeout: 5000,
// });

// // 🔹 Create new item
// export const createItem = async (itemData) => {
//   const response = await API.post('/', itemData);
//   return response.data;
// };

// // 🔹 Get item by id
// export const getItemById = async (id) => {
//   const response = await API.get(`/${id}`);
//   return response.data;
// };

// // 🔹 Get items by user
// export const getItemsByUser = async (userId) => {
//   const response = await API.get(`/user/${userId}`);
//   return response.data;
// };

// // 🔹 Search items
// export const searchItems = async (params) => {
//   const response = await API.get('/search', { params });
//   return response.data;
// };

// // 🔹 Delete item
// export const deleteItem = async (id) => {
//   const response = await API.delete(`/${id}`);
//   return response.data;
// };


import axios from "axios";

const API_URL = "http://172.20.10.3:8096/api/items";

export const createItem = async (itemData, token) => {
  try {
    const response = await axios.post(API_URL, itemData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ send token
      },
    });
    return response.data;
  } catch (error) {
    console.error("API createItem error:", error.response?.data || error.message);
    throw error;
  }
};

export const getItemsByUser = async (userId, token) => {
  const response = await axios.get(`${API_URL}/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const searchItems = async (filters, token) => {
  const response = await axios.get(`${API_URL}/search`, {
    params: filters,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
