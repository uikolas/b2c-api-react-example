import apisauce from 'apisauce';
import {config} from '../../config';

const api = apisauce.create({
  baseURL: config.API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export default api;
