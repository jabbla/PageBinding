interface eventEmitter {
    addListener(listener: Function): void
}

declare module 'react-shadow';

declare module 'csstype' {
    interface Properties<T> {}
}

declare module 'antd';

declare module 'enumjs';

declare interface chrome {
    storage: {
        sync: {
            get(keylist: string [], callback: Function):void,
            set(options: Object, callback?: Function): void
        }
    }
    commands: {
        onCommand: eventEmitter,
        getAll(callback: Function): void
    }
    onStartup: eventEmitter
    runtime: {
        onMessage: eventEmitter,
        onStartup: eventEmitter,
        sendMessage(message: Message, callback: Function): void
    }
    tabs: {
        query(options: any, callback: Function): void,
        sendMessage(tabId: string | number, message: any, callback?: Function): void
    }
}

declare const chrome: chrome

declare interface Message {
    type: string,
    payload?: any
}

declare type Binding = {
    name: string,
    url: string,
    shortcut: string
};