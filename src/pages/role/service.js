import request from "utils/request";
import * as commonUtils from 'utils/commonUtils';

//定义接口地址
const URL = {
    "QUERY_PAGE" : `${GROBAL_HTTP_CTX}/roleManager/queryPage`,  //查询角色分页数据
    "ADD_ROLE" : `${GROBAL_HTTP_CTX}/roleManager/addRole`,  //新增角色
    "UPDATE_ROLE" : `${GROBAL_HTTP_CTX}/roleManager/updateRole`,  //更新角色
    "DELETE_ROLE" : `${GROBAL_HTTP_CTX}/roleManager/deleteRole`,  //删除角色
    "BATCH_DELETE_ROLE" : `${GROBAL_HTTP_CTX}/roleManager/batchDeleteRole`,  //批量删除角色
}

/**
 * 查询角色管理分页数据
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
 * 新增角色
 * @param {*} params 
 */
export const addRole = (params) => {
    return request(URL.ADD_ROLE, {
        method: "post",
        data: params,
    });
}

/**
 * 更新角色
 * @param {*} params 
 */
export const updateRole = (params) => {
    return request(URL.UPDATE_ROLE, {
        method: "post",
        data: params,
    });
}

/**
 * 删除角色管理
 * @param {*} params 
 */
export const deleteRole = (params) => {
    return request(URL.DELETE_ROLE, {
        method: "post",
        data: params,
    });
}

/**
 * 批量删除角色管理
 * @param {*} params 
 */
export const batchDeleteRole = (params) => {
    return request(URL.BATCH_DELETE_ROLE, {
        method: "post",
        data: params,
    });
}
