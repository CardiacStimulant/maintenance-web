import { actions } from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
import { Warning, Error, processData } from "utils";

export default {
    // 确定 Store 中的数据模型作用域
    name: "TenantManager",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        tenantManagerPageObject: {},  // 租户管理分页信息
        tenantManagerPageCondition: {},  // 租户管理分页查询条件
        tenantTelephoneNumberConfigPageObject: {},  // 租户号码分页信息
        tenantTelephoneNumberConfigPageCondition: {},   // 租户号码分页查询条件
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
         * 查询租户分页数据
         * @param {*} param
         * @param {*} getState
         */
        async queryPage(param, getState) {
            let res = processData(await api.queryPage(param));
            if(res && res.code===200) {
                actions.TenantManager.updateState({
                    tenantManagerPageCondition: param || {},
                    tenantManagerPageObject: res.result || {},
                });
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },
        
        /**
         * 查询租户号码数据
         * @param {*} param
         * @param {*} getState
         */
        async queryTelephoneNumberPage(param, getState) {
            let res = processData(await api.queryTelephoneNumberPage(param));
            if(res && res.code===200) {
                actions.TenantManager.updateState({
                    tenantTelephoneNumberConfigPageCondition: param || {},
                    tenantTelephoneNumberConfigPageObject: res.result || {},
                });
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },

        /**
         * 查询线路服务数据
         * @param {*} param
         * @param {*} getState
         */
        async queryLineServer(param, getState) {
            let res = processData(await api.queryLineServer(param));
            if(res && res.code===200) {
                return res;
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },

        /**
         * 新增号码数据
         * @param {*} param
         * @param {*} getState
         */
        async addNumberManager(param, getState) {
            let res = processData(await api.addNumberManager(param));
            if(res && res.code===200) {
                return res;
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },

        /**
         * 更新号码数据
         * @param {*} param
         * @param {*} getState
         */
        async updateNumberManager(param, getState) {
            let res = processData(await api.updateNumberManager(param));
            if(res && res.code===200) {
                return res;
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },

        /**
         * 删除号码数据
         * @param {*} param
         * @param {*} getState
         */
        async deleteNumberManager(param, getState) {
            let res = processData(await api.deleteNumberManager(param));
            if(res && res.code===200) {
                return res;
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },
        
        /**
         * 批量删除号码数据
         * @param {*} param
         * @param {*} getState
         */
        async batchDeleteNumberManager(param, getState) {
            let res = processData(await api.batchDeleteNumberManager(param));
            if(res && res.code===200) {
                return res;
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },
    },
};