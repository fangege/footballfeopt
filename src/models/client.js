import { getClientList,createClient,updateClient,rechage,withDraw,enableClient } from '../services/api';
import {ENUMS} from '../utils/enums'
import { routerRedux } from 'dva/router';
import {optSucessNotify,optFailedNotify} from '../utils/notify'


export default {
    namespace: 'client',

    state: {
        data: {
            list: [],
            pagination: {},
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(getClientList, payload);
            yield put({
                type: 'save',
                payload: response,
            });
        },

        *create({payload},{call,put}){
            const response = yield call(createClient, payload);
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
            const response = yield call(updateClient, payload);
            if(response.code==ENUMS.ErrCode.Success){
                optSucessNotify("操作成功");
                yield put({
                    type: 'reload',
                });
            }else{
                optFailedNotify("操作失败："+response.message)
            }
        },

        *rechage({payload},{call,put}){
            const response = yield call(rechage, payload);
            if(response.code==ENUMS.ErrCode.Success){
                optSucessNotify("操作成功");
                yield put({
                    type: 'reload',
                });
            }else{
                optFailedNotify("操作失败："+response.message)
            }
        },

        *withDraw({payload},{call,put}){
            const response = yield call(withDraw, payload);
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
            const response = yield call(enableClient, payload);
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
            const pagination = yield select(state => state.client.data.pagination);
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
