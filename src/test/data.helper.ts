import {RoleType} from '../role/role.types';

export const getCredentials = (type: RoleType) => ({
    name: 'Ilya',
    email: 'qqq@qqq.com',
    password: '123456789',
    role: {
        type,
    },
    address: {
        line: 'Minsk',
    },
})