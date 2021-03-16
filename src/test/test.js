import {sign} from 'jsonwebtoken';

export const test = async () => {
        var token = await sign({ foo: 'bar' }, 'shhhhh');
        console.log(token);
}