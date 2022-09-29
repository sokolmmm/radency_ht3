import dotenv from 'dotenv';

interface IConfig {
  port: string;
  server: {
    baseUrl: string,
  },
}

dotenv.config();

const config: IConfig = {
  port: process.env.PORT,
  server: {
    baseUrl: process.env.BASE_API_URL,
  },
};

export default config;
