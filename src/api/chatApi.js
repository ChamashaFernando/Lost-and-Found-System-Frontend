

import axios from "axios";

const BASE_URL = "http://172.20.10.3:8096/api/chat";

// Chat session create කිරීම
export const createChatSession = async (user1Id, user2Id, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/session`, { user1Id, user2Id, verified: true }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data; // session object return වෙනවා
  } catch (error) {
    console.error("Create Session Error:", error);
    throw error;
  }
};

// Message send කිරීම
export const sendChatMessage = async (content, senderId, chatSessionId, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/message`, {
      content,
      senderId,
      chatSessionId,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Send Message Error:", error);
    throw error;
  }
};

// Messages fetch කිරීම
export const getChatMessages = async (chatSessionId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/session/${chatSessionId}/messages`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Get Messages Error:", error);
    throw error;
  }
};


