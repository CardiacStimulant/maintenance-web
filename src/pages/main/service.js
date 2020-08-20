import request from "utils/request";

//定义接口地址
const URL = {
    "LOGOUT": `${GROBAL_HTTP_CTX}/logout`,  //退出登录
    "UPDATE_USER_PASSWORD": `${GROBAL_HTTP_CTX}/userManager/updatePassword`, // 修改密码
}

/**
 * 退出登录
 * @param {*} params 
 */
export const logout = (params) => {
    return request(URL.LOGOUT, {
        method: "get",
    });
}

/**
 * 修改密码
 * @param {*} params 
 */
export const updateUserPassword = (params) => {
    return request(URL.UPDATE_USER_PASSWORD, {
        method: "post",
        data: params,
    });
}