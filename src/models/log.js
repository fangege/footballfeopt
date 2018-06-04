import { getLogList } from '../services/api';

export default {
    namespace: 'log',

    state: {
        data: {
            list: [],
            pagination: {},
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(getLogList, payload);
            yield put({
                type: 'save',
                payload: response,
            });
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
