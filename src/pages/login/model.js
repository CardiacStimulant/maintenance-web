import { actions } from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
// 接口返回数据公共处理方法，根据具体需要
import { processData } from "utils";
import * as constant from 'components/constant';
import * as commentAction from "utils/commentAction";
import { Warning, Error } from "utils";
import $ from "jquery";

export default {
    // 确定 Store 中的数据模型作用域
    name: "Login",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        
    },
    reducers: {
        /**
         * 纯函数，相当于 Redux 中的 Reducer，只负责对数据的更新。
         * @param {*} state
         * @param {*} data
         */
        updateState(state, data) { //更新state
            return {
                ...state,
                ...data
            };
        }
    },
    effects: {
        /**
        * 获取通话信息& 服务总结  by xingzhc 
        * @param {*} param
        * @param {*} getState
        */
        async getServiceRecordHistoryCall(param, getState) {
            let { data: { detailMsg: { data } } } = await api.getServiceRecordCall(param);
            return data;
        },

        /**
         * 获取通话信息
         * @param {*} param
         * @param {*} getState
         */
        async getServiceRecordCall(param, getState) {
            let res = processData(await api.getServiceRecordCall(param));
            actions.PhoneService.updateState({
                serviceRecordCall: res
            })
        },
    },
};