import request from "utils/request";
import * as commonUtils from 'utils/commonUtils';

//定义接口地址
const URL = {
    "QUERY_PAGE" : `${GROBAL_HTTP_CTX}/call_center_ability/queryPage`,  //查询线路服务分页数据
    "ADD_LINE_SERVICE" : `${GROBAL_HTTP_CTX}/call_center_ability/addLineService`,  //新增线路服务
    "UPDATE_LINE_SERVICE" : `${GROBAL_HTTP_CTX}/call_center_ability/updateLineService`,  //更新线路服务
    "DELETE_LINE_SERVICE" : `${GROBAL_HTTP_CTX}/call_center_ability/deleteLineService`,  //删除线路服务
    "BATCH_DELETE_LINE_SERVICE" : `${GROBAL_HTTP_CTX}/call_center_ability/batchDeleteLineService`,  //批量删除线路服务
}

/**
 * 查询线路服务管理分页数据
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
 * 新增线路服务
 * @param {*} params 
 */
export const addLineService = (params) => {
    return request(URL.ADD_LINE_SERVICE, {
        method: "post",
        data: params,
    });
}

/**
 * 更新线路服务
 * @param {*} params 
 */
export const updateLineService = (params) => {
    return request(URL.UPDATE_LINE_SERVICE, {
        method: "post",
        data: params,
    });
}

/**
 * 删除线路服务
 * @param {*} params 
 */
export const deleteLineService = (params) => {
    return request(URL.DELETE_LINE_SERVICE, {
        method: "post",
        data: params,
    });
}

/**
 * 删除线路服务
 * @param {*} params 
 */
export const batchDeleteLineService = (params) => {
    return request(URL.BATCH_DELETE_LINE_SERVICE, {
        method: "post",
        data: params,
    });
}