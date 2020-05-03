import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;
export default class City extends React.Component{
    state = {
        list:[],
        isShowOpenCity:false
    }
    params = {
        page:1
    }
    componentDidMount(){
        this.requestList();
    }

    // 默认请求我们的接口数据
    requestList = ()=>{
        let _this = this;
        axios.ajax({
            url: '/open_city',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            let list = res.result.item_list.map((item, index) => {
                item.key = index;
                return item;
            });
            this.setState({
                list:list,
                pagination:Utils.pagination(res,(current)=>{
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }
}