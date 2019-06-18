import React, { useState, useEffect } from 'react';
import { Table, Modal, Divider, Tag } from 'antd';
import { getList } from './API';

function App() {
    let [data, setData] = useState([
        {
            keyboard: 'ctrl+k',
            name: 'github',
            url: 'https://github.com'
        }
    ]);
    let [chromeMsgInitialed, setChromeInit] = useState(false);
    let [modalVisible, setVisible] = useState(true);
    const columns = [
        {
            dataIndex: 'keyboard',
            title: '键位',
        },
        {
            dataIndex: 'name',
            title: '名称',
        },
        {
            dataIndex: 'url',
            title: '地址',
        },
        {
            dataIndex: 'action',
            title: '操作',
        }
    ];

    /**
     * 关闭弹窗
     */
    const onCancelModal = () => {
        setVisible(false);
    };

    /**
     * 初始化时，添加快捷键监听
     */
    useEffect(() => {
        chrome.runtime.onMessage.addListener((req: any) => {
            setVisible(true);
        });
        setChromeInit(true);
    }, [chromeMsgInitialed]);
    
    /**
     * 在每次重新渲染的时候获取数据
     */
    useEffect(() => {
        getList().then(setData);
    })

    return (
        <div className="m-app">
            <Modal
                className="m-shortcut-list-modal"
                title="PageBinding 快捷键一览"
                footer={null}
                visible={modalVisible}
                onCancel={onCancelModal}
            >
                <Table
                    pagination={{hideOnSinglePage: true}}
                    columns={columns}
                    dataSource={data}
                />
            </Modal>
        </div>
    );
}

export default App;