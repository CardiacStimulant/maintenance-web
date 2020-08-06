import { actions } from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
import { Warning, Error } from "utils";

export default {
    // 确定 Store 中的数据模型作用域
    name: "RoleManager",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        roleManagerPageObject: {},  // 角色管理分页信息
        roleManagerPageCondition: {},  // 角色管理分页查询条件
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
         * 查询角色分页数据
         * @param {*} param
         * @param {*} getState
         */
        async queryPage(param, getState) {
            let res = await api.queryPage(param);
            if(res && res.data && res.data.code===200) {
                actions.RoleManager.updateState({
                    roleManagerPageCondition: param || {},
                    roleManagerPageObject: res.data.result || {},
                });
            } else {
                Error(res && res.data && res.data.message ? res.data.message : "请求失败");
            }
        },

        /**
         * 新增角色
         * @param {*} param
         * @param {*} getState
         */
        async addRole(param, getState) {
            let res = await api.addRole(param);
            if(res && res.data && res.data.code===200) {
                return res.data;
            } else {
                Error(res && res.data && res.data.message ? res.data.message : "请求失败");
            }
        },

        /**
         * 编辑角色
         * @param {*} param
         * @param {*} getState
         */
        async updateRole(param, getState) {
            let res = await api.updateRole(param);
            if(res && res.data && res.data.code===200) {
                return res.data;
            } else {
                Error(res && res.data && res.data.message ? res.data.message : "请求失败");
            }
        },

        /**
         * 删除角色
         * @param {*} param
         * @param {*} getState
         */
        async deleteRole(param, getState) {
            let res = await api.deleteRole(param);
            if(res && res.data && res.data.code===200) {
                return res.data;
            } else {
                Error(res && res.data && res.data.message ? res.data.message : "请求失败");
            }
        },

        /**
         * 批量删除角色
         * @param {*} param
         * @param {*} getState
         */
        async batchDeleteRole(param, getState) {
            let res = await api.batchDeleteRole(param);
            if(res && res.data && res.data.code===200) {
                return res.data;
            } else {
                Error(res && res.data && res.data.message ? res.data.message : "请求失败");
            }
        },
    },
};