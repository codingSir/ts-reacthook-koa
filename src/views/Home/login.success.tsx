import React, {useState} from 'react'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {tokenMange} from "@src/services/token-manage";
import {RootDispatch} from "@src/store";
import {useDispatch} from "react-redux";

export default function LoginSuccess(props) {

    const [visible,setVisible] = useState(false);
    const dispatch:RootDispatch = useDispatch();

    const username = tokenMange.getToken()['username'];

    function handleMenuClick(event:any) {

        const type = event.key;

        if(type === 'loginOut'){
            tokenMange.clearToken();
            dispatch.global.setTokenStatus(false);
            props.history.push('/home')
        }
    }
    const menu = (
        <Menu onClick={(e) => handleMenuClick(e)}>
            <Menu.Item key="loginOut">退出登陆</Menu.Item>
        </Menu>
    );

    return(
        <Dropdown
            overlay={menu}
            onVisibleChange={() => setVisible(!visible)}
            visible={visible}
        >
            <span onClick={e => e.preventDefault()} style={{cursor:'pointer'}}>
                {username} <DownOutlined />
            </span>
        </Dropdown>
    )
}