/// <reference path="../global.d.ts" />
import * as React from 'react';
import * as ReactDom from 'react-dom';
import App from './App';

/**
 * 在body标签下创建一个新的节点，并设置样式
 */
const AppWrapper = document.createElement('div');
AppWrapper.classList.add('m-app-wrapper');

const Body = document.querySelector('body');
Body.appendChild(AppWrapper);
/**
 * 将React App插入新的节点
 */
ReactDom.render(
    <App/>,
    AppWrapper
);