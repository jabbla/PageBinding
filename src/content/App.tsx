import React, { useState, useEffect, useRef } from 'react';
import { Table, Modal, Form, Input, Divider, message } from 'antd';
import { getList, creatBinding, deleteBinding, modifyBinding } from './API';
import { tableColumns } from './config';
import { MESSAGE_ACTIONS } from '../config';
import bindKeyboard, { unbindKeyboard, bindSingleKeyboard } from './bindKeyboard';
import root from "react-shadow";
import * as R from 'ramda';

const antdStyles = require('antd/dist/antd.css');
const styles = require("./app.scss");

function useModalVisible(){
    const [visible, setVisible] = useState(false);

    const onCancelModal = () => {
        setVisible(false);
    };

    return { visible, onCancelModal, setVisible };
}

function useChromeCommandListen(callback: Function){
    let chromeMsgInitialed = useRef(false);
    
    useEffect(() => {
        if(chromeMsgInitialed.current){
            return;
        }
        chrome.runtime.onMessage.addListener((req: any) => {
            callback(req);
        });

        chromeMsgInitialed.current = true;
    });
}

function ViewModal(options: any) {
    const { rootElement: modalContainer } = options;
    let [data, setData] = useState([]);
    let { onCancelModal, setVisible, visible } = useModalVisible();

    const setList = () => {
        return getList().then((res: Binding[]) => {
            setData(res);
            bindKeyboard(res);
        });
    };

    useChromeCommandListen((req: any) => {
        if(req.type === MESSAGE_ACTIONS.VIEW_BIND.type){
            setList().then(() => {
                setVisible(true);
            });
        }
    });

    const deleteRow = (index: number) => () => {
        deleteBinding(data[index]).then(() => {
            unbindKeyboard(data[index]);
            setData(data.filter((item, index1) => index1 !== index));
            message.success('删除成功');
        });
    };

    const editRow = (index: number) => () => setData(
        R.adjust(
            index,
            (item) => R.pipe(
                R.assoc('shortcut_edit_value', item.shortcut),
                R.assoc('name_edit_value', item.name),
                R.assoc('url_edit_value', item.url),
                R.assoc('_editable', true)
            )(item),
            data
        )
    );

    const cancelEdit = (index: number) => () => setData(R.adjust(
        index,
        R.assoc('_editable', false),
        data
    ));

    const saveEdit = (index: number) => () => {
        const newData = R.adjust(
            index,
            item => R.pipe(
                R.assoc('shortcut', item.shortcut_edit_value),
                R.assoc('name', item.name_edit_value),
                R.assoc('url', item.url_edit_value),
                R.assoc('_editable', false),
            )(item),
            data
        );

        modifyBinding(data[index], newData[index]);
        bindSingleKeyboard(newData[index]);
        unbindKeyboard(data[index]);
        setData(newData);
        message.success('保存成功');
    };

    const changeFieldValue = (column: any, index: number) => (e: any) => setData(R.adjust(
        index,
        R.assoc(`${column.dataIndex}_edit_value`, e.target.value),
        data
    ));;

    tableColumns.forEach(column => {
        if(column.editable){
            (column as any).render = (value: any, row: any, index: number) => {
                return (
                    <div>
                        {row._editable?  <Input value={row[`${column.dataIndex}_edit_value`]} onChange={changeFieldValue(column, index)}/> : <span>{value}</span>}
                    </div>
                );
            };
        }
    });

    (tableColumns[tableColumns.length - 1] as any).render = (value: any, row: any, index: number) => {
        return (
            <div>
                <a onClick={deleteRow(index)}>删除</a>
                <Divider type="vertical"/>
                {
                    row._editable? 
                    (
                        <span>
                            <a onClick={saveEdit(index)}>保存</a>
                            <Divider type="vertical"/>
                            <a onClick={cancelEdit(index)}>取消</a>
                        </span>
                    ) :
                    <a onClick={editRow(index)}>编辑</a>
                }
            </div>
        );
    };

    /**
     * 在每次重新渲染的时候获取数据
     */
    useEffect(() => {
        setList();
    }, [data.length]);

    const getContainer = () => {
        return modalContainer.current;
    };

    return (
        <Modal
            className="m-shortcut-list-modal"
            title="PageBinding 快捷键一览"
            getContainer={getContainer}
            footer={null}
            visible={visible}
            onCancel={onCancelModal}
            width={670}
        >
            <Table
                className="m-shortcut-list"
                pagination={{hideOnSinglePage: true}}
                columns={tableColumns}
                dataSource={data}
            />
        </Modal>
    );
}

function NewModal(options: any) {
    const { rootElement: modalContainer } = options;
    let { onCancelModal, setVisible, visible } = useModalVisible();
    const [url, setUrl] = useState('');
    const [shortcut, setShortCut] = useState('');
    const [name, setName] = useState('');

    useChromeCommandListen((req: any) => {
        if(req.type === MESSAGE_ACTIONS.NEW_BIND.type){
            setVisible(true);
        }
    });

    const formItemLayout = {
        labelCol: {
            span: 5
        },
        wrapperCol: {
            span: 19
        }
    };

    const onConfirmNew = () => {
        const info = { url, name, shortcut };
        creatBinding(info).then(() => {
            setVisible(false);
            bindSingleKeyboard(info);
            resetModal();
            message.success('创建成功');
        });
    };

    const resetModal = () => {
        setUrl('');
        setShortCut('');
        setName('');
    };

    const makeOnChange = (field: any) => (e: any) => {
        if(field === 'Url'){
            setUrl(e.target.value);
        }
        if(field === 'ShortCut'){
            setShortCut(e.target.value);
        }
        if(field === 'Name'){
            setName(e.target.value);
        }
    };

    const getContainer = () => {
        return modalContainer.current;
    };

    return (
        <Modal
            visible={visible}
            onCancel={onCancelModal}
            onOk={onConfirmNew}
            getContainer={getContainer}
            title="新建Binding"
            okText="确定"
            cancelText="取消"
        >
            <Form {...formItemLayout}>
                <Form.Item label="网站Url">
                    <Input
                        value={url}
                        placeholder="请输入网址" 
                        onChange={makeOnChange('Url')}
                    />
                </Form.Item>
                <Form.Item label="快捷键组合">
                    <Input
                        placeholder="请输入快捷键组合"
                        value={shortcut}
                        onChange={makeOnChange('ShortCut')}
                    />
                </Form.Item>
                <Form.Item label="名称">
                    <Input
                        placeholder="请输入Binding名称" 
                        value={name}
                        onChange={makeOnChange('Name')}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}

function App(props: any) {
    const rootElement = useRef(null);
    const emptyEventHandler = () => {};

    message.config({
        getContainer: () => rootElement.current
    });

    return (
        <root.div className="m-app">
            <div
                className="m-app-content"
                onClick={emptyEventHandler}
                ref={rootElement}
                onChange={emptyEventHandler}
            >
                {ViewModal({rootElement})}
                {NewModal({rootElement})}
            </div>
            <style type="text/css">{styles}</style>
            <style type="text/css">{antdStyles}</style>
        </root.div>
    );
}

export default App;