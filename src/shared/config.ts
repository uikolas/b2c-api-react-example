export const config = {
  API_URL: process.env.API_URL ? `${process.env.API_URL}` : 'http://localhost:8080/api/',
  WEB_PATH: process.env.WEB_PATH ? `${process.env.WEB_PATH }` : '/',
};

export default config;
