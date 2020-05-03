import React from 'react'
import {Form, Input, Button} from 'antd'
import Footer from '../../components/Footer'
import './index.less'
const FormItem = Form.Item;
import axios from 'axios';
import Cookies from 'js-cookie';
import {setUserInfo,setToken} from '../../utils/data'
export default class Login extends React.Component {
    state = {};

    componentDidMount() {//每次进入登录页清除之前的登录信息
        
    }

    loginReq = (user) => {
       /* window.location.href = '/#/';*/
       let _this=this
        axios({
            method: 'post',
            url: 'http://127.0.0.1:7001/authentication/login?username='+user.username+"&password="+user.password,
            data: {
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((res)=>{
            console.log(res)
            if(res.status=='200'){
               if(res.data.status=='success'){
                   const username=res.data.msg.username;
                   const roles=res.data.msg.authorities;
                   const userInfo={
                       username:username,
                       roles:roles
                   }
                   setUserInfo(userInfo);
                   setToken(res.data.token);
                   Cookies.set('token', res.data.token,{ expires: 0.1 });
                   Cookies.set('username', username,{ expires: 0.1 });
                   Cookies.set('roles', roles,{ expires: 0.1 });
                   _this.props.history.push('/home')
               }else{
                   _this.setState({
                       errorMsg:res.data.msg,
                   })
                   setTimeout(()=>{
                       _this.setState({
                           errorMsg:''
                       })
                   },2000)
               }
            }
        });
    };

    render() {
        return (
            <div className="login-page">
                <div className="login-header">
                    <div className="logo">
                        <img src="/assets/logo-ant.svg" alt="dream21th后台管理系统"/>
                        后台管理系统
                    </div>
                </div>
                <div className="login-content-wrap">
                    <div className="login-content">
                        <div className="word">快鱼易贷 <br />引领城市新经济</div>
                        <div className="login-box" style={{borderRadius:"25px",backgroundColor:"rgba(0,0,0,0.5)"}}>
                            <div className="error-msg-wrap">
                                <div
                                    className={this.state.errorMsg?"show":""}>
                                    {this.state.errorMsg}
                                </div>
                            </div>
                            <div className="title">快鱼易贷欢迎你</div>
                            <LoginForm ref="login" loginSubmit={this.loginReq}/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

class LoginForm extends React.Component {
    state = {};

    loginSubmit = (e)=> {
        e && e.preventDefault();
        const _this = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var formValue = _this.props.form.getFieldsValue();
                _this.props.loginSubmit({
                    username: formValue.username,
                    password: formValue.password
                });
            }
        });
    };

    checkUsername = (rule, value, callback) => {
        var reg = /^\w+$/;
        if (!value) {
            callback('请输入用户名!');
        } else if (!reg.test(value)) {
            callback('用户名只允许输入英文字母');
        } else {
            callback();
        }
    };

    checkPassword = (rule, value, callback) => {
        if (!value) {
            callback('请输入密码!');
        } else {
            callback();
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        initialValue:'admin',
                        rules: [{validator: this.checkUsername}]
                    })(
                        <Input placeholder="用户名"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        initialValue:'admin',
                        rules: [{validator: this.checkPassword}]
                    })(
                        <Input type="password" placeholder="密码"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={this.loginSubmit} className="login-form-button">
                        登录
                    </Button>
                </FormItem>
            </Form>
        )
    }
}
LoginForm = Form.create({})(LoginForm);
