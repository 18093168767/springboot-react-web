import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import BusHead from './Header/index'
import Footer from "../../components/Footer";
import RightContent from "../../components/Header/rightContent";
export default class BusHome extends React.Component{
    state = {};

    componentDidMount() {//每次进入登录页清除之前的登录信息

    }
    render() {
        return (
            <div className="login-page">
                <div className="login-header">
                    <div className="logo flex">
                        <div>
                        <img src="/assets/logo-ant.svg" alt="dream21th前台页面"/>
                        用户中心
                        </div>
                        <div className="flex1">
                            <BusHead/>
                        </div>
                    </div>
                    <div style={{marginRight:"30px"}}>
                        <RightContent/>
                    </div>
                </div>
                <div className="login-content-wrap">
                    <div className="login-content">
                        <div className="word">用户中心 <br />提供更好服务</div>
                        <div className="login-box" style={{borderRadius:"25px",backgroundColor:"rgba(0,0,0,0.5)"}}>
                            <div className="error-msg-wrap">
                                <div>
                                    test
                                </div>
                            </div>
                            <div className="title">快鱼易贷欢迎你</div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}


