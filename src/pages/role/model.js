import { actions } from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
import { Warning, Error, processData } from "utils";
import * as HttpStateCode from 'components/HttpStateCode';
import { reset } from "fetch-mock";

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
            let res = processData(await api.queryPage(param));
            if(res.code===HttpStateCode.OK) {
                actions.RoleManager.updateState({
                    roleManagerPageCondition: param || {},
                    roleManagerPageObject: res.data || {},
                });
            } else {
                Error(res.message ? res.message : "数据返回异常");
            }
            return res;
        },

        /**
         * 新增角色
         * @param {*} param
         * @param {*} getState
         */
        async addRole(param, getState) {
            let res = processData(await api.addRole(param));
            return res;
        },

        /**
         * 编辑角色
         * @param {*} param
         * @param {*} getState
         */
        async updateRole(param, getState) {
            let res = processData(await api.updateRole(param));
            return res;
        },

        /**
         * 删除角色
         * @param {*} param
         * @param {*} getState
         */
        async deleteRole(param, getState) {
            let res = processData(await api.deleteRole(param));
            return res;
        },

        /**
         * 批量删除角色
         * @param {*} param
         * @param {*} getState
         */
        async batchDeleteRole(param, getState) {
            let res = processData(await api.batchDeleteRole(param));
            return res;
        },

        /**
         * 角色添加全部未配置的资源
         * @param {*} param 
         * @param {*} getState 
         */
        async addAllRoleResource(param, getState) {
            let res = processData(await api.addAllRoleResource(param));
            return res;
        },

        /**
         * 角色添加未配置的资源
         * @param {*} param 
         * @param {*} getState 
         */
        async addRoleResources(param, getState) {
            let res = processData(await api.addRoleResources(param));
            return res;
        },

        /**
         * 角色移除全部配置的资源
         * @param {*} param 
         * @param {*} getState 
         */
        async removeAllRoleResource(param, getState) {
            let res = processData(await api.removeAllRoleResource(param));
            return res;
        },

        /**
         * 角色移除配置的资源
         * @param {*} param 
         * @param {*} getState 
         */
        async removeRoleResources(param, getState) {
            let res = processData(await api.removeRoleResources(param));
            return res;
        },
    },
};