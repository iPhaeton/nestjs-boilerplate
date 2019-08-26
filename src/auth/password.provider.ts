import { Injectable } from "@nestjs/common";
import * as crypto from 'crypto';
import {promisify} from 'util';

const pbkdf2 = promisify(crypto.pbkdf2);
const randomBytes = promisify(crypto.randomBytes);

@Injectable()
export class PasswordProvider {
    public static async getSalt(): Promise<string> {
        const bytes = await randomBytes(32);
        return bytes.toString('hex');
    }

    public static async encryptPassword(password: string, withSalt?: string) {
        const salt = withSalt ? withSalt : await this.getSalt();
        const bytes = await pbkdf2(password, salt, 10000, 512, 'sha512');
        return {password: bytes.toString('hex'), salt};
    }

    public static async checkPassword(passwordString: string, hashedPassword: string) {
        const {password} = await this.encryptPassword(passwordString);
        return password === hashedPassword;
    }
}