import { Menu, Dropdown, Icon, message } from 'antd';
import React from "react";
import {Link} from 'react-router-dom'

const { SubMenu } = Menu;
const menu = (
    <Menu>
        <Menu.Item key="1"><Link to='/busHome'>用户中心</Link></Menu.Item>
        <Menu.Item key="1"><Link to='/home'>控制台</Link></Menu.Item>
        <Menu.Item key="1"><Link to='/login'>退出</Link></Menu.Item>
    </Menu>
);
export default class RightContent extends React.Component{
    render() {
        return(
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link">
                    <Icon type="appstore" />  任务中心 <Icon type="down" />
                </a>
            </Dropdown>
        )
    }
}

