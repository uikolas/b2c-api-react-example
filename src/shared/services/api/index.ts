import apisauce from 'apisauce';
import {config} from '../../config';
import {TAccessToken} from "../../interfaces/login/index";

export const setAuthToken = (userAuth: TAccessToken) => api.setHeader('Authorization', 'Bearer ' + userAuth);
export const removeAuthToken = () => api. deleteHeader('Authorization');

const api = apisauce.create({
  baseURL: config.API_URL,
  headers: {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/json',
  }
});

export default api;
