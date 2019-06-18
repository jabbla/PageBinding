interface eventEmitter {
    addListener(listener: Function): void
}

declare interface chrome {
    storage: {
        sync: {
            get(keylist: string [], callback: Function):void
        }
    }
    commands: {
        onCommand: eventEmitter,
        getAll(callback: Function): void
    }
    onStartup: eventEmitter
    runtime: {
        onMessage: eventEmitter,
        onStartup: eventEmitter
    }
    tabs: {
        query(options: any, callback: Function): void,
        sendMessage(tabId: string | number, message: any, callback?: Function): void
    }
}

declare const chrome: chrome