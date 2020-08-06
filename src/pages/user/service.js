import request from "utils/request";
import * as commonUtils from 'utils/commonUtils';

//定义接口地址
const URL = {
    "QUERY_PAGE" : `${GROBAL_HTTP_CTX}/userManager/queryPage`,  //查询用户管理分页数据
    "ADD_USER_MANAGER" : `${GROBAL_HTTP_CTX}/userManager/addUserManager`,  //新增用户管理
    "UPDATE_USER_MANAGER" : `${GROBAL_HTTP_CTX}/userManager/updateUserManager`,  //更新用户管理
    "DELETE_USER_MANAGER" : `${GROBAL_HTTP_CTX}/userManager/deleteUserManager`,  //删除用户管理
    "BATCH_DELETE_USER_MANAGER" : `${GROBAL_HTTP_CTX}/userManager/batchDeleteUserManager`,  //批量删除用户管理
}

/**
 * 查询用户管理分页数据
 * @param {*} params 
 */
export const queryPage = (params) => {
    let url =URL.QUERY_PAGE+'?1=1';
    for(let attr in params){
        // 特殊字符替换
        url+='&'+attr+'='+commonUtils.replaceSpecialCharacters(params[attr]);
    }
    return request(url, {
        method: "get",
    });
}

/**
 * 新增用户管理
 * @param {*} params 
 */
export const addUserManager = (params) => {
    return request(URL.ADD_USER_MANAGER, {
        method: "post",
        data: params,
    });
}

/**
 * 更新用户管理
 * @param {*} params 
 */
export const updateUserManager = (params) => {
    return request(URL.UPDATE_USER_MANAGER, {
        method: "post",
        data: params,
    });
}

/**
 * 删除用户管理
 * @param {*} params 
 */
export const deleteUserManager = (params) => {
    return request(URL.DELETE_USER_MANAGER, {
        method: "post",
        data: params,
    });
}

/**
 * 批量删除用户管理
 * @param {*} params 
 */
export const batchDeleteUserManager = (params) => {
    return request(URL.BATCH_DELETE_USER_MANAGER, {
        method: "post",
        data: params,
    });
}
