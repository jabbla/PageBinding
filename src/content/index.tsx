/// <reference path="../global.d.ts" />
import * as React from 'react';
import * as ReactDom from 'react-dom';
import App from './App';
import './app.scss';


/**
 * 在body标签下创建一个新的节点，并设置样式
 */
const AppWraper = document.createElement('div');
AppWraper.classList.add('m-app-wrapper');
document.querySelector('body').appendChild(AppWraper);

/**
 * 将React App插入新的节点
 */
ReactDom.render(
    <App/>,
    AppWraper
);

/**
 * 监听消息
 */
chrome.runtime.onMessage.addListener((req: any) => {
    console.log(req);
});