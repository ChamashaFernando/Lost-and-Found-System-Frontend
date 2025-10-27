import axios from 'axios';

// Update this to your backend URL
const BASE_URL = "http://172.20.10.3:8096/api/found";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getReportsByUser = async (userId, token) => {
    try {
      const response = await axios.get(`${BASE_URL}/reports/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('API getReportsByUser error:', error);
      throw error;
    }
  };
// Create a new found report with token
export const createFoundReport = async (reportData, token) => {
  try {
    const response = await api.post(`/report`, reportData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



