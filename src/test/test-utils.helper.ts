import {Injectable} from '@nestjs/common';
import {Connection} from 'typeorm';
import { RoleType } from '../role/role.types';

@Injectable()
export class TestUtils {
    constructor(private readonly connection: Connection) {}

    async getEntities() {
        const entities = [];
        (await (await this.connection).entityMetadatas).forEach(
          x => entities.push({name: x.name, tableName: `public.${x.tableName}`})
        );
        return entities.reverse();
    }

    async clearAll(entities) {
        for (const entity of entities) {
            await this.connection.query(`TRUNCATE TABLE ${entity.tableName} CASCADE;`);
        }
    }

    async givenEmptyDatabase() {
        const entities = await this.getEntities();
        await this.clearAll(entities);
    }

    async givenRoles() {
      await Promise.all(Object.values(RoleType).map(role => this.connection.query(`
        INSERT INTO role (type)
        VALUES ('${role}')
      `)))
    }

    async findAll(tableName: string) {
      return await this.connection.query(`SELECT * from ${tableName}`);
    }
}