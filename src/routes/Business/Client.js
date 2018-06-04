import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import * as crypto from 'crypto'

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
const statusMap = ['default', 'processing', 'success'];
const status = ['待审核', '正常', '已冻结'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      fieldsValue.password  = crypto.createHash("md5").update(crypto.createHash("md5").update(fieldsValue.password).digest("hex")+fieldsValue.clientid).digest("hex");
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="新建客户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
       <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="帐号ID">
        {form.getFieldDecorator('clientid', {
          rules: [{ required: true, message: '请输入帐号ID' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('password', {
          rules: [{ required: true, message: '输入密码' }],
        })(<Input  placeholder="请输入密码" />)}
      </FormItem>

           <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="代理ID">
              {form.getFieldDecorator('accountid', {
                  rules: [{ required: true, message: '输入一个代理' }],
              })(<Input placeholder="请输入代理人" />)}
          </FormItem>

       <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="联系方式">
        {form.getFieldDecorator('communication', {
          rules: [{ required: true, message: '输入联系方式' }],
        })(<Input  placeholder="请输入联系方式" />)}
      </FormItem>

    </Modal>
  );
});


const UpdateForm = Form.create()(props => {
  const { modalVisible, form, handleUpdate, handleModalVisible,formValue } = props;



  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if(fieldsValue.password){
        fieldsValue.password  = crypto.createHash("md5").update(crypto.createHash("md5").update(fieldsValue.password).digest("hex")+fieldsValue.clientid).digest("hex");
      }
      handleUpdate(fieldsValue);
    });
  };
  return (
    <Modal
      title="更新客户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="帐号ID">
        {form.getFieldDecorator('clientid', {
          initialValue:formValue.clientid,
          rules: [{ required: true, message: '请输入帐号ID' }],
        })(<Input placeholder="请输入" disabled/>)}
      </FormItem>

       <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="联系方式">
        {form.getFieldDecorator('communication', {
            initialValue:formValue.communication,
          rules: [{ required: true, message: '输入联系方式' }],
        })(<Input  placeholder="请输入联系方式" />)}
      </FormItem>

         <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="代理ID">
              {form.getFieldDecorator('accountid', {
                  initialValue:formValue.accountid,
                  rules: [{ required: true, message: '输入一个代理' }],
              })(<Input placeholder="请输入代理人" />)}
          </FormItem>


       <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('password', {
          rules: [{ required: false }],
        })(<Input  placeholder="请输入新密码，不修改则留空" />)}
      </FormItem>


    </Modal>
  );
});





const RechageForm = Form.create()(props => {
  const { modalVisible, form, handleUpdate, handleModalVisible,formValue } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleUpdate(fieldsValue);
    });
  };
  return (
    <Modal
      title="充值"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="帐号ID">
        {form.getFieldDecorator('clientid', {
          initialValue:formValue.clientid,
          rules: [{ required: true, message: '请输入帐号ID' }],
        })(<Input placeholder="请输入" disabled/>)}
      </FormItem>

       <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="充值金额">
        {form.getFieldDecorator('amount', {
          rules: [{ required: true, message: '输入充值金额' }],
        })(<InputNumber  placeholder="请输入充值金额" />)}
      </FormItem>
    </Modal>
  );
});



const WithDrawForm = Form.create()(props => {
  const { modalVisible, form, handleUpdate, handleModalVisible,formValue } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleUpdate(fieldsValue);
    });
  };
  return (
    <Modal
      title="提款"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="帐号ID">
        {form.getFieldDecorator('clientid', {
          initialValue:formValue.clientid,
          rules: [{ required: true, message: '请输入帐号ID' }],
        })(<Input placeholder="请输入" disabled/>)}
      </FormItem>

       <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="提款金额">
        {form.getFieldDecorator('amount', {
          rules: [{ required: true, message: '输入提款金额' }],
        })(<InputNumber  placeholder="请输入提款金额" />)}
      </FormItem>
    </Modal>
  );
});




@connect(({ client, loading }) => ({
  client,
  loading: loading.models.client,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible:false,
    updateModalValue:{},
    rechageModalVisible:false,
    rechageModalValue:{},

    withDrawModalVisible:false,
    withDrawModalValue:{},

    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'client/fetch',
    });
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
      type: 'client/fetch',
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
      type: 'client/fetch',
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
        type: 'client/fetch',
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

  }

  handleRechageModalVisible = flag => {
    this.setState({
      rechageModalVisible: !!flag,
    });

  }

  handleWithDrawModalVisible = flag => {
    this.setState({
      withDrawModalVisible: !!flag,
    });

  }


  handleAdd = fields => {
    this.props.dispatch({
      type: 'client/create',
      payload: fields
    });
    this.setState({
      modalVisible: false,
    });
  };


  handleUpdate = fields => {
    this.props.dispatch({
      type: 'client/update',
      payload: fields,
    });

    this.setState({
      updateModalVisible: false,
    });

  }

  handleRechage = fields =>{
    this.props.dispatch({
      type: 'client/rechage',
      payload: fields,
    });

    this.setState({
      rechageModalVisible: false,
    });

  }


  handleWithDraw = fields =>{
    this.props.dispatch({
      type: 'client/withDraw',
      payload: fields,
    });

    this.setState({
      withDrawModalVisible: false,
    });

  }



  onUpdateClick = val => {
    this.setState({
      updateModalVisible: true,
      updateModalValue:val
    });
  }

  onRechageClick = val=>{
    this.setState({
      rechageModalVisible: true,
      rechageModalValue:val
    });

  }


  onWithDrawClick = val => {
    this.setState({
      withDrawModalVisible: true,
      withDrawModalValue:val
    });

  }


  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="编号">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
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

 
    const { client: { data }, loading } = this.props;

    const { selectedRows, modalVisible,updateModalVisible,rechageModalVisible,withDrawModalVisible } = this.state;

    const columns = [
      {
        title: '客户ID',
        dataIndex: 'clientid',
      },
    

      {
        title: '金额',
        dataIndex: 'balance',
      },

      {
        title: '代理',
        dataIndex: 'accountid',
      },

      {
        title: '联系方式',
        dataIndex: 'communication',
      },
    
      {
        title: '状态',
        dataIndex: 'status',
        filters: [
          {
            text: status[0],
            value: 0,
          },
          {
            text: status[1],
            value: 1,
          },
          {
            text: status[2],
            value: 2,
          },
          {
            text: status[3],
            value: 3,
          },
        ],
        onFilter: (value, record) => record.status.toString() === value,
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createtime',
        render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
      },
      {
        title: '操作',
        render: (val) => (
          <Fragment>
            <a onClick={() => this.onUpdateClick(val)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => this.onRechageClick(val)}>充值</a>
             <Divider type="vertical" />
            <a onClick={() => this.onWithDrawClick(val)}>提款</a>
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
      handleModalVisible: this.handleUpdateModalVisible,
    };


    const rechageParentMethods = {
      handleUpdate: this.handleRechage,
      handleModalVisible: this.handleRechageModalVisible,
    };


    const withDrawParentMethods = {
      handleUpdate: this.handleWithDraw,
      handleModalVisible: this.handleWithDrawModalVisible,
    };

    return (
      <PageHeaderLayout title="列表">
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
        <RechageForm {...rechageParentMethods} modalVisible={rechageModalVisible} formValue={this.state.rechageModalValue}/>
        <WithDrawForm {...withDrawParentMethods} modalVisible={withDrawModalVisible} formValue={this.state.withDrawModalValue}/>
      </PageHeaderLayout>
    );
  }
}
