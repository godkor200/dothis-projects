import axios from 'axios';

import { apiBaseUrl } from '@/constants/dev';

export const apiInstance = axios.create({
  baseURL: apiBaseUrl,
  // withCredentials: true,
});
