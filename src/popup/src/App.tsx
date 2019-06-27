import React from 'react';
import { Button } from 'antd';
import { MESSAGE_ACTIONS } from '../../config';
import { sendMessageToCurrentTab } from '../../utils/index';
import './App.css';

const App: React.FC = () => {
    const onNew = () => {
        sendMessageToCurrentTab(MESSAGE_ACTIONS.NEW_BIND);
    };

    const onView = () => {
        sendMessageToCurrentTab(MESSAGE_ACTIONS.VIEW_BIND);
    };

    return (
        <div className="App">
            <Button
                icon="plus-circle"
                className="u-menu-option"
                type="link"
                onClick={onNew}
                block
            >
                新建
            </Button>
            <Button
                icon="ordered-list"
                className="u-menu-option"
                type="link"
                onClick={onView}
                block
            >
                查看
            </Button>
            <Button
                icon="question-circle"
                className="u-menu-option"
                type="link"
                block
            >
                帮助
            </Button>
        </div>
    );
}

export default App;
