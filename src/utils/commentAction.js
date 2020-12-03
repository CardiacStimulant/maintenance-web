import request from "utils/request";
import * as commonUtils from 'utils/commonUtils';

/**
 * 通用get请求查询page、list
 * @param {请求参数} params 
 * @param {请求路径} url 
 * @param {模块model} model 
 * @param {模块model需要设置的属性} modelProperty 
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 * @param {是否需要拼接search_前缀，true不拼接，false或传空则拼接} noSearchPrefix 
 * @param {返回为null后的默认值，一般用来空指针处理} defaultResult 
 */
export const commentGetRequest = async(params, url, model, modelProperty, conditionObjectName, noSearchPrefix, defaultResult) => {
    // 待设置的modal对象
    let object = {}, conditionObject = {};
    // 拼接search_前缀
    for(let attr in params){
        // 替换+，空格，/，?，%，#，&，=
        params[attr] = commonUtils.replaceSpecialCharacters(params[attr]);
        url += '&' + attr+'='+params[attr];
        // 是否设置查询条件对象
        if(conditionObjectName) {
            conditionObject[attr] = params[attr];
        }
    }
    // 请求接口查询数据
    let res = await request(url, {
        method: "get",
    });
    /* 设置model对象 */
    if(model && modelProperty) {
        if(res && res.data) {
            // 设置结果对象
            object[modelProperty] = res.data.data || res.data || defaultResult;
        } else {
            // 设置结果对象
            object[modelProperty] = res || defaultResult;
        }
        // 是否设置查询条件对象
        if(conditionObjectName) {
            object[conditionObjectName] = conditionObject;
        }
        model.updateState(object);
    }
    if(!res) {
        res = {};
    }
    // 返回数据
    return res.data;
}

/**
 * 通用post请求
 * @param {请求参数} params 
 * @param {请求路径} url 
 * @param {模块model} model 
 * @param {模块model需要设置的属性} modelProperty 
 */
export const commentPostRequest = async(params, url, model, modelProperty) => {
    // 待设置的modal对象
    let object = {};
    // 请求接口查询数据
    let res = await request(url, {
        method: "post",
        data: params,
    });
    /* 设置model对象 */
    if(model && modelProperty && res.data) {
        // 设置结果对象
        object[modelProperty] = res.data.data || res.data;
        model.updateState(object);
    }
    // 返回数据
    return res.data;
}

/********************************** 登录信息接口 **********************************/
/**
 * 获取当前登录用户信息
 * @param {参数} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const comment_getUserInfo = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/getUserInfo?1=1';
    // 返回数据
    return await commentGetRequest(params, url, model, modelProperty, conditionObjectName);
}

/********************************** 角色接口 **********************************/
/**
 * 查询角色集合
 * @param {参数} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const role_queryList = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/role/queryList?1=1';
    // 返回数据
    return await commentGetRequest(params, url, model, modelProperty, conditionObjectName);
}

/********************************** 资源接口 **********************************/
/**
 * 查询资源分页数据
 * @param {参数} params 分页条件必传，pageNum：页码，pageSize：页大小，roleId必传，searchConfig必传
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const resource_queryConfigPage = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/resource/queryConfigPage?1=1';
    // 返回数据
    return await commentGetRequest(params, url, model, modelProperty, conditionObjectName);
}