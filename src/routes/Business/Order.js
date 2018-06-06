import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Popconfirm 
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './TableList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['error', 'default', 'default', 'success','success','error'];
const status = ['待审核', '已取消', '已驳回','审核通过', '已结算','待确认'];

const outcomeMap = ['error', 'default', 'default', 'success','success','error'];
const outcome = ['未知', '赢', '输','平', '半赢','半输'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="新建订单"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="客户ID">
              {form.getFieldDecorator('clientid', {
                  rules: [{ required: true, message: '输入一个客户id' }],
              })(<Input placeholder="请输入" />)}
          </FormItem>

          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="金额">
              {form.getFieldDecorator('amount', {
                  rules: [{ required: true, message: '输入金额' }],
              })(<InputNumber placeholder="请输入" />)}
          </FormItem>

           <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="下注内容">
              {form.getFieldDecorator('content', {
                  rules: [{ required: true, message: '输入下注内容' }],
              })(<Input placeholder="请输入" />)}
          </FormItem>

           <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="下注方">
              {form.getFieldDecorator('whitchparty', {
                  rules: [{ required: true, message: '输入下注方' }],
              })(<Input placeholder="请输入" />)}
          </FormItem>

           <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="下注水位">
              {form.getFieldDecorator('odds', {
                  rules: [{ required: true, message: '输入下注水位' }],
              })(<InputNumber min={0.01} max={1000} step={0.01} placeholder="请输入" />)}
          </FormItem>

    </Modal>
  );
});




const UpdateForm = Form.create()(props => {
  const { modalVisible, form, handleUpdate, handleUpdateModalVisible ,formValue} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      console.log({fieldsValue});
      handleUpdate(fieldsValue);
    });
  };
  return (
    <Modal
      title="结算订单"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleUpdateModalVisible()}
    >
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="订单ID">
              {form.getFieldDecorator('orderid', {
                   initialValue:formValue.orderid,
                  rules: [{ required: true, message: '输入一个订单id' }],
              })(<Input placeholder="请输入" disabled/>)}
          </FormItem>

           <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="赔率">
              {form.getFieldDecorator('odds', {
                   initialValue:formValue.odds,
                  rules: [{ required: true, message: '赔率' }],
              })(<InputNumber min={0.01} max={1000} step={0.01} placeholder="请输入" />)}
          </FormItem>

    </Modal>
  );
});


const FinishForm = Form.create()(props => {
  const { modalVisible, form, handleFinish, handleFinishModalVisible,formValue } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleFinish(fieldsValue);
    });
  };
  return (
    <Modal
      title="结算订单"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleFinishModalVisible()}
    >
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="订单ID">
              {form.getFieldDecorator('orderid', {
                   initialValue:formValue.orderid,
                  rules: [{ required: true, message: '输入一个订单id' }],
              })(<Input placeholder="请输入" disabled/>)}
          </FormItem>


  <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="结果">
              {form.getFieldDecorator('outcome', {
                  rules: [{ required: true, message: '结果' }],
              })(<Select style={{ width: 120 }}>
                <Option value="1">赢</Option>
                <Option value="2">输</Option>
                <Option value="3">平</Option>
                <Option value="4">半赢</Option>
                <Option value="5">半输</Option>
            </Select>)}
          </FormItem>
         

    </Modal>
  );
});


const RejectForm = Form.create()(props => {
  const { modalVisible, form, handleReject, handleRejectModalVisible,formValue } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleReject(fieldsValue);
    });
  };
  return (
    <Modal
      title="驳回订单"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleRejectModalVisible()}
    >
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="订单ID">
              {form.getFieldDecorator('orderid', {
                   initialValue:formValue.orderid,
                  rules: [{ required: true, message: '输入一个订单id' }],
              })(<Input placeholder="请输入" disabled/>)}
          </FormItem>


  <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="理由">
              {form.getFieldDecorator('remark', {
                  rules: [{ required: true, message: '理由' }],
              })(<Input placeholder="请输入"/>)}
          </FormItem>
         

    </Modal>
  );
});




@connect(({ order, loading }) => ({
  order,
  loading: loading.models.order,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    finishModalVisible:false,
    finishModalValue:{},
    rejectModalVisible:false,
    rejectModalValue:{},
    updateModalVisible:false,
    updateModalValue:{},
    expandForm: false,
    selectedRows: [],
    formValues: {},
    fresh:false
  };



  reload = ()=>{
    const { dispatch } = this.props;

 

    setTimeout(this.reload,10*1000);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/fetch',
    });

    this.setState({fresh:true})
    this.reload();
  }

  componentWillUnmount(){
    this.setState({fresh:false})
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'order/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'order/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };



  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'order/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };


  handleUpdateModalVisible = flag => {
    this.setState({
      updateModalVisible: !!flag,
    });
  };


  handleFinishModalVisible = flag => {
    this.setState({
      finishModalVisible: !!flag,
    });
  };

  handleRejectModalVisible = flag => {
    this.setState({
      rejectModalVisible: !!flag,
    });
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: 'order/create',
      payload: fields,
    });

    this.setState({
      modalVisible: false,
    });
  };

  handleUpdate = fields => {
    this.props.dispatch({
      type: 'order/update',
      payload: fields,
    });

    this.setState({
      updateModalVisible: false,
    });
  };

  handleFinish = fields => {
    this.props.dispatch({
      type: 'order/finish',
      payload: fields,
    });

    this.setState({
      finishModalVisible: false,
    });
  };


  handleReject = fields =>{

  this.props.dispatch({
      type: 'order/audit',
      payload: {
        orderid:fields.orderid,
        remark:fields.remark,
        action:"reject"
      },
    });

    this.setState({
      rejectModalVisible: false,
    });
  }


  onPassClick = val => {

    this.props.dispatch({
      type: 'order/audit',
      payload: {
        orderid:val.orderid,
        action:"pass"
      },
    });

  }

  onRejectClick = val => {
    this.setState({
      rejectModalVisible: true,
      rejectModalValue:val
    });

  
    
  }

  onFinishClick = val => {

    
      this.setState({
        finishModalVisible: true,
        finishModalValue:val
      });
    
    
  }

  onRollbackClick = val=>{
    this.props.dispatch({
      type: 'order/rollback',
      payload: {
        orderid:val.orderid,
      },
    });
  }


  onUpdateClick = val => {

    
    this.setState({
      updateModalVisible: true,
      updateModalValue:val
    });
  
  
}

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="订单编号">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          
            <Col md={8} sm={24}>
            <FormItem label="内容">
              {getFieldDecorator('content')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>

            <Col md={8} sm={24}>
            <FormItem label="下注方">
              {getFieldDecorator('whitchparty')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">待审核</Option>
                  <Option value="1">已取消</Option>
                  <Option value="2">已驳回</Option>
                  <Option value="3">审核通过</Option>
                  <Option value="4">已结算</Option>
                  <Option value="5">待确认</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {

    const { order: { data }, loading } = this.props;

    const { selectedRows, modalVisible ,updateModalVisible,finishModalVisible,rejectModalVisible} = this.state;

    const columns = [
      {
        title: '订单编号',
        dataIndex: 'orderid',
      },
      {
        title: '客户',
        dataIndex: 'clientid',
      },

      {
        title: '金额',
        dataIndex: 'amount',
      },

      {
        title: '内容',
        dataIndex: 'content',
      },

      {
        title: '下注方',
        dataIndex: 'whitchparty',
      },

      {
        title: '赔率',
        dataIndex: 'odds',
      },

      {
        title: '结果',
        dataIndex: 'outcome',
        render(val) {   
          return <Badge status={outcomeMap[val]} text={outcome[val]} />;
        },
      },


      {
        title: '盈利',
        dataIndex: 'makemoney',
      },
    
      {
        title: '状态',
        render(val) {

          if(val.status == 2){
            return <Badge status={statusMap[val.status]} text={status[val.status]+":"+val.remark} />;
          }else{
            return <Badge status={statusMap[val.status]} text={status[val.status]} />;
          }
         
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createtime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: (val) => (
          <Fragment>
            {val.status==0 &&  
            <div>
            <a onClick={() => this.onUpdateClick(val)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => this.onPassClick(val)}>通过</a>
            <Divider type="vertical" />
            <a onClick={() => this.onRejectClick(val)}>驳回</a>
             </div>}
             {val.status==3 && <div>   <a onClick={() => this.onFinishClick(val)}>结算</a></div>}

            {val.status==4 && <Popconfirm title="确定回滚?" onConfirm={() => this.onRollbackClick(val)} okText="Yes" cancelText="No">
            <a >回滚</a>
            </Popconfirm>}
             {/* {val.status==4 && <div>   <a onClick={() => this.onRollbackClick(val)}>回滚</a></div>} */}
           
          </Fragment>
        ),
      },
    ];


    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    const updateParentMethods = {
      handleUpdate: this.handleUpdate,
      handleUpdateModalVisible: this.handleUpdateModalVisible,
    };

    const finishParentMethods = {
      handleFinish: this.handleFinish,
      handleFinishModalVisible: this.handleFinishModalVisible,
    };


    const rejectParentMethods = {
      handleReject: this.handleReject,
      handleRejectModalVisible: this.handleRejectModalVisible,
    };

    return (
      <PageHeaderLayout title="订单列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        <UpdateForm {...updateParentMethods} modalVisible={updateModalVisible} formValue={this.state.updateModalValue}/>
        <FinishForm {...finishParentMethods} modalVisible={finishModalVisible} formValue={this.state.finishModalValue}/>
        <RejectForm {...rejectParentMethods} modalVisible={rejectModalVisible} formValue={this.state.rejectModalValue}/>
      </PageHeaderLayout>
    );
  }
}
