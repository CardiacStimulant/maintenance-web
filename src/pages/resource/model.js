import { actions } from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
import { Warning, Error, processData } from "utils";

export default {
    // 确定 Store 中的数据模型作用域
    name: "ResourceManager",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        resourceManagerPageObject: {},  // 资源管理分页信息
        resourceManagerPageCondition: {},  // 资源管理分页查询条件
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
         * 查询资源分页数据
         * @param {*} param
         * @param {*} getState
         */
        async queryPage(param, getState) {
            let res = processData(await api.queryPage(param));
            if(res && res.code===200) {
                actions.ResourceManager.updateState({
                    resourceManagerPageCondition: param || {},
                    resourceManagerPageObject: res.result || {},
                });
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },

        /**
         * 新增资源
         * @param {*} param
         * @param {*} getState
         */
        async addResource(param, getState) {
            let res = processData(await api.addResource(param));
            if(res && res.code===200) {
                return res;
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },

        /**
         * 编辑资源
         * @param {*} param
         * @param {*} getState
         */
        async updateResource(param, getState) {
            let res = processData(await api.updateResource(param));
            if(res && res.code===200) {
                return res;
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },

        /**
         * 删除资源
         * @param {*} param
         * @param {*} getState
         */
        async deleteResource(param, getState) {
            let res = processData(await api.deleteResource(param));
            if(res && res.code===200) {
                return res;
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },

        /**
         * 批量删除资源
         * @param {*} param
         * @param {*} getState
         */
        async batchDeleteResource(param, getState) {
            let res = processData(await api.batchDeleteResource(param));
            if(res && res.code===200) {
                return res;
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },
    },
};