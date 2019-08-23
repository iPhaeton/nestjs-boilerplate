export interface EnvConfig {
    [key: string]: string;
}

export interface ParsedEnvConfig {
    [key: string]: string | number;
}

export type KnownEnvironment = 'local' | 'test' | 'development' | 'production';