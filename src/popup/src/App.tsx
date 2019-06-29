import React from 'react';
import { Button } from './components/button';
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

    const onHelp = () => {
        console.log('help');
    };
    return (    
        <div className="App">
            <Button
                className="u-menu-option"
                onClick={onNew}
            >
                新 建
            </Button>
            <Button
                className="u-menu-option"
                onClick={onView}
            >
                查 看
            </Button>
            <Button
                className="u-menu-option"
                onClick={onHelp}
            >
                帮 助
            </Button>
        </div>
    );
}

export default App;
