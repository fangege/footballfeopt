import { stringify } from 'qs';
import request from '../utils/request';

let projectName = "/projectf"

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}



export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

//登录相关
export async function accountLogin(params){
  return request(`${projectName}/api/opt/autho/login`, {
    method: 'POST',
    body: params,
  });
}

export async function accountLogout(){
  return request(`${projectName}/api/opt/autho/logout`);
}



//拉取订单列表
export async function getOrderList(params){
  return request(`${projectName}/api/opt/resource/order?${stringify(params)}`);
}




export async function createOrder(params){
  return request(`${projectName}/api/opt/resource/order`, {
    method: 'POST',
    body: params,
  });
}


export async function updateOrder(params){
  return request(`${projectName}/api/opt/resource/order`, {
    method: 'PUT',
    body: params,
  });
}

export async function auditOrder(params){
  return request(`${projectName}/api/opt/resource/auditorder`, {
    method: 'PUT',
    body: params,
  });
}


export async function finishOrder(params){
  return request(`${projectName}/api/opt/resource/finishorder`, {
    method: 'PUT',
    body: params,
  });
}


export async function getClientList(params){
  return request(`${projectName}/api/opt/resource/client?${stringify(params)}`);
}

export async function createClient(params){
  return request(`${projectName}/api/opt/resource/client`, {
    method: 'POST',
    body: params,
  });
}

export async function updateClient(params){
  return request(`${projectName}/api/opt/resource/client`, {
    method: 'PUT',
    body: params,
  });
}

export async function rechage(params){
  return request(`${projectName}/api/opt/resource/rechage`, {
    method: 'PUT',
    body: params,
  });
}



export async function withDraw(params){
  return request(`${projectName}/api/opt/resource/withDraw`, {
    method: 'PUT',
    body: params,
  });
}

export async function rollbackOrder(params){
  return request(`${projectName}/api/opt/resource/rollbackorder`, {
    method: 'PUT',
    body: params,
  });
}


export async function getAccountList(params){
  return request(`${projectName}/api/opt/resource/account?${stringify(params)}`);
}


export async function createAccount(params){
  return request(`${projectName}/api/opt/resource/account`, {
    method: 'POST',
    body: params,
  });
}

export async function updateAccount(params){
  return request(`${projectName}/api/opt/resource/account`, {
    method: 'PUT',
    body: params,
  });
}

export async function enableAccount(params){
  return request(`${projectName}/api/opt/resource/enableaccount`, {
    method: 'PUT',
    body: params,
  });
}

export async function enableClient(params){
  return request(`${projectName}/api/opt/resource/enableclient`, {
    method: 'PUT',
    body: params,
  });
}


export async function getLogList(params){
  return request(`${projectName}/api/opt/resource/log?${stringify(params)}`);
}

export async function getPaymentList(params){
  return request(`${projectName}/api/opt/resource/payment?${stringify(params)}`);
}




