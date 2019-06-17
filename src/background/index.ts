/// <reference path="../global.d.ts" />
import Router from './routers/index';

/**
 * 监听快捷键
 */
chrome.commands.onCommand.addListener((command: any) => {
    console.log('Command:', command); 
    chrome.tabs.query({active: true, currentWindow: true}, (tabs: any[]) => {
        chrome.tabs.sendMessage(tabs[0].id, '测试');
    });
});

/**
 * 事件监听
 */
chrome.runtime.onMessage.addListener((message: any, callback: Function) => {
    Router(message);
});