import b from './b';
import Router from './routers/index';

chorme.runtime.onMessage.addListener((message: any, callback: Function) => {
    Router(message);
});