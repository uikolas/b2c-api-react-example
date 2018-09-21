export const config = {
  API_PROTOCOL: process.env.API_PROTOCOL ? `${process.env.API_PROTOCOL}` : 'http',
  API_HOST: process.env.API_HOST ? `${process.env.API_HOST}` : 'localhost',
  API_PORT: process.env.API_PORT ? `${process.env.API_PORT}` : '8080',
  API_PATH: process.env.API_PATH ? `${process.env.API_PATH}` : '/api/',
  API_URL: process.env.API_URL ? `${process.env.API_URL}` : 'http://localhost:8080/api/',
  WEB_PATH: process.env.WEB_PATH ? `${process.env.WEB_PATH }` : '/'
};

export default config;
