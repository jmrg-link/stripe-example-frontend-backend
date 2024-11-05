import dotenv from 'dotenv';
dotenv.config();

const config = {
  server:{
    port: process.env.SERVER_PORT
  },
  stripe:{
    secretKey: process.env.APIKEY_STRIPE
  }
};

export { config }