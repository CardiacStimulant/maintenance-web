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
        async queryPage(param, getState) {
            let res = await api.queryPage(param);
            if(res && res.data && res.data.code===200) {
                actions.UserManager.updateState({
                    userManagerPageCondition: param || {},
                    userManagerPageObject: res.data.result || {},
                });
            } else {
                Error(res && res.data && res.data.message ? res.data.message : "请求失败");
            }
        }
    },
};