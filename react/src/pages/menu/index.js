import React from 'react'
import {Card, Button, Form, Input, Select, Tree, Transfer, Modal,Table,Divider,Row,Col} from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/utils'
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const confirm = Modal.confirm;
export default class Menu extends React.Component {

    state={
        menuConfig:[],
        menuInfo:{},
        editMenuInfo:{},
        buttonList:[],
        editButtonList:[],
        isMenuVisible:false,
        selectKey:'',
        type:''
    }
    componentWillMount(){
        this.getMenu();
    }
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
        let menuId=null;
        if(selectedKeys==null || selectedKeys.length==0){
            menuId=this.state.selectKey
        }else{
            menuId=selectedKeys[0];
            this.setState({
                selectKey:selectedKeys[0]
            })
        }
        this.getMenuById(menuId)
        this.getButtonsByParentId(menuId)

    }

    handleEdit=()=>{

        console.log(this.state.selectKey==null || ''==this.state.selectKey)
        if(this.state.selectKey==null || ''==this.state.selectKey){
            Modal.info({
                title: '信息',
                content: '请选择一条数据'
            })
            return;
        }else{
            this.setState({
                isMenuVisible:true,
                type:'edit',
                editMenuInfo:this.state.menuInfo,
                editButtonList:this.state.buttonList
            })
        }

    }

    handleAdd=()=>{
        this.setState({
            isMenuVisible:true,
            type:'add',
            editMenuInfo:{
                type:'M',
                parentId:this.state.selectKey
            },
            editButtonList:[]
        })
    }

    getMenuById=(menuId)=>{
        axios.fetch({
            url:'/web/v1/menu/getMenuById/'+menuId,
            method:'get',
            data:{
            }
        }).then((res)=>{
            if(res.code=='200'){
                this.setState({
                    menuInfo:res.result,
                    editMenuInfo:res.result
                })
            }
        })
    }
    getButtonsByParentId=(parentId)=>{
        axios.fetch({
            url:'/web/v1/menu/findButtonByParentId/'+parentId,
            method:'get',
            data:{
            }
        }).then((res)=>{
            if(res.code=='200'){
                console.log('result'+JSON.stringify(res.result))
                this.setState({
                    buttonList:res.result,
                    editButtonList:res.result
                })
            }
        })
    }
    getMenu=()=>{
        let _this = this;
        axios.fetch({
            url:'/web/v1/menu/getAllMenus',
            method:'post',
            data:{
            }
        }).then((res)=>{
            res.map((item, index) => {
                item.key = index;
            })
            _this.setState({
                menuConfig:res
            })
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

    noticeParentChange=()=>{
       this.getMenuById(this.state.selectKey);
       this.getButtonsByParentId(this.state.selectKey);
       this.setState({
           editMenuInfo:this.state.menuInfo,
           type:'edit'
           /*editButtonList:this.state.buttonList,*/
           /*isMenuVisible:false*/
       })

        console.log(this.state.editButtonList)
    }

    handleUserSubmitReal=()=>{
        const menuDetailForm=this.menuDetailForm.props.form.getFieldsValue();
        axios.fetch({
            url:'/web/v1/menu/saveMenu',
            method:'post',
            data:{
                ...menuDetailForm
            }
        }).then((res)=>{

            if(res.code=='200'){
                this.setState({
                    isMenuVisible:false
                })
               this.getMenu()
            }
        })
    }

    deleteMenu=()=>{
        if(this.state.selectKey==null || ''==this.state.selectKey){
            Modal.info({
                title: '信息',
                content: '请选择一条数据'
            })
            return;
        }
        axios.fetch({
            url:'/web/v1/menu/deleteMenuById/'+this.state.selectKey,
            method:'get',
            data:{
            }
        }).then((res)=>{
            if(res.code=='200'){
                Modal.info({
                    title: '信息',
                    content: '删除数据成功'
                })
                this.getMenu()
            }
        })

    }

    deleteMenuAndChildsById=()=>{
        if(this.state.selectKey==null || ''==this.state.selectKey){
            Modal.info({
                title: '信息',
                content: '请选择一条数据'
            })
            return;
        }
        let _this = this;
        confirm({
            title: '确认删除?',
            content: '删除该节点会连带删除下面的子节点，你确认要这样做吗？',
            onOk() {
                axios.fetch({
                    url:'/web/v1/menu/deleteMenuAndChildsById/'+_this.state.selectKey,
                    method:'get',
                    data:{
                    }
                }).then((res)=>{
                    if(res.code=='200'){
                        Modal.info({
                            title: '信息',
                            content: '删除数据成功'
                        })
                        _this.getMenu();
                        _this.setState({
                            buttonList:[],
                            menuInfo:{},
                            selectKey:''
                        })
                    }
                })
            },
            onCancel() {

            },
        });
    }

    render(){

        return(<div className="content-wrap" style={{maxHeight:600}}>
            <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                    <div className="content-wrap" style={{maxHeight:600,minHeight:600,overflow:'auto',marginTop:-1}}>
                        <Tree
                            showLine
                            defaultExpandedKeys={['-999999']}
                            onSelect={this.onSelect}
                        >
                            <TreeNode title="平台权限" key="-999999">
                                {this.renderTreeNodes(this.state.menuConfig)}
                            </TreeNode>
                        </Tree>
                    </div>
                </Col>

                <Col className="gutter-row" span={12}>
                    <div className="gutter-box" style={{maxHeight:600,minHeight:600,overflow:'auto'}}>
                        <Form>
                            <FormItem style={{textAlign:'left'}}>
                                <Button type="primary" style={{marginLeft:'30px'}} onClick={this.handleAdd}>新增</Button>
                                <Button type="warning" style={{marginLeft:'10px'}} onClick={this.handleEdit}>编辑</Button>
                                <Button type="danger" style={{marginLeft:'10px'}} onClick={this.deleteMenuAndChildsById}>删除</Button>
                            </FormItem>
                        </Form>
                        <MenuDetailForm menuInfo={this.state.menuInfo} type={this.state.type} buttonList={this.state.buttonList} wrappedComponentRef={(inst) => this.menuForm = inst }/>
                    </div>
                </Col>
            </Row>


            <Modal
                title="菜单编辑"
                visible={this.state.isMenuVisible}
                width={800}
                onOk={this.handleUserSubmitReal}
                onCancel={()=>{
                    this.menuDetailForm.props.form.resetFields();
                    this.setState({
                        isMenuVisible:false,
                        type:null,
                        editMenuInfo:{}
                    })
                }}>
                <MenuEditForm
                    wrappedComponentRef={(inst) => this.menuDetailForm = inst }
                    menuInfo={this.state.editMenuInfo}
                    type={this.state.type}
                    parentId={this.state.selectKey}
                    buttonList={this.state.editButtonList}
                    noticeParentChange={this.noticeParentChange}
                />
            </Modal>
        </div>)
    }
}



class MenuDetailForm extends React.Component{
    reset = ()=>{
        this.props.form.resetFields();
        this.props.filterReset();
    }
    handleSubmit = ()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }


    state = {
        selectedRowKeys: [], // Check here to configure the default column
        buttonList:this.props.buttonList || []
    };

    render(){
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true
        };

        const columnsReal = [
            {
                title: '按钮主键',
                width:100,
                key:'key',
                dataIndex: 'key'
            },
            {
                title: '按钮名称',
                width:100,
                key:'buttonName',
                dataIndex: 'buttonName'
            },{
                title: '按钮父节点',
                width:100,
                key:'parentId',
                dataIndex: 'parentId'
            }
        ];
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }
        const { getFieldDecorator } = this.props.form;
        const menuInfo=this.props.menuInfo || {};
        const type=this.props.type;
        const buttonList=this.props.buttonList || [];
        return (
            <Form layout="horizontal">
                <FormItem label="菜单主键" {...formItemLayout}>
                    {
                        type=='info' ||type==null ||type=='edit' ?
                        getFieldDecorator('menuId',({
                               initialValue:menuInfo.menuId
                            }))(
                            <Input disabled={true} placeholder="菜单主键" />
                        )
                        :
                        getFieldDecorator('menuId',({
                            initialValue:menuInfo.menuId
                        }))(
                        <Input  disabled={true} placeholder="菜单主键" />
                        )
                    }
                </FormItem>
                <FormItem label="菜单名称" {...formItemLayout}>
                    {
                        type=='info' ||type==null?
                        getFieldDecorator('name',({
                            initialValue:menuInfo.name
                        }))(
                            <Input disabled={true} placeholder="菜单名称" />
                        )
                        :
                        getFieldDecorator('name',({
                            initialValue:menuInfo.name
                        }))(
                        <Input disabled={true} placeholder="菜单名称" />
                        )
                    }
                </FormItem>
                <FormItem label="菜单url" {...formItemLayout}>
                    {
                        type=='info' ||type==null ?
                        getFieldDecorator('url',({
                            initialValue:menuInfo.url
                        }))(
                            <Input disabled={true} placeholder="菜单url" />
                        )
                        :
                        getFieldDecorator('url',({
                            initialValue:menuInfo.url
                        }))(
                            <Input disabled={true}  placeholder="菜单url" />
                        )
                    }
                </FormItem>
                <FormItem label="菜单父节点" {...formItemLayout}>
                    {
                        type=='info' ||type==null ||type=='add' ?
                        getFieldDecorator('parentId',({
                            initialValue:menuInfo.parentId
                        }))(
                            <Input disabled={true} placeholder="菜单父节点" />
                        )
                        :
                        getFieldDecorator('parentId',({
                            initialValue:menuInfo.parentId
                        }))(
                            <Input disabled={true} placeholder="菜单父节点" />
                        )
                    }
                </FormItem>
                <FormItem label="菜单类型" {...formItemLayout}>
                    {
                        type=='info'||type==null ||type=='edit'?
                        getFieldDecorator('type',({
                            initialValue:menuInfo.type
                        }))(
                            <Select disabled>
                                <Option value="M">菜单</Option>
                                <Option value="B">按钮</Option>
                            </Select>
                        )
                        :
                        getFieldDecorator('type',({
                            initialValue:menuInfo.type
                        }))(
                            <Select disabled>
                                <Option value="M">菜单</Option>
                                <Option value="B">按钮</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <Table bordered={true} size={'small'} columns={columnsReal} dataSource={buttonList}  pagination={false}/>

                <Modal
                    title={this.state.buttonTitle}
                    visible={this.state.buttonVisible}
                    onOk={this.handleButtonSubmit}
                    width={800}
                    onCancel={()=>{
                        this.ButtonForm.props.form.resetFields();
                        this.setState({
                            buttonVisible:false,
                            buttonInfo:''
                        })
                    }}
                >
                    <ButtonForm buttonInfo={this.state.buttonInfo} buttonType={this.state.buttonType} wrappedComponentRef={(inst) => this.ButtonForm = inst }/>
                </Modal>
            </Form>
        );
    }
}
MenuDetailForm = Form.create({})(MenuDetailForm);



class ButtonForm extends React.Component{

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        const buttonInfo=this.props.buttonInfo || {};
        const type = this.props.buttonType;
        return (
            <Form layout="horizontal">
                <FormItem label="菜单主键" {...formItemLayout}>
                    {
                        type=='info' ||type==null?
                            getFieldDecorator('menuId',({
                                initialValue:buttonInfo.menuId
                            }))(
                                <Input disabled={true} placeholder="菜单主键" />
                            )
                            :
                            getFieldDecorator('menuId',({
                                initialValue:buttonInfo.menuId
                            }))(
                                <Input disabled={true} placeholder="菜单主键" />
                            )
                    }
                </FormItem>
                <FormItem label="菜单名称" {...formItemLayout}>
                    {
                        type=='info' ||type==null?
                            getFieldDecorator('name',({
                                initialValue:buttonInfo.name
                            }))(
                                <Input disabled={true} placeholder="菜单名称" />
                            )
                            :
                            getFieldDecorator('name',({
                                initialValue:buttonInfo.name
                            }))(
                                <Input  placeholder="菜单名称" />
                            )
                    }
                </FormItem>
                <FormItem label="菜单url" {...formItemLayout}>
                    {
                        type=='info' ||type==null ?
                            getFieldDecorator('url',({
                                initialValue:buttonInfo.url
                            }))(
                                <Input disabled={true} placeholder="菜单url" />
                            )
                            :
                            getFieldDecorator('url',({
                                initialValue:buttonInfo.url
                            }))(
                                <Input  placeholder="菜单url" />
                            )
                    }
                </FormItem>
                <FormItem label="菜单父节点" {...formItemLayout}>
                    {
                        type=='info' ||type==null ?
                            getFieldDecorator('parentId',({
                                initialValue:buttonInfo.parentId
                            }))(
                                <Input disabled={true} placeholder="菜单父节点" />
                            )
                            :
                            getFieldDecorator('parentId',({
                                initialValue:buttonInfo.parentId
                            }))(
                                <Input  disabled={true} placeholder="菜单父节点" />
                            )
                    }
                </FormItem>
                <FormItem label="菜单类型" {...formItemLayout}>
                    {
                        type=='info'||type==null?
                            getFieldDecorator('type',({
                                initialValue:buttonInfo.type
                            }))(
                                <Select disabled>
                                    <Option value="M">菜单</Option>
                                    <Option value="B">按钮</Option>
                                </Select>
                            )
                            :
                            getFieldDecorator('type',({
                                initialValue:buttonInfo.type
                            }))(
                                <Select disabled>
                                    <Option value="M">菜单</Option>
                                    <Option value="B">按钮</Option>
                                </Select>
                            )
                    }
                </FormItem>
            </Form>
        );
    }
}
ButtonForm = Form.create({})(ButtonForm);

class MenuEditForm extends React.Component{

    reset = ()=>{
        this.props.form.resetFields();
        this.props.filterReset();
    }
    handleSubmit = ()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    noticeParentChange=()=>{
        this.props.noticeParentChange();
        this.setState({
            buttonVisible:false
        })
    }

    state = {
        selectedRowKeys: [], // Check here to configure the default column
        buttonList:this.props.buttonList || []
    };

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    getMenuById=(menuId)=>{
        axios.fetch({
            url:'/web/v1/menu/getMenuById/'+menuId,
            method:'get',
            data:{
            }
        }).then((res)=>{
            if(res.code=='200'){
                this.setState({
                    buttonInfo:res.result
                })
            }
        })
    }

    deleteMenuById=(menuId)=>{
        axios.fetch({
            url:'/web/v1/menu/deleteMenuById/'+menuId,
            method:'get',
            data:{
            }
        }).then((res)=>{
            if(res.code=='200'){
                this.setState({
                    selectedRowKeys:[]
                })
                this.noticeParentChange()
            }
        })
    }

    handleButtonAdd=()=>{
        this.setState({
            buttonInfo:{
                parentId:this.props.parentId,
                type:'B'
            },
            buttonVisible:true,
            buttonType:'add'
        })

    }
    handleButtonUpdate=()=>{
        const key=this.state.selectedRowKeys;
        if(key==null || key.length==0|| key.length>1){
            Modal.info({
                title: '信息',
                content: '请选择一条数据'
            })
            return;
        }

        this.getMenuById(key[0])
        this.setState({
            buttonTitle:'按钮修改',
            buttonVisible:true,
            buttonType:'edit'
        })

    }
    handleButtonDel=()=>{
        const key=this.state.selectedRowKeys;
        if(key==null || key.length==0|| key.length>1){
            Modal.info({
                title: '信息',
                content: '请选择一条数据'
            })
            return;
        }

        this.deleteMenuById(key[0])
    }

    handleButtonSubmit=()=>{
        const key=this.state.selectedRowKeys;
        const ButtonForm=this.ButtonForm.props.form.getFieldsValue();
        axios.fetch({
            url:'/web/v1/menu/saveMenu',
            method:'post',
            data:{
                ...ButtonForm
            }
        }).then((res)=>{

            if(res.code=='200'){
                this.noticeParentChange();
                this.ButtonForm.props.form.resetFields();
            }
        })

    }
    render(){
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true
        };

        const columnsReal = [
            {
                title: '按钮主键',
                dataIndex: 'key'
            },
            {
                title: '按钮名称',
                dataIndex: 'buttonName'
            },{
                title: '按钮父节点',
                dataIndex: 'parentId'
            }/*,{
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: (text,record) =>  <span><Button disabled={type=='info'||type==null} type="primary" onClick={()=>this.handleButtonStart(record)}>启用</Button><Divider type="vertical" /><Button disabled={type=='info'||type==null} type="warning" onClick={()=>this.handleButtonStop(record)}>停用</Button></span>
            }*/
        ];
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }
        const { getFieldDecorator } = this.props.form;
        const menuId=this.props.parentId;

        const menuInfo=this.props.menuInfo || {};
        const type=this.props.type;
        const buttonList=this.props.buttonList || [];
        return (
            <Form layout="horizontal">
                <FormItem label="菜单主键" {...formItemLayout}>
                    {
                        type=='info' ||type==null ||type=='edit' ?
                            getFieldDecorator('menuId',({
                                initialValue:menuInfo.menuId
                            }))(
                                <Input disabled={true} placeholder="菜单主键" />
                            )
                            :
                            getFieldDecorator('menuId',({
                                initialValue:menuInfo.menuId
                            }))(
                                <Input  disabled={true} placeholder="菜单主键" />
                            )
                    }
                </FormItem>
                <FormItem label="菜单名称" {...formItemLayout}>
                    {
                        type=='info' ||type==null?
                            getFieldDecorator('name',({
                                initialValue:menuInfo.name
                            }))(
                                <Input disabled={true} placeholder="菜单名称" />
                            )
                            :
                            getFieldDecorator('name',({
                                initialValue:menuInfo.name
                            }))(
                                <Input  placeholder="菜单名称" />
                            )
                    }
                </FormItem>
                <FormItem label="菜单url" {...formItemLayout}>
                    {
                        type=='info' ||type==null ?
                            getFieldDecorator('url',({
                                initialValue:menuInfo.url
                            }))(
                                <Input disabled={true} placeholder="菜单url" />
                            )
                            :
                            getFieldDecorator('url',({
                                initialValue:menuInfo.url
                            }))(
                                <Input  placeholder="菜单url" />
                            )
                    }
                </FormItem>
                <FormItem label="菜单父节点" {...formItemLayout}>
                    {
                        type=='info' ||type==null?
                            getFieldDecorator('parentId',({
                                initialValue:menuInfo.parentId
                            }))(
                                <Input disabled={true} placeholder="菜单父节点" />
                            )
                            :
                            getFieldDecorator('parentId',({
                                initialValue:menuInfo.parentId
                            }))(
                                <Input  placeholder="菜单父节点" />
                            )
                    }
                </FormItem>
                <FormItem label="菜单类型" {...formItemLayout}>
                    {
                        type=='info'||type==null ||type=='edit'?
                            getFieldDecorator('type',({
                                initialValue:menuInfo.type
                            }))(
                                <Select disabled>
                                    <Option value="M">菜单</Option>
                                    <Option value="B">按钮</Option>
                                </Select>
                            )
                            :
                            getFieldDecorator('type',({
                                initialValue:menuInfo.type
                            }))(
                                <Select disabled>
                                    <Option value="M">菜单</Option>
                                    <Option value="B">按钮</Option>
                                </Select>
                            )
                    }
                </FormItem>
                {/*<FormItem>
                    <Button type="primary" style={{margin:'0 20px'}} onClick={this.handleSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>*/}
                <div style={{display:type=='edit'?'block':'none'}}>
                    <span style={{display:'block'}}>
                        <Button type="primary" style={{margin:'0 20px'}} onClick={this.handleButtonAdd}>新增</Button>
                        <Button type="primary" style={{margin:'0 20px'}} onClick={this.handleButtonUpdate}>修改</Button>
                        <Button type="primary" style={{margin:'0 20px'}} onClick={this.handleButtonDel}>删除</Button>
                    </span>
                    <Table rowSelection={rowSelection} columns={columnsReal} dataSource={buttonList}  pagination={false}/>
                </div>

                <Modal
                    title={this.state.buttonTitle}
                    visible={this.state.buttonVisible}
                    onOk={this.handleButtonSubmit}
                    width={800}
                    onCancel={()=>{
                        this.ButtonForm.props.form.resetFields();
                        this.setState({
                            buttonVisible:false,
                            buttonInfo:''
                        })
                    }}
                >
                    <ButtonForm  buttonInfo={this.state.buttonInfo} buttonType={this.state.buttonType} wrappedComponentRef={(inst) => this.ButtonForm = inst }/>
                </Modal>
            </Form>
        );
    }
}
MenuEditForm = Form.create({})(MenuEditForm);
