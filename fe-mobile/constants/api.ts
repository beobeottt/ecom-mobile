import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Constants from 'expo-constants';

const API_URL =
  Constants.expoConfig?.extra?.API_URL ||
  'http://192.168.1.121:3000';

console.log('API_URL =', API_URL);

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token =
      await AsyncStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error),
);

export default axiosInstance;