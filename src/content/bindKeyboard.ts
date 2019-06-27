import keyboard, { Callback } from 'keyboardjs';

interface KeyboardMap {
    [shortcut: string]: Callback
};

const keyboardMap: KeyboardMap = {};

function makeListener(info: Binding) {
    return keyboardMap[info.name] = () => {
        window.open(info.url);
    };
}

const bindKeyboard = (infos: Binding[]) => {
    infos.forEach(info => {
        unbindKeyboard(info)
        keyboard.bind(info.shortcut, makeListener(info));
    });
};

export const bindSingleKeyboard = (info: Binding) => {
    unbindKeyboard(info);
    keyboard.bind(info.shortcut, makeListener(info));
};

export const unbindKeyboard = (info: Binding) => {
    keyboard.unbind(info.shortcut, keyboardMap[info.name]);
    delete keyboardMap[info.name];
};

export default bindKeyboard;
