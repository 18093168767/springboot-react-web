import React from 'react'
import { Card, Button, Table, Form, Input, Checkbox,Select,Radio, Icon, message, Modal, DatePicker } from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/utils'
import {getUserInfo, setUserInfo} from '../../utils/data'
import ETable from '../../components/ETable/index'
import Moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;
export default class User extends React.Component{

    state = {
        list:[],
        selectedRowKeys:[]
    }

    params = {
        pageIndex:1,
        pageSize:10,
        t:{
           username:'',
           phone:''
        }
    }

    onSelectChange = (selectedRowKeys,selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
        this.setState({selectedRows});
    }

    requestList = ()=>{
        let _this=this
        axios.fetch({
            url:'/web/v1/user/getUsersWithPage',
            method:'post',
            data:{
                ...this.params
            }
        }).then((res)=>{
            if(res.code=='200'){
                let list=res.result.records.map((item,i)=>{
                    item.key=i;
                    return item;
                })
               this.setState({
                   list:list,
                   pagination:Utils.paginationReal(res.result,(current,pageSize)=>{
                    _this.params.pageIndex = current;
                    if(pageSize!=null){
                        _this.params.pageSize=pageSize
                    }
                    _this.requestList();
                })
               })
            }
        })
    }

    componentDidMount(){
        this.requestList();
    }

    // 操作员工
    handleOperator = (type)=>{
        setUserInfo({'username':'username'})
        console.log("-------------1"+JSON.stringify(getUserInfo()))
        let _this=this
        if(type!='create' && (this.state.selectedRows==null || this.state.selectedRows.length==0 || this.state.selectedRows>1)){
            Modal.info({
                title: '信息',
                content: '请选择一个用户'
            })
            return;
        }

        if(type =='create'){
            this.setState({
                title:'创建员工',
                isVisible:true,
                type
            })
        }else if(type=="edit" || type=='detail'){
            let item = this.state.selectedRows[0];
            if(!item){
                Modal.info({
                    title: '信息',
                    content: '请选择一个用户'
                })
                return;
            }
            this.setState({
                title:type=='edit'?'编辑用户':'查看详情',
                isVisible:true,
                userInfo:item,
                type
            })
        }else if(type=="delete"){
            let item = this.state.selectedRows[0];
            if(!item){
                Modal.info({
                    title: '信息',
                    content: '请选择一个用户'
                })
                return;
            }

            confirm({
                title: '确定要删除此用户吗？',
                content: '确定要删除此用户吗？',
                onOk() {
                    axios.fetch({
                        url:'/web/v1/user/deleteUser/'+item.userId,
                        method:'post',
                        data:{

                        }
                    }).then((res)=>{
                        if(res.code =='200'){
                            _this.setState({
                                isVisible:false
                            })
                            _this.requestList();
                        }
                    })
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        }else if(type=='viewRole'){
            let item = this.state.selectedRows[0];
            axios.fetch({
                url:'/web/v1/role/getRolesByUserId/'+item.userId,
                method:'get',
                data:{

                }
            }).then((res)=>{
                if(res.code =='200'){
                    const result=res.result.map((item,i)=>{
                        item.key=i;
                        return item;
                    })
                    _this.setState({
                        roleLists:result,
                        userInfo:item,
                        isVisibleRoles:true
                    })
                }
            })
        }
    }

    handleSubmit = ()=>{
        let data = this.userForm.props.form.getFieldsValue();
        axios.fetch({
            url:'/web/v1/user/saveUser',
            method:'post',
            data:{
                ...data
            }
        }).then((res)=>{
            if(res.code =='200'){
                this.setState({
                    isVisible:false
                })
                this.requestList();
            }
        })
    }


    filterSubmit=(data)=>{
        this.params.t.username=data.username;
        this.params.t.phone=data.phone;
        this.requestList();
    }
    filterReset=()=>{
        this.params.t.username=null,
        this.params.t.phone=null,
        this.requestList();
    }

    render(){
        const columns = [{
            title: '用户号',
            dataIndex: 'userId'
          }, {
            title: '用户名',
            dataIndex: 'username'
          },{
            title: '性别',
            dataIndex: 'gender',
            render(gender){
                return gender ==1 ?'男':'女'
            }
        },
        {
            title: '账户状态',
            dataIndex: 'userStatus',
            render(userStatus){
                return {
                    '1':'启用',
                    '2':'禁用'
                }[userStatus]
            }
        }
        ,{
            title: '用户介绍',
            dataIndex: 'introduction'
          },{
            title: '邮箱',
            dataIndex: 'email',
          },{
            title: '住址',
            dataIndex: 'address'
          },{
            title: '生日',
            dataIndex: 'birthday'
          }
        ];
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            onSelection: this.onSelection
        };
        return (
            <div>
                <Card>
                    {/*<Form layout="inline">
                        <FormItem label="姓名">
                            <Input placeholder=""/>
                        </FormItem>
                        <FormItem label="手机号">
                            <Input placeholder=""/>
                        </FormItem>
                        <FormItem>
                            <Button type="primary">查 询</Button>
                        </FormItem>
                    </Form>*/}
                    <FilterForm filterSubmit={this.filterSubmit} filterReset={this.filterReset}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" icon="plus" onClick={()=>this.handleOperator('create')}>创建员工</Button>
                    <Button icon="edit" onClick={()=>this.handleOperator('edit')}>编辑员工</Button>
                    <Button onClick={()=>this.handleOperator('detail')}>员工详情</Button>
                    <Button type="danger" icon="delete" onClick={()=>this.handleOperator('delete')}>删除员工</Button>
                    <Button type="primary"  onClick={()=>this.handleOperator('viewRole')}>查看员工角色</Button>
                </Card>
                <div className="content-wrap">
                   {/* <ETable
                        columns={columns}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />*/}

                    <Table
                        columns={columns}
                        rowSelection={rowSelection}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    ></Table>
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    width={800}
                    onCancel={()=>{
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible:false,
                            userInfo:''
                        })
                    }}
                >
                    <UserForm userInfo={this.state.userInfo} type={this.state.type} wrappedComponentRef={(inst) => this.userForm = inst }/>
                </Modal>


                <Modal
                    title={'查看员工角色信息'}
                    visible={this.state.isVisibleRoles}
                    onOk={()=>{
                        this.setState({
                            isVisibleRoles:false,
                            userInfo:''
                        })
                    }}
                    width={600}
                    onCancel={()=>{
                        this.setState({
                            isVisibleRoles:false,
                            userInfo:''
                        })
                    }}
                >
                    <UserRoleForm userInfo={this.state.userInfo} roleLists={this.state.roleLists}/>
                </Modal>
            </div>
        );
    }
}
class UserForm extends React.Component{

    getState = (state)=>{
        return {
            '1':'启用',
            '2':'禁用'
        }[state]
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        const userInfo = this.props.userInfo || {};
        const type = this.props.type;
        return (
            <Form layout="horizontal">
                <FormItem label="用户号" {...formItemLayout} style={{display:'none'}}>
                    {
                        userInfo && type=='detail'?userInfo.userId:
                            getFieldDecorator('userId',{
                                initialValue:userInfo.userId
                            })(
                                <Input type="text"/>
                            )
                    }
                </FormItem>
                <FormItem label="姓名" {...formItemLayout}>
                    {
                        userInfo && type=='detail'?userInfo.username:
                        getFieldDecorator('username',{
                            initialValue:userInfo.username
                        })(
                            <Input type="text" placeholder="请输入姓名"/>
                        )
                    }
                </FormItem>
                <FormItem label="邮件" {...formItemLayout}>
                    {
                        userInfo && type=='detail'?userInfo.email:
                            getFieldDecorator('email',{
                                initialValue:userInfo.email
                            })(
                                <Input type="text" placeholder="请输入邮件"/>
                            )
                    }
                </FormItem>
                <FormItem label="手机号" {...formItemLayout}>
                    {
                        userInfo && type=='detail'?userInfo.phone:
                            getFieldDecorator('phone',{
                                initialValue:userInfo.phone
                            })(
                                <Input type="text" placeholder="请输入手机号"/>
                            )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        userInfo && type=='detail'?userInfo.gender==1?'男':'女':
                        getFieldDecorator('gender',{
                            initialValue:userInfo.gender=='1'?1:2
                        })(
                        <RadioGroup>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        userInfo && type=='detail'?this.getState(userInfo.userStatus):
                        getFieldDecorator('userStatus',{
                            initialValue:this.getState(userInfo.userStatus)
                        })(
                        <Select>
                            <Option value={1}>启用</Option>
                            <Option value={2}>禁用</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        userInfo && type=='detail'?userInfo.birthday:
                        getFieldDecorator('birthday',{
                            initialValue:Moment(userInfo.birthday)
                        })(
                        <DatePicker />
                    )}
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        userInfo && type=='detail'?userInfo.address:
                        getFieldDecorator('address',{
                            initialValue:userInfo.address
                        })(
                        <Input.TextArea rows={3} placeholder="请输入联系地址"/>
                    )}
                </FormItem>
            </Form>
        );
    }
}
UserForm = Form.create({})(UserForm);


class FilterForm extends React.Component{
    reset = ()=>{
        this.props.form.resetFields();
        this.props.filterReset();
    }
    handleSubmit = ()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="姓名">
                    {
                        getFieldDecorator('username')(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label="手机号码">
                    {
                        getFieldDecorator('phone')(
                            <Input  />
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}} onClick={this.handleSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);

class UserRoleForm extends React.Component{
    reset = ()=>{
        this.props.form.resetFields();
        this.props.filterReset();
    }
    handleSubmit = ()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }
    render(){
        const columns = [{
            title: '角色名称',
            dataIndex: 'roleName'
        }, {
            title: '角色代码',
            dataIndex: 'roleCode'
        }
        ];
        const { getFieldDecorator } = this.props.form;
        const userInfo=this.props.userInfo;
        const roleLists=this.props.roleLists;
        return (
            <Form layout="inline">
                <FormItem label="姓名">
                    {
                        getFieldDecorator('username',{
                            initialValue:userInfo.username
                        })(
                            <Input disabled={true}/>
                        )
                    }
                </FormItem>
                <FormItem label="手机号码">
                    {
                        getFieldDecorator('phone',{
                            initialValue:userInfo.phone
                        })(
                            <Input  disabled={true}/>
                        )
                    }
                </FormItem>

                <div style={{marginTop:'30px'}}>
                    <Table
                        columns={columns}
                        dataSource={roleLists}
                        pagination={false}
                    ></Table>
                </div>

            </Form>
        );
    }
}
UserRoleForm = Form.create({})(UserRoleForm);