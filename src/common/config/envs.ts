import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  HOST: string;
  MONGO_URI: string;
  MONGO_PORT: number;
  MONGO_USER: string;
  MONGO_PASS: string;
  MONGO_INITDB_DATABASE: string;
}

const envsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().required(),
    HOST: joi.string().required(),
    MONGO_URI: joi.string().required(),
    MONGO_PORT: joi.number().required(),
    MONGO_USER: joi.string().required(),
    MONGO_PASS: joi.string().required(),
    MONGO_INITDB_DATABASE: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  host: envVars.HOST,
  mongoUrl: envVars.MONGO_URI,
  mongoPort: envVars.MONGO_PORT,
  mongoUser: envVars.MONGO_USER,
  mongoPass: envVars.MONGO_PASS,
  mongoInitDbDatabase: envVars.MONGO_INITDB_DATABASE,
};
