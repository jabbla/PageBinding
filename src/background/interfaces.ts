export interface Message {
    data: {
        path: string,
        payload: any
    }
};

export type Router = (payload: any) => void;

export interface Routers {
    [path: string]: Router
};