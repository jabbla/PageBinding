import React from 'react';
import { Button } from 'antd';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <Button
                icon="plus-circle"
                className="u-menu-option"
                type="link"
                block
            >
                新建
            </Button>
            <Button
                icon="ordered-list"
                className="u-menu-option"
                type="link"
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
