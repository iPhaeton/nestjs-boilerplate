import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';
import {EnvConfig, ParsedEnvConfig, KnownEnvironment} from './config.types';

export class ConfigService {
  private readonly envConfig: ParsedEnvConfig;

  constructor(filePath: string) {
    const schema = {
      PORT: Joi.number().required(),
      DB_HOSTNAME: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_NAME: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      SALT: Joi.string().required(),
    };

    let config = {};
    try {
      config = dotenv.parse(fs.readFileSync(filePath));
    } catch (err) {
      console.log(`Cannot get variables from ${filePath}. Getting variables from process.env`);
    }

    console.log(`WARNING: Environment varibles from process.env override environment variables from ${filePath}`);
    config = Object.keys(schema).reduce((res, key) => (process.env[key] ? {...res, [key]: process.env[key]} : res), config);
    
    this.envConfig = this.validateInput(config, schema);
  }

  private validateInput(envConfig: EnvConfig, schema: any): ParsedEnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object(schema);

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get(key: string): string | number {
    return this.envConfig[key];
  }

  getEnv(): KnownEnvironment {
    return process.env.NODE_ENV as KnownEnvironment;
  }

  getPort(): number {
    return this.get('PORT') as number;
  }

  getDbHostname(): string {
    return this.get('DB_HOSTNAME') as string;
  }

  getDbPort(): number {
    return this.get('DB_PORT') as number;
  }

  getDbUsername(): string {
    return this.get('DB_USERNAME') as string;
  }

  getDbPassword(): string {
    return this.get('DB_PASSWORD') as string;
  }

  getDbName(): string {
    return this.get('DB_NAME') as string;
  }

  getJwtSecret(): string {
    return this.get('JWT_SECRET') as string;
  }

  getSalt(): string {
    return this.get('SALT') as string;
  }
}