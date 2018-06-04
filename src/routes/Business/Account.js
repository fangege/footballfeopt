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
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './TableList.less';

import * as crypto from  'crypto'

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error','processing'];
const status = ['超级管理员', '管理员', '客服', '财务','代理'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {

      if (err) return;
      form.resetFields();

      fieldsValue.password  = crypto.createHash("md5").update(crypto.createHash("md5").update(fieldsValue.password).digest("hex")+fieldsValue.accountid).digest("hex");

      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="新建帐号"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="帐号ID">
        {form.getFieldDecorator('accountid', {
          rules: [{ required: true, message: '请输入帐号ID' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('password', {
          rules: [{ required: true, message: '输入密码' }],
        })(<Input  placeholder="请输入密码" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: '输入类型' }],
        })(<Select style={{ width: 120 }}>
              <Option value="1">管理员</Option>
              <Option value="2">客服</Option>
              <Option value="3">财务</Option>
              <Option value="4">代理</Option>
          </Select>)}
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
        fieldsValue.password  = crypto.createHash("md5").update(crypto.createHash("md5").update(fieldsValue.password).digest("hex")+fieldsValue.accountid).digest("hex");
      }
      handleUpdate(fieldsValue);
    });
  };
  return (
    <Modal
      title="更新帐号"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="帐号ID">
        {form.getFieldDecorator('accountid', {
          initialValue:formValue.accountid,
          rules: [{ required: true, message: '请输入帐号ID' }],
        })(<Input placeholder="请输入" disabled/>)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型">
        {form.getFieldDecorator('type', {
            initialValue:formValue.type+"",
          rules: [{ required: true, message: '输入类型' }],
        })(<Select style={{ width: 120 }}>
              <Option value="1">管理员</Option>
              <Option value="2">客服</Option>
          </Select>)}
      </FormItem>

       <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="联系方式">
        {form.getFieldDecorator('communication', {
            initialValue:formValue.communication,
          rules: [{ required: true, message: '输入联系方式' }],
        })(<Input  placeholder="请输入联系方式" />)}
      </FormItem>


       <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('password', {
          rules: [{ required: false }],
        })(<Input  placeholder="请输入新密码，不修改则留空" />)}
      </FormItem>


    </Modal>
  );
});


@connect(({ account, loading }) => ({
  account,
  loading: loading.models.account,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible:false,
    updateModalValue:{},
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/fetch',
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
      type: 'account/fetch',
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
      type: 'account/fetch',
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
        type: 'account/fetch',
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

  handleAdd = fields => {
    this.props.dispatch({
      type: 'account/create',
      payload: fields,
    });

    this.setState({
      modalVisible: false,
    });
  };


  handleUpdate = fields => {
    this.props.dispatch({
      type: 'account/update',
      payload: fields,
    });

    this.setState({
      updateModalVisible: false,
    });

  }



  onUpdateClick = val => {
    this.setState({
      updateModalVisible: true,
      updateModalValue:val
    });
  }

  onEnalbeClick = val => {
    this.props.dispatch({
      type: 'account/enable',
      payload: val,
    });
  }


  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="编号">
              {getFieldDecorator('no')(<Input placeholder="请输入ID" />)}
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

    const { account: { data }, loading } = this.props;
    const { selectedRows, modalVisible,updateModalVisible } = this.state;

    const columns = [
      {
        title: '客户ID',
        dataIndex: 'accountid',
      },



      {
        title: '联系方式',
        dataIndex: 'communication',
      },

      {
        title: '类型',
        dataIndex: 'type',
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
            {val.status==1 ?  <a onClick={() => this.onEnalbeClick(val)}>禁用</a>: <a onClick={() => this.onEnalbeClick(val)}>启用</a>}
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
      </PageHeaderLayout>
    );
  }
}
