import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const getCurrentUser = async (signal) => {
  const response = await api.get("/me", { signal });
  return response.data;
};

export const getFeed = async () => {
  const response = await api.get("/feed");
  return response.data;
};

export const recordSwipe = async (targetId, action) => {
  const response = await api.post("/swipe", {
    target_id: targetId,
    action,
  });

  return response.data;
};

export const getMatches = async () => {
  const response = await api.get("/matches");
  return response.data;
};

export default api;
