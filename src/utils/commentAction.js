import request from "utils/request";
import { processData } from "utils";
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
        if(noSearchPrefix) {
            url += '&' + attr+'='+params[attr];
        } else {
            url += '&search_'+attr+'='+params[attr];
        }
        // 是否设置查询条件对象
        if(conditionObjectName) {
            conditionObject[attr] = params[attr];
        }
    }
    // 请求接口查询数据
    let res = processData(await request(url, {
        method: "get",
    }));
    /* 设置model对象 */
    if(model && modelProperty) {
        if(res) {
            // 设置结果对象
            object[modelProperty] = res.result || res || defaultResult;
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
    // 返回数据
    return res;
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
    let res = processData(await request(url, {
        method: "post",
        data: params,
    }));
    /* 设置model对象 */
    if(model && modelProperty && res) {
        // 设置结果对象
        object[modelProperty] = res.result || res;
        model.updateState(object);
    }
    // 返回数据
    return res;
}

/********************************** 号码接口 **********************************/
/**
 * 根据号码查询号码归属地
 * @param {参数：num 电话号码} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const mobile_getMobileInfoByNum = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/mobile/getMobileInfoByNum?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName, true);
}

/********************************** 用户接口 **********************************/
/**
 * 查询当前登录用户信息
 * @param {参数：不传参} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const userInfo_getUserInfo = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/user_info/getUserInfo?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName, true);
}

/********************************** 客服（员工账号）接口 **********************************/
/**
 * 查询客服分页数据
 * @param {参数：参照swagger接口文档说明} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const staff_list = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/staff/list?1=1';
    // 防止分页报错
    if(params){
        params.pageIndex = params.pageIndex ? params.pageIndex - 1 : 0;
        params.pageSize = params.pageSize ? params.pageSize : 10;
    }
    // 返回数据
    return await commentGetRequest(params, url, model, modelProperty, conditionObjectName);
}

/**
 * 查询客服数据集合（不分页）
 * @param {参数：参照swagger接口文档说明} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const staff_queryList = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/staff/queryList?1=1';
    // 返回数据
    return await commentGetRequest(params, url, model, modelProperty, conditionObjectName);
}

/**
 * 这个接口支持根据组织查询客服信息，返回的数据中，如果绑定过坐席，则ID为数字，
 * 如果没有绑定过，则ID为 iuap_id_....
 * @param {参数：参照swagger接口文档说明} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const staff_queryStaffs = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/staff/queryStaffs?1=1';
    // 返回数据
    return await commentGetRequest(params, url, model, modelProperty, conditionObjectName, true);
}

/**
 * 查询当前登录用户的客服信息
 * @param {参数：参照swagger接口文档说明} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const staff_queryStaffByLoginId = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/staff/getStaffByLoginId?1=1';
    // 返回数据
    return await commentGetRequest(params, url, model, modelProperty, conditionObjectName);
}

/**
 * 获取技能组下的客服
 * @param {参数：groupId 技能组ID} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 * @param {是否需要添加search_前缀，true则不需要加，false或不传，则需要加} noSearchPrefix 
 */
export const staff_queryStaffListByGroupId = async (params, model, modelProperty, prefixUrl, conditionObjectName, noSearchPrefix) => {
    // 请求地址
    let url = prefixUrl + '/staff/queryStaffListByGroupId?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName, noSearchPrefix);
}

/**
 * 根据ID获取客服信息
 * @param {参数：id 客服ID} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const staff_getStaffById = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    if(params && params.id) {
        // 请求地址
        let url = prefixUrl + '/staff/getStaffById?1=1';
        // 返回数据
        return commentGetRequest(params, url, model, modelProperty, conditionObjectName, true);
    }
}

/**
 * 新增保存客服信息
 * @param {参数：客服信息，参照swagger接口文档} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 */
export const staff_save = async (params, model, modelProperty, prefixUrl) => {
    if(params) {
        // 请求地址
        let url = prefixUrl + '/staff/save';
        // 返回数据
        return commentPostRequest(params, url, model, modelProperty);
    }
}

/**
 * 编辑保存客服信息
 * @param {参数：客服信息，参照swagger接口文档} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const staff_update = async (params, model, modelProperty, prefixUrl) => {
    if(params) {
        // 请求地址
        let url = prefixUrl + '/staff/update';
        // 返回数据
        return commentPostRequest(params, url, model, modelProperty);
    }
}

/**
 * 根据ID删除客服信息
 * @param {参数：id 客服ID} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const staff_delete = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    if(params && params.id) {
        // 请求地址
        let url = prefixUrl + '/staff/delete?1=1';
        // 返回数据
        return commentGetRequest(params, url, model, modelProperty, conditionObjectName, true);
    }
}

/********************************** 数据字典接口 **********************************/
/**
 * 查询数据字典集合（不分页，查询全部）
 * @param {参数：dictionaryType 字典类型【customer_tag 客户标签，service_type 服务类别】} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const dictionary_queryDictionaryByType = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/dictionary/queryDictionaryByType?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName, true);
}

/********************************** 客户接口 **********************************/
/**
 * 查询分页数据
 * @param {查询条件} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const customer_querylistByPage = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    if(params) {
        // 请求地址
        let url = prefixUrl + '/customer/querylistByPage?1=1';
        // 返回数据
        return commentGetRequest(params, url, model, modelProperty, conditionObjectName, false, {});
    }
}

/**
 * 查询不分页数据
 * @param {查询条件} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const customer_querylist = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    if(params) {
        // 请求地址
        let url = prefixUrl + '/customer/querylist?1=1';
        // 返回数据
        return commentGetRequest(params, url, model, modelProperty, conditionObjectName);
    }
}

/**
 * 根据客户ID查询客户信息
 * @param {参数：id 客户ID} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const customer_get = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    if(params && params.id) {
        // 请求地址
        let url = prefixUrl + '/customer/get?1=1';
        // 返回数据
        return commentGetRequest(params, url, model, modelProperty, conditionObjectName, false, {});
    }
}

/**
 * 保存客户信息（新增/修改）
 * @param {参数} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const customer_save = async (params, model, modelProperty, prefixUrl) => {
    if(params) {
        // 请求地址
        let url = prefixUrl + '/customer/save';
        // 返回数据
        return commentPostRequest(params, url, model, modelProperty);
    }
}

/**
 * 打开弹屏号码
 * @param {参数：客户对象} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 */
export const customer_screenOn = async (params, model, modelProperty, prefixUrl) => {
    if(params) {
        // 请求地址
        let url = prefixUrl + '/customer/screenOn';
        // 返回数据
        return commentPostRequest(params, url, model, modelProperty);
    }
}

/**
 * 关闭弹屏号码
 * @param {参数：id} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 */
export const customer_screenOff = async (params, model, modelProperty, prefixUrl) => {
    if(params) {
        // 请求地址
        let url = prefixUrl + '/customer/screenOff?1=1';
        // 返回数据
        return commentGetRequest(params, url, model, modelProperty, "", true);
    }
}

/**
 * 根据IUAP客户ID查询联系人信息（不分页数据）
 * @param {参数：{id：IUAP客户ID}} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const customer_getContactListByCustomerId = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    if(params) {
        // 请求地址
        let url = prefixUrl + '/customer/getContactListByCustomerId?1=1';
        // 返回数据
        return commentGetRequest(params, url, model, modelProperty, conditionObjectName, true);
    }
}

/**
 * 根据IUAP客户ID查询联系人信息（分页数据）
 * @param {参数：{id：IUAP客户ID}} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const customer_getContactPageByCustomerId = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    if(params) {
        // 请求地址
        let url = prefixUrl + '/customer/getContactPageByCustomerId?1=1';
        // 返回数据
        return commentGetRequest(params, url, model, modelProperty, conditionObjectName, false, {});
    }
}

/**
 * 根据IUAP客户ID查询联系地址信息（分页数据）
 * @param {参数：{id：IUAP客户ID}} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const customer_getContactAddressPageByCustomerId = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    if(params) {
        // 请求地址
        let url = prefixUrl + '/customer/getContactAddressPageByCustomerId?1=1';
        // 返回数据
        return commentGetRequest(params, url, model, modelProperty, conditionObjectName, false, {});
    }
}

/**
 * 查询客户字段的枚举字典信息
 * @param {参数：{
 *                  type：不传，查询全部，
 *                  枚举：customerClass，客户分类，customerLevel，客户级别，customerArea，销售区域，customerIndustry，客户行业
 *              }
 *        } params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const customer_getPropertyEnum = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/customer/getPropertyEnum?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName, true, {});
}

/********************************** 技能组接口 **********************************/
/**
 * 查询技能组list
 * @param {参数：参照swagger接口文档说明} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const staffGroup_queryList = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/staff_group/queryList?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName);
}

/**
 * 根据类型，查询技能组list
 * @param {参数：serviceTool 技能组类型，参数值【cc：电话客服 im：在线客服 wo：工单客服】，不传，则默认查询全部} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const staffGroup_queryListByServiceTool = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/staff_group/queryListByServiceTool?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName, true);
}

/**
 * 根据ID获取技能组信息
 * @param {参数：id 技能组ID} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const staffGroup_getStaffGroupById = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    if(params && params.id) {
        // 请求地址
        let url = prefixUrl + '/staff_group/getStaffGroupById?1=1';
        // 返回数据
        return commentGetRequest(params, url, model, modelProperty, conditionObjectName, true);
    }
}

/**
 * 根据客服ID查询归属技能组信息
 * @param {参数：staffId 客服ID} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const staffGroup_queryStaffGroupListByStaffId = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    if(params && params.staffId) {
        // 请求地址
        let url = prefixUrl + '/staff_group/queryStaffGroupListByStaffId?1=1';
        // 返回数据
        return commentGetRequest(params, url, model, modelProperty, conditionObjectName, true);
    }
}

/********************************** 组织扩展信息接口 **********************************/
/**
 * 根据组织ID查询组织职能信息和描述信息
 * @param {参数：iuapOrganizationId} params 组织ID
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const organizationextend_queryByIuapOrganizationId = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/organizationextend/queryByIuapOrganizationId?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName, true);
}

/********************************** 组织接口 **********************************/
/**
 * 根据组织机构树形结构数据
 * @param {参数，参照swagger接口参数} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const organization_tree = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/organization/tree?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName, true);
}

/**
 * 查询租户所有组织
 * @param {参数，参照swagger接口参数} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const organization_list = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/organization/list?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName, true, []);
}

/**
 * 上移/下移/升级/降级
 * @param {参数，参照swagger接口参数} params id  组织ID type 类型 上移：up  下移：down  升级：upgrade  downgrade：降级
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const organization_updateNumOrLevel = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/organization/updateNumOrLevel?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName, true);
}

/**
 * 新增保存组织机构信息
 * @param {参数：组织机构信息，参照swagger接口文档} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 */
export const organization_save = async (params, model, modelProperty, prefixUrl) => {
    // 请求地址
    let url = prefixUrl + '/organization/save';
    // 返回数据
    return commentPostRequest(params, url, model, modelProperty);
}

/**
 * 编辑保存组织机构信息（部分更新）
 * @param {参数：组织机构信息，参照swagger接口文档} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 */
export const organization_updatePart = async (params, model, modelProperty, prefixUrl) => {
    // 请求地址
    let url = prefixUrl + '/organization/updatePart';
    // 返回数据
    return commentPostRequest(params, url, model, modelProperty);
}

/********************************** 组织关系接口 **********************************/
/**
 * 查询所有可选择的服务商组织（上下级组织关系）信息
 * @param {参数：参照swagger接口文档说明} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const organizationRelation_queryAll = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/organizationRelation/queryAll?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName);
}
/********************************** 工单模板接口 **********************************/
/**
 * 查询所有可选择的工单模板
 * @param {参数：参照swagger接口文档说明} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const workOrderTemplate_queryAll = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/work_order_template/queryAll?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName);
}

/********************************** 工单接口 **********************************/
/**
 * 查询工单分页数据
 * @param {参数：参照swagger接口文档说明} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const workOrder_querylist = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/work_order/querylist?1=1';
    // 防止分页报错
    if(params){
        params.pageIndex = params.pageIndex ? params.pageIndex - 1 : 0;
        params.pageSize = params.pageSize ? params.pageSize : 10;
    }
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName);
}

/**
 * 根据工单编号，查询下游工单分页数据
 * @param {参数：originSerialNumber 来源单号} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const workOrder_queryLowWorkOrderBySerialNumber = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/work_order/queryLowWorkOrderBySerialNumber?1=1';
    // 防止分页报错
    if(params){
        params.pageIndex = params.pageIndex ? params.pageIndex - 1 : 0;
        params.pageSize = params.pageSize ? params.pageSize : 10;
    }
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName);
}

/********************************** 工单历史记录接口 **********************************/
/**
 * 查询工单历史（分页）
 * @param {参数：参照swagger接口文档说明} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const workOrderLog_list = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/work_order_log/list?1=1';
    // 防止分页报错
    if(params){
        params.pageIndex = params.pageIndex ? params.pageIndex - 1 : 0;
        params.pageSize = params.pageSize ? params.pageSize : 10;
    }
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName);
}

/**
 * 查询工单历史（不分页）
 * @param {参数：参照swagger接口文档说明} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const workOrderLog_querylist = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/work_order_log/queryList?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName);
}

/********************************** 工单催单接口 **********************************/
/**
 * 查询工单催单次数
 * @param {参数：workOrderId 工单ID} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const workOrderPrompt_getPromptCount = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/work_order_Prompt/getPromptCount?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName, true);
}

/********************************** 问题分类接口 **********************************/
/**
 * 查询问题分类
 * @param {*} param 参数：{
 *                          type：问题分类类别，具体数值：question（服务单问题分类）, workorder（工单问题分类）
                            parentId: -1,   父级ID，查询全部，传-1
 *                        }
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const question_queryQuestionTypes = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/question/findQuestionTypes?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName, true);
}

/********************************** 其他接口 **********************************/
/**
 * 查询详情页，历史记录
 * 目前查询服务记录，工单记录
 * @param param 参数：{ searchDateGroupStr：时间，
 *                      logType：历史类型，参数值：serviceLog 服务日志
 *                                               workOrderLog 工单日志
 *                      customerId: 客户ID
 *                    }
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const serviceRecord_queryHistoryLogPageByType = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    if(params) {
        // 请求地址
        let url = prefixUrl + '/service_record/queryHistoryLogPageByType?1=1';
        // 返回数据
        return commentGetRequest(params, url, model, modelProperty, conditionObjectName);
    }
}

/********************************** 呼叫配置 **********************************/
/**
 * 查询呼叫相关配置
 * @param {无参数} params 
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const callconfig_get = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/callconfig/get?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName);
}

/********************************** 操作日志 **********************************/
/**
 * 查询操作日志列表（分页）
 * @param {参数，参照swagger接口参数} params pageIndex和pageSize：分页，businessId：业务ID，businessType：业务类型
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const operationLog_list = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/log/list?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName);
} 
/********************************** 附件接口 **********************************/
/**
 * 批量保存附件信息
 * @param {参数：批量保存附件信息，参照swagger接口文档} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 */
export const baseMaterial_saveEntityMultiple = async (params, model, modelProperty, prefixUrl) => {
    if(params) {
        // 请求地址
        let url = prefixUrl + '/base_material/saveEntityMultiple';
        // 返回数据
        return commentPostRequest(params, url, model, modelProperty);
    }
}

/**
 * 查询附件信息
 * @param {参数：批量保存附件信息，参照swagger接口文档} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 */
export const baseMaterial_queryMaterialsByBusinessIdAndBusinessType = async (params, model, modelProperty, prefixUrl) => {
    if(params) {
        // 请求地址
        let url = prefixUrl + '/base_material/queryMaterialsByBusinessIdAndBusinessType?1=1';
        // 返回数据
        return commentGetRequest(params, url, model, modelProperty);
    }
}

/********************************** 权限接口 **********************************/
/**
 * 获取权限列表
 * @param {String} serviceCode 原子服务编码
 */
export const getRoleList = async (serviceCode, model, modelProperty) => {
    if(serviceCode) {
        const res = processData(await request(GROBAL_HTTP_CTX+"/button/queryList", {
            method: 'get',
            param: { serviceCode }
        }));
        let object = {};
        /* 设置model对象 */
        if(model && modelProperty) {
            if(res) {
                // 设置结果对象
                object[modelProperty] = res;
            }
            model.updateState(object);
        }
        return res || [];
    }
}

/********************************** 黑名单接口 **********************************/
/**
 * 查询黑名单列表（分页）
 * @param {参数} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const phoneBlack_selectAllByPage = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/phone_black/selectAllByPage?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName, false, {});
} 

/********************************** 工作台字段接口 **********************************/
/**
 * 查询工作台字段列表（分页）
 * @param {参数} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const workfield_selectAllByPage = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/workfield/selectAllByPage?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName, false, {});
}

/**
 * 查询工作台字段列表（不分页）
 * @param {参数} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 * @param {是否需要添加search_前缀，true则不需要加，false或不传，则需要加} noSearchPrefix 
 */
export const workfield_queryList = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/workfield/queryList?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName);
}

/********************************** 自定义属性接口 **********************************/
/**
 * 查询自定义属性列表（不分页）
 * @param {参数} params entityName：实体名称【customer（客户），service_record（服务单），sale_order（销售订单）】
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 * @param {是否需要添加search_前缀，true则不需要加，false或不传，则需要加} noSearchPrefix 
 */
export const customProperty_queryPropertyList = async (params, model, modelProperty, prefixUrl, conditionObjectName) => {
    // 请求地址
    let url = prefixUrl + '/custom_property/querylist?1=1';
    // 返回数据
    return commentGetRequest(params, url, model, modelProperty, conditionObjectName);
}

/********************************** 计费鉴权接口 **********************************/
/**
 * 计费鉴权
 * @param {参数} params
 * @param {对应各模块的model} model
 * @param {model需要设置的属性} modelProperty
 * @param {请求地址前缀} prefixUrl
 * @param {查询条件对象名称，不为空，则设置model的查询条件对象} conditionObjectName 
 */
export const funcAuth = async (serviceCode) => {
    // 请求地址
    let url = '/IS-server/fi_auth/funcAuth?serviceCode=' + serviceCode;
    // 返回数据
    return commentGetRequest({}, url);
} 