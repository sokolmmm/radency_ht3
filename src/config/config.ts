import dotenv from 'dotenv';

interface IConfig {
  port: string;
}

dotenv.config();

const config: IConfig = {
  port: process.env.PORT,
};

export default config;
