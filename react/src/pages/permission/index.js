import React from 'react'
import {Card, Button, Form, Input, Select, Tree, Transfer, Modal,Table,Divider} from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/utils'
import {getUserInfo} from '../../utils/data'
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
export default class Order extends React.Component{

    state = {
        selectedRowKeys: [], // Check here to configure the default column
        selectedRows:[]
    };

    componentWillMount(){
        this.requestRealList();
        this.getMenu();
    }

    getMenu=()=>{
        let _this = this;
        axios.fetch({
            url:'/web/v1/menu/getAllMenus',
            method:"post",
            data:{
            }
        }).then((res)=>{
            res.map((item, index) => {
                item.key = index;
            })
            _this.setState({
                menuConfig:res
            })
            const MenuConfig=this.state.menuConfig;
        })
    }

    params={
        pageIndex:1,
        pageSize: 10,
        t:{
            roleName:'',
            roleCode:''
        }
    }
    requestRealList=()=>{
       console.log("-------------"+JSON.stringify(getUserInfo()))
        const _this=this
        axios.fetch({
            url:'/web/v1/role/getRolesWithPages',
            method:'post',
            data:{
                ...this.params
            }
        }).then((res)=>{
            let list=res.records.map((item,i)=>{
                item.key=i;
                return item;
            })
            this.setState({
                list,
                pagination:Utils.paginationReal(res,(current,pageSize)=>{
                    _this.params.pageIndex = current;
                    if(pageSize!=null){
                        _this.params.pageSize=pageSize
                    }
                    _this.requestRealList();
                })
            })
        })
    }


    // 角色创建
    handleRole = ()=>{
        this.setState({
            isRoleVisible:true
        })
    }

    handleRoleSubmit=()=>{
        const roleInfo=this.roleForm.props.form.getFieldsValue();

        axios.fetch({
            url:'/web/v1/role/saveRole',
            method:'post',
            data:{
                ...roleInfo
            }
        }).then((res)=>{
            if(res.code=='200'){
                Modal.info({
                    title: '信息',
                    content: '添加成功'
                })
                this.setState({
                    isRoleVisible:false
                })
                this.requestRealList();
            }else{
                Modal.info({
                    title: '信息',
                    content: `{res.msg}`
                })
            }
        })

    }

    handlePermission = ()=>{
        if (this.state.selectedRowKeys==null || this.state.selectedRowKeys.length>1 || this.state.selectedRowKeys.length==0) {
            Modal.info({
                title: '信息',
                content: '请选择一个角色'
            })
            return;
        }
        this.setState({
            detailInfo: this.state.selectedRows[0]
        });
        const roleCode=this.state.selectedRows[0].roleCode;
        const _this=this
        axios.fetch({
            url:'/web/v1/menu/getMenusIdByRoleCode/'+roleCode,
            method:'get',
            data:{
            }
        }).then((res)=>{
            console.log(res)
            _this.setState({
                menuInfo:res,
                isPermVisible: true
            })
        })
    }

    // 用户授权
    handleUserAuthReal = ()=>{
        if (this.state.selectedRowKeys==null || this.state.selectedRowKeys.length>1 || this.state.selectedRowKeys.length==0) {
            Modal.info({
                title: '信息',
                content: '请选择一个角色'
            })
            return;
        }
        const roleId=this.state.selectedRows[0].roleId;
        this.getAuthUserListReal(roleId);
        this.setState({
            isUserVisible: true,
            isAuthClosed: false,
            detailInfo: this.state.selectedRows[0]
        });
    }
    getAuthUserListReal = (roleId) => {
        axios.fetch({
            url:'/web/v1/user/getUsersAndRoleUserIds/'+roleId,
            method:'get',
            data:{
            }
        }).then((res)=>{
            if(res.code=='200'){
                const userIds=res.result.userIds;
                const users=res.result.users;
                this.setState({
                    mockData:users,
                    targetKeys:userIds
                });
            }

        })
    };

    patchUserInfo = (targetKeys) => {
        this.setState({
            targetKeys: targetKeys
        });
    };

    handleUserSubmitReal = ()=>{
        const userIds = this.state.targetKeys || [];
        const roleId = this.state.detailInfo.roleId;
        axios.fetch({
            url:'/web/v1/userRole/batchInsert/'+roleId,
            method:'post',
            data: userIds
        }).then((res)=>{
            if(res.code=='200'){
                Modal.info({
                    title: '信息',
                    content: '操作成功'
                })
                this.setState({
                    isUserVisible:false
                })
                this.requestRealList();
            }
        })
    }


    onSelectChange = (selectedRowKeys,selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
        this.setState({selectedRows});
    }
    onShowSizeChange=(current, pageSize) =>{
        console.log(current, pageSize);
    }

    filterSubmit=(data)=>{
        this.params.t.roleName=data.roleName;
        this.params.t.roleCode=data.roleCode;
        this.requestRealList();
    }
    filterReset=()=>{
        this.params.t.roleName=null,
        this.params.t.roleCode=null,
        this.requestRealList();
    }
    handlePermEditSubmitReal=()=>{
        const roleId=this.state.detailInfo.roleId
        axios.fetch({
            url:'/web/v1/roleMenu/batchInsertRoleMenu/'+roleId,
            method:'post',
            data: this.state.menuInfo
        }).then((res)=>{
            if(res.code=='200'){
                Modal.info({
                    title: '信息',
                    content: '操作成功'
                })
                this.setState({
                    isPermVisible:false
                })
                this.requestRealList();
            }
        })
    }
    render(){

        const columnsReal = [
            {
                title: '角色ID',
                dataIndex: 'roleId'
            }, {
                title: '角色名称',
                dataIndex: 'roleName'
            },{
                title: '创建时间',
                dataIndex: 'createTime',
                render: Utils.formatTime
            }, {
                title: '使用状态',
                dataIndex: 'delFlag',
                render(status){
                    if (status == 1) {
                        return "停用"
                    } else {
                        return "开启"
                    }
                }
            }, {
                title: '角色码值',
                dataIndex: 'roleCode'
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
                    <FilterForm filterSubmit={this.filterSubmit} filterReset={this.filterReset}/>
                </Card>
                <Card>
                    <Button type="primary" onClick={this.handleRole}>创建角色</Button>
                    <Button type="primary" onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary" onClick={this.handleUserAuthReal}>用户授权</Button>
                </Card>           
                <div className="content-wrap">

                    <Table rowSelection={rowSelection} columns={columnsReal} dataSource={this.state.list}  pagination={this.state.pagination}/>

                </div>
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={()=>{
                        this.roleForm.props.form.resetFields();
                        this.setState({
                            isRoleVisible:false
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={(inst) => this.roleForm = inst }/>
                </Modal>
                <Modal
                       title="权限设置"
                       visible={this.state.isPermVisible}
                       width={600}
                       onOk={this.handlePermEditSubmitReal}
                       onCancel={()=>{
                           this.setState({
                               isPermVisible:false
                           })
                       }}>
                        <PermEditForm
                            wrappedComponentRef={(inst) => this.roleForm = inst }
                            detailInfo={this.state.detailInfo}
                            menuInfo={this.state.menuInfo||[]}
                            menuList={this.state.menuConfig}
                            patchMenuInfo={(checkedKeys)=>{
                                this.setState({
                                    menuInfo: checkedKeys
                                });
                            }}
                        />
                </Modal>
                <Modal
                       title="用户授权"
                       visible={this.state.isUserVisible}
                       width={800}
                       onOk={this.handleUserSubmitReal}
                       onCancel={()=>{
                           this.setState({
                               isUserVisible:false
                           })
                       }}>
                        <RoleAuthForm
                            wrappedComponentRef={(inst) => this.userAuthForm = inst }
                            isClosed={this.state.isAuthClosed}
                            detailInfo={this.state.detailInfo}
                            targetKeys={this.state.targetKeys}
                            mockData={this.state.mockData}
                            patchUserInfo={this.patchUserInfo}
                        />
                </Modal>
            </div>
        );
    }
}

// 角色创建
class RoleForm extends React.Component{

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('roleName',{
                            initialValue:''
                        })(
                            <Input type="text" placeholder="请输入角色名称"/>
                        )
                    }
                </FormItem>
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('roleCode',{
                            initialValue:''
                        })(
                            <Input type="text" placeholder="请输入角色编码"/>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('delFlag',{
                            initialValue:1
                        })(
                        <Select>
                            <Option value={0}>开启</Option>
                            <Option value={1}>关闭</Option>
                        </Select>
                    )}
                </FormItem>
            </Form>
        );
    }
}
RoleForm = Form.create({})(RoleForm);

// 设置权限
class PermEditForm extends React.Component {
    state = {};
    // 设置选中的节点，通过父组件方法再传递回来
    componentWillMount(){
        this.setState({
            checkedKeys:this.props.menuInfo
        })
    }
    state = {
        expandedKeys: ['1', '2'],
        autoExpandParent: true,
        checkedKeys: ['1'],
        selectedKeys: [],
        isButtonVisible:false
    }
    onCheck = (checkedKeys) => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
        this.props.patchMenuInfo(checkedKeys);
    }
    onSelect = (selectedKeys, info) => {
        console.log('onSelect', selectedKeys,info);
        console.log(JSON.stringify(this.state.selectedKeys))
        let selectKey=[];
        if(selectedKeys==null || selectedKeys.length==0){
            selectKey.push(this.state.selectedKeys[0]);
            this.setState({
                selectedKeys:selectKey
            })
        }else{
            selectKey.push(selectedKeys[0]);
            this.setState({
                selectedKeys
            })
        }

        console.log(selectKey)
        this.getButtons(selectKey[0],this.props.detailInfo.roleId)

        this.setState({
            isButtonVisible:true
        })
    }

    getButtons=(parentId,roleId)=>{
        axios.fetch({
            url:'/web/v1/menu/findButtonByRole/'+parentId+'/'+roleId,
            method:'get',
            data: {}
        }).then((res)=>{
            if(res.code=='200'){
                this.setState({
                    buttonList:res.result,
                })
            }
        })
    }

    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    handleButtonStart=(record)=>{
        const roleId=this.props.detailInfo.roleId;
        const buttonId=record.key;
        const selectKey=this.state.selectedKeys[0]
        axios.fetch({
            url:'/web/v1/roleMenu/startButton/'+roleId+'/'+buttonId,
            method:'post',
            data: {}
        }).then((res)=>{
            if(res.code=='200'){
                Modal.info({
                    title: '信息',
                    content: '操作成功'
                })
                this.getButtons(selectKey,roleId);
            }
        })
    }
    handleButtonStop=(record)=>{
        const roleId=this.props.detailInfo.roleId;
        const buttonId=record.key;
        const selectKey=this.state.selectedKeys[0]
        axios.fetch({
            url:'/web/v1/roleMenu/endButton/'+roleId+'/'+buttonId,
            method:'post',
            data: {}
        }).then((res)=>{
            if(res.code=='200'){
                Modal.info({
                    title: '信息',
                    content: '操作成功'
                })
                this.getButtons(selectKey,roleId);
            }
        })
    }
    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children && item.children.length>0) {
                return (
                    <TreeNode title={item.name} key={item.id+''}  className="op-role-tree">
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            } else if (item.btnList) {
                return (
                    <TreeNode title={item.title} key={item.id+''}  className="op-role-tree">
                        { this.renderBtnTreedNode(item) }
                    </TreeNode>
                );
            }
            return <TreeNode title={item.name} key={item.id+''} />;
        });
    };

    renderBtnTreedNode = (menu,parentKey='')=> {
        const btnTreeNode = []
        menu.btnList.forEach((item)=> {
            console.log(parentKey+'-btn-'+item.key);
            btnTreeNode.push(<TreeNode title={item.title} key={parentKey+'-btn-'+item.key} className="op-role-tree"/>);
        })
        return btnTreeNode;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 18}
        };
        const columnsReal = [
            {
                title: '按钮名称',
                dataIndex: 'buttonName'
            },{
                title: '按钮状态',
                dataIndex: 'type',
                render(status){
                    if (status == 1) {
                        return "停用"
                    } else {
                        return "开启"
                    }
                }
            },{
                 title: 'Action',
                 dataIndex: '',
                 key: 'x',
                 render: (text,record) =>  <span><Button type="primary" onClick={()=>this.handleButtonStart(record)}>启用</Button><Divider type="vertical" /><Button type="warning" onClick={()=>this.handleButtonStop(record)}>停用</Button></span>
             }
        ];
        const detail_info = this.props.detailInfo;
        const checkedKeys = this.props.menuInfo
        const menuList=this.props.menuList
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称：" {...formItemLayout}>
                    <Input disabled maxLength="8" placeholder={detail_info.roleName}/>
                </FormItem>
                <FormItem label="状态：" {...formItemLayout}>
                    {getFieldDecorator('status',{
                        initialValue: detail_info.delFlag
                    })(
                        <Select style={{ width: 80}}
                                placeholder="启用"
                        >
                            <Option value="0">启用</Option>
                            <Option value="1">停用</Option>
                        </Select>
                    )}
                </FormItem>
                <Tree
                    checkable
                    onExpand={this.onExpand}
                    expandedKeys={this.state.expandedKeys}
                    autoExpandParent={this.state.autoExpandParent}
                    onCheck={this.onCheck}
                    checkedKeys={this.props.menuInfo}
                    onSelect={this.onSelect}
                    selectedKeys={this.state.selectedKeys}
                >
                    <TreeNode title="平台权限" key="-999999">
                        {this.renderTreeNodes(menuList)}
                    </TreeNode>
                </Tree>

                <Modal
                    title="按钮权限"
                    visible={this.state.isButtonVisible}
                    width={800}
                    onOk={()=>{
                        this.setState({
                            isButtonVisible:false
                        })
                    }}
                    onCancel={()=>{
                        this.setState({
                            isButtonVisible:false
                        })
                    }}>

                    <Table  columns={columnsReal} dataSource={this.state.buttonList}  pagination={false}/>
                </Modal>

            </Form>
        )
    }
}

PermEditForm = Form.create({})(PermEditForm);

// 用户授权
class RoleAuthForm extends React.Component {

    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
    };
    handleChange = (targetKeys) => {
        console.log(JSON.stringify(targetKeys))
        this.props.patchUserInfo(targetKeys);
    };

    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 18}
        };
        const detail_info = this.props.detailInfo;
        const targetKeys=this.props.targetKeys;
        const mockData=this.props.mockData;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称：" {...formItemLayout}>
                    <Input disabled maxLength={8} placeholder={detail_info.roleName}/>
                </FormItem>
                <FormItem label="选择用户：" {...formItemLayout}>
                    <Transfer
                        listStyle={{width: 200,height: 400}}
                        dataSource={mockData}
                        showSearch
                        titles={['待选用户', '已选用户']}
                        searchPlaceholder='输入用户名'
                        filterOption={this.filterOption}
                        targetKeys={targetKeys}
                        onChange={this.handleChange}
                        render={item => item.title}
                    />
                </FormItem>
            </Form>
        )
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm);


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
                <FormItem label="角色名称">
                    {
                        getFieldDecorator('roleName')(
                            <Input  placeholder="角色名称" />
                        )
                    }
                </FormItem>
                <FormItem label="角色码值">
                    {
                        getFieldDecorator('roleCode')(
                            <Input  placeholder="角色码值" />
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