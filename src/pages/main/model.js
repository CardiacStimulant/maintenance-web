import { actions } from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
// 接口返回数据公共处理方法，根据具体需要
import { processData } from "utils";
import { Warning, Error } from "utils";

export default {
    // 确定 Store 中的数据模型作用域
    name: "Maintenance",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        userInfo: {},   // 当前用户信息
        tabMenus: [],   // tab的所有menu
        activeMenu: {}, // tab当前激活的menu
        flatMenu: [],
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
         * 退出登录
         * @param {*} param
         * @param {*} getState
         */
        async logout(param, getState) {
            let res = processData(await api.logout(param));
            if(res && res.code===200) {
                return res;
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        },

        /**
         * 更新用户密码
         * @param {*} param 
         * @param {*} getState 
         */
        async updateUserPassword(param, getState) {
            let res = processData(await api.updateUserPassword(param));
            if(res && res.code===200) {
                return res;
            } else {
                Error(res && res.message ? res.message : "请求失败");
            }
        }
    },
};
