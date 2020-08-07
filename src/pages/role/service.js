import request from "utils/request";
import * as commonUtils from 'utils/commonUtils';

//定义接口地址
const URL = {
    "QUERY_PAGE" : `${GROBAL_HTTP_CTX}/role/queryPage`,  //查询角色分页数据
    "ADD_ROLE" : `${GROBAL_HTTP_CTX}/role/addRole`,  //新增角色
    "UPDATE_ROLE" : `${GROBAL_HTTP_CTX}/role/updateRole`,  //更新角色
    "DELETE_ROLE" : `${GROBAL_HTTP_CTX}/role/deleteRole`,  //删除角色
    "BATCH_DELETE_ROLE" : `${GROBAL_HTTP_CTX}/role/batchDeleteRole`,  //批量删除角色
    "ADD_ALL_ROLE_RESOURCE" : `${GROBAL_HTTP_CTX}/roleResource/addAllRoleResource`,  //角色添加全部资源
    "ADD_ROLE_RESOURCES" : `${GROBAL_HTTP_CTX}/roleResource/addRoleResources`,  //角色添加资源
    "REMOVE_ALL_ROLE_RESOURCE" : `${GROBAL_HTTP_CTX}/roleResource/removeAllRoleResource`,  //角色移除全部资源
    "REMOVE_ROLE_RESOURCES" : `${GROBAL_HTTP_CTX}/roleResource/removeRoleResources`,  //角色移除资源
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

/**
 * 添加全部角色-资源关系
 * @param {*} params 
 */
export const addAllRoleResource = (params) => {
    let url =URL.ADD_ALL_ROLE_RESOURCE+'?1=1';
    for(let attr in params){
        // 特殊字符替换
        url+='&'+attr+'='+commonUtils.replaceSpecialCharacters(params[attr]);
    }
    return request(url, {
        method: "get",
    });
}

/**
 * 添加指定角色-资源关系
 * @param {*} params 
 */
export const addRoleResources = (params) => {
    return request(URL.ADD_ROLE_RESOURCES, {
        method: "post",
        data: params,
    });
}

/**
 * 移除全部角色-资源关系
 * @param {*} params 
 */
export const removeAllRoleResource = (params) => {
    let url =URL.REMOVE_ALL_ROLE_RESOURCE+'?1=1';
    for(let attr in params){
        // 特殊字符替换
        url+='&'+attr+'='+commonUtils.replaceSpecialCharacters(params[attr]);
    }
    return request(url, {
        method: "get",
    });
}

/**
 * 移除指定角色-资源关系
 * @param {*} params 
 */
export const removeRoleResources = (params) => {
    return request(URL.REMOVE_ROLE_RESOURCES, {
        method: "post",
        data: params,
    });
}