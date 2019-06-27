/// <reference path="../global.d.ts" />

export const sendMessageToCurrentTab = (message: Message) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs: any[]) => {
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
};

export const sendMessageToBackground = (message: Message) => {
    chrome.runtime.sendMessage(message, () => {});
};