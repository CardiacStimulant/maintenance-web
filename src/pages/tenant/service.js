import request from "utils/request";
import * as commonUtils from 'utils/commonUtils';

//定义接口地址
const URL = {
    "QUERY_PAGE" : `${GROBAL_HTTP_CTX}/tenant/queryPage`,  //查询租户分页数据
    "QUERY_TELEPHONE_NUMBER_PAGE" : `${GROBAL_HTTP_CTX}/tenant/queryTelephoneNumberPage`,  //查询租户号码分页数据
    "QUERY_LINE_SERVER" : `${GROBAL_HTTP_CTX}/call_center_ability/queryLineServer`,  //查询线路服务集合数据
    "ADD_TENANT_TELEPHONE_NUMBER" : `${GROBAL_HTTP_CTX}/tenant/addTenantTelephoneNumber`,  //新增租户号码信息
    "UPDATE_TENANT_TELEPHONE_NUMBER" : `${GROBAL_HTTP_CTX}/tenant/updateTenantTelephoneNumber`,  //更新租户号码信息
    "DELETE_TENANT_TELEPHONE_NUMBER" : `${GROBAL_HTTP_CTX}/tenant/deleteTenantTelephoneNumber`,  //删除租户号码信息
    "BATCH_DELETE_TENANT_TELEPHONE_NUMBER" : `${GROBAL_HTTP_CTX}/tenant/batchDeleteTenantTelephoneNumber`,  //批量删除租户号码信息
}

/**
 * 查询租户管理分页数据
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
 * 查询租户号码分页数据
 * @param {*} params 
 */
export const queryTelephoneNumberPage = (params) => {
    let url =URL.QUERY_TELEPHONE_NUMBER_PAGE+'?1=1';
    for(let attr in params){
        // 特殊字符替换
        url+='&'+attr+'='+commonUtils.replaceSpecialCharacters(params[attr]);
    }
    return request(url, {
        method: "get",
    });
}

/**
 * 查询线路服务信息
 * @param {*} params 
 */
export const queryLineServer = (params) => {
    let url =URL.QUERY_LINE_SERVER+'?1=1';
    for(let attr in params){
        // 特殊字符替换
        url+='&'+attr+'='+commonUtils.replaceSpecialCharacters(params[attr]);
    }
    return request(url, {
        method: "get",
    });
}

/**
 * 更新号码信息
 * @param {*} params 
 */
export const updateNumberManager = (params) => {
    return request(URL.UPDATE_TENANT_TELEPHONE_NUMBER, {
        method: "post",
        data: params,
    });
}

/**
 * 删除号码信息
 * @param {*} params 
 */
export const deleteNumberManager = (params) => {
    return request(URL.DELETE_TENANT_TELEPHONE_NUMBER, {
        method: "post",
        data: params,
    });
}

/**
 * 删除号码信息
 * @param {*} params 
 */
export const batchDeleteNumberManager = (params) => {
    return request(URL.BATCH_DELETE_TENANT_TELEPHONE_NUMBER, {
        method: "post",
        data: params,
    });
}