import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';
import {EnvConfig, ParsedEnvConfig, KnownEnvironment} from './config.types';

export class ConfigService {
  private readonly envConfig: ParsedEnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): ParsedEnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      DB_HOSTNAME: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_NAME: Joi.string().required(),
    });

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
}