import request from "utils/request";
import * as commonUtils from 'utils/commonUtils';

//定义接口地址
const URL = {
    "QUERY_PAGE" : `${GROBAL_HTTP_CTX}/resourceManager/queryPage`,  //查询资源分页数据
    "ADD_RESOURCE" : `${GROBAL_HTTP_CTX}/resourceManager/addResource`,  //新增资源
    "UPDATE_RESOURCE" : `${GROBAL_HTTP_CTX}/resourceManager/updateResource`,  //更新资源
    "DELETE_RESOURCE" : `${GROBAL_HTTP_CTX}/resourceManager/deleteResource`,  //删除资源
    "BATCH_DELETE_RESOURCE" : `${GROBAL_HTTP_CTX}/resourceManager/batchDeleteResource`,  //批量删除资源
}

/**
 * 查询资源管理分页数据
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
 * 新增资源
 * @param {*} params 
 */
export const addResource = (params) => {
    return request(URL.ADD_RESOURCE, {
        method: "post",
        data: params,
    });
}

/**
 * 更新资源
 * @param {*} params 
 */
export const updateResource = (params) => {
    return request(URL.UPDATE_RESOURCE, {
        method: "post",
        data: params,
    });
}

/**
 * 删除资源管理
 * @param {*} params 
 */
export const deleteResource = (params) => {
    return request(URL.DELETE_RESOURCE, {
        method: "post",
        data: params,
    });
}

/**
 * 批量删除资源管理
 * @param {*} params 
 */
export const batchDeleteResource = (params) => {
    return request(URL.BATCH_DELETE_RESOURCE, {
        method: "post",
        data: params,
    });
}
