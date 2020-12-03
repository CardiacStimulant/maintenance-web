import { actions } from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
import * as HttpStateCode from 'components/HttpStateCode';
import { Warning, Error, processData, } from "utils";

export default {
    // 确定 Store 中的数据模型作用域
    name: "UserManager",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        userManagerPageObject: {},  // 用户管理分页信息
        userManagerPageCondition: {},  // 用户管理分页查询条件
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
         * 查询用户管理分页数据
         * @param {*} param
         * @param {*} getState
         */
        async queryPage(param, getState) {
            let res = processData(await api.queryPage(param));
            if(res && res.code===HttpStateCode.OK) {
                actions.UserManager.updateState({
                    userManagerPageCondition: param || {},
                    userManagerPageObject: res.data || {},
                });
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },

        /**
         * 新增用户管理
         * @param {*} param
         * @param {*} getState
         */
        async addUserManager(param, getState) {
            let res = processData(await api.addUserManager(param));
            if(res && res.code===HttpStateCode.OK) {
                return res;
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },

        /**
         * 编辑用户管理
         * @param {*} param
         * @param {*} getState
         */
        async updateUserManager(param, getState) {
            let res = processData(await api.updateUserManager(param));
            if(res && res.code===HttpStateCode.OK) {
                return res;
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },

        /**
         * 删除用户管理
         * @param {*} param
         * @param {*} getState
         */
        async deleteUserManager(param, getState) {
            let res = processData(await api.deleteUserManager(param));
            if(res && res.code===HttpStateCode.OK) {
                return res;
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },

        /**
         * 批量删除用户管理
         * @param {*} param
         * @param {*} getState
         */
        async batchDeleteUserManager(param, getState) {
            let res = processData(await api.batchDeleteUserManager(param));
            if(res && res.code===HttpStateCode.OK) {
                return res;
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },
    },
};