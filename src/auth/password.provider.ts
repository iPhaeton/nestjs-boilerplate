import { Injectable } from "@nestjs/common";
import * as crypto from 'crypto';
import {promisify} from 'util';
import { ConfigService } from "src/config/config.service";

const pbkdf2 = promisify(crypto.pbkdf2);
const randomBytes = promisify(crypto.randomBytes);

@Injectable()
export class PasswordProvider {
    public static async encryptPassword(password: string, salt: string) {
        const bytes = await pbkdf2(password, salt, 10000, 512, 'sha512');
        return bytes.toString('hex');
    }

    public static async checkPassword(passwordString: string, hashedPassword: string, salt: string) {
        const password = await this.encryptPassword(passwordString, salt);
        return password === hashedPassword;
    }
}