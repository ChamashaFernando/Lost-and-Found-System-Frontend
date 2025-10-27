// import axios from "axios";

// const CLAIM_API_URL = "http://172.20.10.3:8096/api/claims";

// export const createClaim = async (claimData, token) => {
//   try {
//     const response = await axios.post(CLAIM_API_URL, claimData, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // ✅ send token
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(
//       "API createClaim error:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };


// // Get claims by item
// export const getClaimsByItem = async (itemId, token) => {
//   try {
//     const response = await axios.get(`${CLAIM_API_URL}/item/${itemId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (err) {
//     console.error('❌ Load claims error', err.response?.data || err.message);
//     throw err;
//   }
// };

// // Approve claim (admin)
// export const approveClaim = async (claimId, token) => {
//   try {
//     const response = await axios.put(`${CLAIM_API_URL}/approve/${claimId}`, null, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (err) {
//     console.error('❌ Approve claim error', err.response?.data || err.message);
//     throw err;
//   }
// };



import axios from "axios";

const CLAIM_API_URL = "http://172.20.10.3:8096/api/claims";

// ✅ Create a new claim
export const createClaim = async (claimData, token) => {
  try {
    const response = await axios.post(CLAIM_API_URL, claimData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ send token
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ API createClaim error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Get claims by item
export const getClaimsByItem = async (itemId, token) => {
  try {
    const response = await axios.get(`${CLAIM_API_URL}/item/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("❌ Load claims error:", err.response?.data || err.message);
    throw err;
  }
};

// ✅ Approve claim (admin or student)
export const approveClaim = async (claimId, token) => {
  try {
    const response = await axios.put(`${CLAIM_API_URL}/${claimId}/approve`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("❌ Approve claim error:", err.response?.data || err.message);
    throw err;
  }
};

