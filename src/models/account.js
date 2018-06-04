import { getAccountList,createAccount,updateAccount,enableAccount } from '../services/api';
import {ENUMS} from '../utils/enums'
import { routerRedux } from 'dva/router';
import {optSucessNotify,optFailedNotify} from '../utils/notify'


export default {
    namespace: 'account',

    state: {
        data: {
            list: [],
            pagination: {},
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(getAccountList, payload);
            yield put({
                type: 'save',
                payload: response,
            });
        },

        *create({payload},{call,put}){
            const response = yield call(createAccount, payload);
            if(response.code==ENUMS.ErrCode.Success){
                optSucessNotify("操作成功");
                yield put({
                    type: 'reload',
                });
            }else{
                optFailedNotify("操作失败："+response.message)
            }
        },

        *update({payload},{call,put}){
            const response = yield call(updateAccount, payload);
            if(response.code==ENUMS.ErrCode.Success){
                optSucessNotify("操作成功");
                yield put({
                    type: 'reload',
                });
            }else{
                optFailedNotify("操作失败："+response.message)
            }
        },


        *enable({payload},{call,put}){
            const response = yield call(enableAccount, payload);
            if(response.code==ENUMS.ErrCode.Success){
                optSucessNotify("操作成功");
                yield put({
                    type: 'reload',
                });
            }else{
                optFailedNotify("操作失败："+response.message)
            }
        },

        *reload(_,{put,select}){
            const pagination = yield select(state => state.account.data.pagination);
            let payload = {
                page:pagination.current,
                count:pagination.pageSize
            }
            yield put({
                type: 'fetch',
                payload,
            })
        }

    },

    reducers: {
        save(state, action) {

            if(action.payload){
                return {
                    ...state,
                    data: action.payload,
                };
            }else{
                return {
                    ...state
                };
            }
        },
    },
};
