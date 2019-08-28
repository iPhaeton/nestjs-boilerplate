import {RoleType} from '../role/role.types';

export const getCredentials = (type: RoleType, password?: string) => ({
    name: 'Ilya',
    email: 'qqq@qqq.com',
    password,
    role: {
        type,
    },
    address: {
        line: 'Minsk',
    },
});
