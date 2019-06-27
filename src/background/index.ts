/// <reference path="../global.d.ts" />
import { MESSAGE_ACTIONS } from '../config';
import { sendMessageToCurrentTab } from '../utils/index';

/**
 * 监听快捷键
 */
chrome.commands.onCommand.addListener((command: any) => {
    sendMessageToCurrentTab(MESSAGE_ACTIONS.VIEW_BIND);
});