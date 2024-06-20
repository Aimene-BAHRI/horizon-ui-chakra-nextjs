// src/app/utils/api.ts
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API_URL = 'http://127.0.0.1:8000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(`${API_URL}/token/refresh/`, {
          refresh: localStorage.getItem('refresh_token'),
        });
        localStorage.setItem('access_token', data.access);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error('Token refresh failed:', err);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post('/token/', { username, password });
    const { access, refresh } = response.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};


export const isAuthenticated = () => {
	return localStorage.getItem("access_token") !== null;
};

export const user = () => {
	return localStorage.getItem("access_token") !== null ? jwtDecode(localStorage.getItem('access_token')) : null;
};

// Add other API functions as needed

export const getOrganization = async (organizationName) => {
	try {
	  const response = await axiosInstance.get('/organizations/');
	  const organization = response.data.find(org => org.name === organizationName);
	  if (!organization) {
		throw new Error('Organization not found');
	  }
	  return organization;
	} catch (error) {
	  console.error("Fetching organization failed:", error);
	  throw error;
	}
  };
  
  export const fetchRoles = async () => {
	try {
	  const response = await axiosInstance.get('/roles/');
	  return response.data;
	} catch (error) {
	  console.error("Fetching roles failed:", error);
	  throw error;
	}
  };
  

export const getProfile = async () => {
  const response = await axiosInstance.get('/profile/');
  return response.data;
};
export const createProfile = async (profileData) => {
  const response = await axiosInstance.post('/profile/', profileData);
  return response.data;
};

export const updateProfile = async (id, profileData) => {
  const response = await axiosInstance.put(`/profile/${id}`, profileData);
  return response.data;
};

export const updateUser = async (id: number, userData: any) => {
	try {
	  const response = await axiosInstance.patch(`/users/${id}/`, userData);
	  return response.data;
	} catch (error) {
	  console.error('Update user failed:', error);
	  throw error;
	}
  };
  
