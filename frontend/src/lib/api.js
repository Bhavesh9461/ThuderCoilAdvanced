import { axiosInstance } from "./axios.js";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const verifyEmail = async (code) => {
  const response = await axiosInstance.post("/auth/verify-email", code);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  } catch (error) {
    console.log("Error in getAuthUser API: ", error);
    return null;
  }
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axiosInstance.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPassword = async ({ token, password }) => {
  const response = await axiosInstance.post(`/auth/reset-password/${token}`, {
    password,
  });
  return response.data;
};

export const getUserFriends = async () => {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
};

export const getOutgoingFriendReqs = async () => {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
};

export const sendFriendReqs = async (userId) => {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
};

export const searchUser = async (data) => {
  const res = await axiosInstance.post("/auth/search-user", data);

  console.log("API RESPONSE:", res.data); // 👈 debug

  return res.data.users; // ✅ MUST BE ARRAY
};

// get all recommended users
export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users")
  return response.data
}

export const getFriendRequests = async () => {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
};

export const acceptFriendRequest = async (requestId) => {
  const response = await axiosInstance.put(
    `/users/friend-request/${requestId}/accept`,
  );
  return response.data;
};

// get stream token
export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token")
  return response.data
}