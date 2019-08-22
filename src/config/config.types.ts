export interface EnvConfig {
    [key: string]: string;
}

export interface ParsedEnvConfig {
    [key: string]: string | number;
}