import { Message, Routers, Router } from '../interfaces';
import create from './create';

const routers: Routers = {
    create
};

export default function (message: Message) {
    const routeFn = routers[message.data.path];
    routeFn(message.data.payload);
}