import React from 'react';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu, saveBtnList } from './../../redux/action'
//import MenuConfig from './../../config/menuConfig1'
import axios from './../../axios/index'
//import axios from 'axios'
import './index.less'
import Utils from "../../utils/utils";
import {getUserInfo} from "../../utils/data"
import Cookies from 'js-cookie';
const SubMenu = Menu.SubMenu;
class NavLeft extends React.Component {
    state = {
        currentKey: '',
        menuConfig:[]
    }
    // 菜单点击
    handleClick = ({ item, key }) => {
        if (key == this.state.currentKey) {
            return false;
        }
        // 事件派发，自动调用reducer，通过reducer保存到store对象中
        const { dispatch } = this.props;
        dispatch(switchMenu(item.props.title));

        this.setState({
            currentKey: key
        });
        // hashHistory.push(key);
    };

    componentWillMount(){
        this.getMenu();
        //this.test();
    }

    test=()=>{
        let _this = this;
        axios.fetch({
            url:'/web/v1/menu/getAllMenus',
            method:'post',
            data:{
                userName:'userName',
                password:'password'
            }
        })
    }

    getMenu=()=>{
        let _this = this;
        const userInfo={
            username:Cookies.get("username"),
            roles:Cookies.getJSON("roles")
        }
        console.log(JSON.stringify(userInfo.roles))
        if(userInfo.username==null || userInfo.username==''){
            window.location.href = '/#/login'
            return;
        }
        let roles=[];
        for(var i=0;i<userInfo.roles.length;i++){
            roles.push(userInfo.roles[i].authority)
        }
        axios.fetch({
            url:'/web/v1/menu/getMenusByRoleCodes',
            method:'post',
            data:roles
        }).then((res)=>{
            res.map((item, index) => {
                item.key = index;
            })
            _this.setState({
                menuConfig:res
            })
            const MenuConfig=this.state.menuConfig;
            const menuTreeNode = _this.renderMenu(MenuConfig);
            _this.setState({
                menuTreeNode
            })
        }).catch((err)=>{
            window.location.href = '/#/login'
        })
    }
    // 菜单渲染
    renderMenu =(data)=>{
        return data.map((item)=>{
            if(item.children && item.children.length>0){
                return (
                    <SubMenu title={item.name} key={item.id}>
                        { this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.name} key={item.id}>
                <NavLink to={item.url}>{item.name}</NavLink>
            </Menu.Item>
        })
    }
    homeHandleClick = () => {
        const { dispatch } = this.props;
        dispatch(switchMenu('首页'));
        this.setState({
            currentKey: ""
        });
    };
    render() {
        return (
            <div>
                <NavLink to="/home" onClick={this.homeHandleClick}>
                    <div className="logo">
                        <img src="/assets/logo-ant.svg" alt=""/>
                        <h1>dream21th MS</h1>
                    </div>
                </NavLink>
                <Menu
                    onClick={this.handleClick}
                    theme="dark"
                >
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        );
    }
}
export default connect()(NavLeft)