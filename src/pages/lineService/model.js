import { actions } from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
import { Warning, Error, processData } from "utils";

export default {
    // 确定 Store 中的数据模型作用域
    name: "LineServiceManager",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        lineServicePageObject: {},  // 线路服务管理分页信息
        lineServicePageCondition: {},  // 线路服务管理分页查询条件
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
         * 查询线路服务分页数据
         * @param {*} param
         * @param {*} getState
         */
        async queryPage(param, getState) {
            let res = processData(await api.queryPage(param));
            if(res && res.code===200) {
                actions.LineServiceManager.updateState({
                    lineServicePageCondition: param || {},
                    lineServicePageObject: res.result || {},
                });
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },

        /**
         * 新增线路服务数据
         * @param {*} param
         * @param {*} getState
         */
        async addLineService(param, getState) {
            let res = processData(await api.addLineService(param));
            if(res && res.code===200) {
                return res;
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },

        /**
         * 更新线路服务数据
         * @param {*} param
         * @param {*} getState
         */
        async updateLineService(param, getState) {
            let res = processData(await api.updateLineService(param));
            if(res && res.code===200) {
                return res;
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },

        /**
         * 删除线路服务数据
         * @param {*} param
         * @param {*} getState
         */
        async deleteLineService(param, getState) {
            let res = processData(await api.deleteLineService(param));
            if(res && res.code===200) {
                return res;
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },
        
        /**
         * 批量删除线路服务数据
         * @param {*} param
         * @param {*} getState
         */
        async batchDeleteLineService(param, getState) {
            let res = processData(await api.batchDeleteLineService(param));
            if(res && res.code===200) {
                return res;
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },
    },
};