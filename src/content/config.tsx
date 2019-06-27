import * as React from 'react';
import Enum from 'enumjs';
import { Input } from 'antd';

export const tableColumns = [
    {
        dataIndex: 'shortcut',
        title: '键位',
        editable: true
    },
    {
        dataIndex: 'name',
        title: '名称',
        editable: true
    },
    {
        dataIndex: 'url',
        title: '地址',
        editable: true,
        width: 200
    },
    {
        dataIndex: 'action',
        title: '操作'
    }
];