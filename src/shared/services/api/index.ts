import apisauce from 'apisauce';
import {config} from '../../config';

const api = apisauce.create({
  baseURL: config.API_URL,
  timeout: 10000,
  headers: {
    'Cache-Control': 'no-cache',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export default api;
