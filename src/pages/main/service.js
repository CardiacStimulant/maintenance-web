import request from "utils/request";
import axios from "axios";
//定义接口地址
const URL = {
    //服务记录URL
    "QUERY_LAST_SERVICE_RECORD_BY_CUSTOMER_ID" : `${GROBAL_HTTP_CTX}/service_record/queryLastServiceRecordByCustomerId`,    //查询客户最近的服务记录
    "GET_SERVICE_RECORD_CALL_HISTORY": `${GROBAL_HTTP_CTX}/service_record/getHistory`,   // 获取通话记录和服务记录
    "QUERY_SERVICE_RECORD_BY_STATUS" : `${GROBAL_HTTP_CTX}/service_record/querylistByStatus`,//根据状态查询服务单列表，后台取当前登录的客服ID
    "GET_SERVICE_RECORD_CALL": `${GROBAL_HTTP_CTX}/service_record/getServiceRecordAndServiceRecordCall`,// 查询服务单及服务通话记录

    //通话记录URL
    "QUERY_TODAY_SERVICE_RECORD_CALL_BY_STAFF" : `${GROBAL_HTTP_CTX}/service_record_call/queryTodayServiceRecordCallByStaff`, //查询客服当日的通话记录
    //服务小记日志URL
    "SAVE_SERVICE_RECORD_LOG": `${GROBAL_HTTP_CTX}/service_record_note/save`,
    "EDIT_SERVICE_RECORD_LOG": `${GROBAL_HTTP_CTX}/service_record_note/edit`,
    "DELETE_SERVICE_RECORD_LOG": `${GROBAL_HTTP_CTX}/service_record_note/delete`,
    //客户URL
    "SAVE_CUSTOMER": `${GROBAL_HTTP_CTX}/customer/save`,
    "UPDATE_CUSTOMER": `${GROBAL_HTTP_CTX}/customer/update`,

    "GET_SERVICE_RECORD": `${GROBAL_HTTP_CTX}/work_plat/getServiceRecord`,
    "UPDATE_SERVICE_RECORD_STATUS": `${GROBAL_HTTP_CTX}/work_plat/updateServiceRecordStatus`,
    "UPDATE_SERVICE_RECORD_CUSTOMER": `${GROBAL_HTTP_CTX}/work_plat/updateServiceRecordCustomer`,
    //获取拨号盘信息
    "GET_KEYBOARD_MODEL": `${GROBAL_HTTP_CTX}/work_plat/getCallPhoneVoByPhoneNumber`,
    /****************************** 呼叫中心 *************************************/
    "GET_QUEUE_CUSTOMERS": `${GROBAL_HTTP_CTX}/work_plat/getQueueCustomers`,
    //获取翻译信息
    "GET_TRANSLATE": `${GROBAL_HTTP_CTX}/service_record_translate/list`,
    //根据技能组查询客服
    "QUERY_STAFF_LIST_BY_GROUP_ID": `${GROBAL_HTTP_CTX}/staff/queryStaffListByGroupId`,
    //工单模板自定义字段接口
    "QUERY_PROPERTY_BY_SELECT_TEMPLATE_ID": `${GROBAL_HTTP_CTX}/work_order_template_property/queryPropertyBySelectTemplateId`,
    //保存工单
    "WORK_ORDER_ADD" : `${GROBAL_HTTP_CTX}/work_order/saveEntity`,
    "WORK_ORDER_TEMPLATE_ADD": `${GROBAL_HTTP_CTX}/work_order_template/workOrderTemplateSave`,
    //工单--附件
    "WORK_ORDER_MATERIAL_MULTIPLE_ADD": `${GROBAL_HTTP_CTX}/work_order_material/saveEntityMultiple`,
    //工单-关注人
    "WORK_ORDER_FOLLOWER_MULTIPLE_ADD": `${GROBAL_HTTP_CTX}/work_order_follower/saveEntityMultiple`,
    //工单状态流转接口
    "WORK_ORDER_STATUS_FLOW": `${GROBAL_HTTP_CTX}/work_order_flow/status_flow`,
    //其他接口
    "QUERY_LAST_WORK_ORDER_BY_CUSTOMER_ID" : `${GROBAL_HTTP_CTX}/rpc/work_order/queryLastWorkOrderByCustomerId`,    //查询客户最近的工单记录
    "QUERY_LAST_GET_FREE_AGENT" : `${GROBAL_HTTP_CTX}/agent/getFreeAgent`,    //在线空闲或小休坐席列表查询
    //呼叫转接Tranfer
    "CALL_TRANFER": `${GROBAL_HTTP_CTX}/call_center/transfer`,
    //取消转接
    "CALL_CANCEL_TRANFER" : `${GROBAL_HTTP_CTX}/call_center/cancelTransfer`,
    //确认转接接口
    "CALL_CONFIRM_TRANFER" : `${GROBAL_HTTP_CTX}/call_center/confirmTransfer`,
    //三方通话
    "CALL_THIRD_CONSULT" : `${GROBAL_HTTP_CTX}/call_center/thirdConsult`,
    //取消三方通话
    "CALL_CANCEL_THIRD_CONSULT" : `${GROBAL_HTTP_CTX}/call_center/cancelThirdConsult`,
    //重置坐席状态
    "CALL_CANCEL_INIT_STAFF_STATUS" : `${GROBAL_HTTP_CTX}/call_center/initStaffState`,
    //查询当前坐席服务组织列表
    "CALL_CANCEL_GET_STAFF_HOTLINE_ORGS" : `${GROBAL_HTTP_CTX}/call_center/getStaffHotlineOrgs`,
    //切换服务组织
    "CALL_CANCEL_CHANGE_STAFF_HOTLINE_ORG" : `${GROBAL_HTTP_CTX}/call_center/changeStaffHotlineOrg`,
}


/**
 * 查询通话记录
 * @param {*} params 
 */
export const getServiceRecordCall = (params) => {
    let url = URL.GET_SERVICE_RECORD_CALL + "?1=1"
    for (let attr in params) {
        url += '&search_' + attr + '=' + params[attr];
    }
    return request(url, {
        method: "post",
        data: params
    });
}



/**
 * 查询通话记录 &  服务总结记录
 * @param {*} params 
 */
export const getServiceRecordCallHistory = (params) => {
    let url = URL.GET_SERVICE_RECORD_CALL_HISTORY + "?1=1"
    for (let attr in params) {
        url += '&search_' + attr + '=' + params[attr];
    }
    return request(url, {
        method: "post",
        data: params
    });
}

/**
 * 保存服务日志
 * @param {*} params 
 */
export const saveServiceRecordLog = (params) => {
    return request(URL.SAVE_SERVICE_RECORD_LOG, {
        method: "post",
        data: params
    });
}

/**
 * 修改服务日志
 * @param {*} params 
 */
export const editServiceRecordLog = (params) => {
    return request(URL.EDIT_SERVICE_RECORD_LOG, {
        method: "post",
        data: params
    });
}

/**
 * 删除服务日志
 * @param {*} params 
 */
export const deleteServiceRecordLog = (params) => {
    return request(URL.DELETE_SERVICE_RECORD_LOG, {
        method: "post",
        data: params
    });
}

/**
 * 保存客户信息
 * @param {*} params 
 */
export const saveCustomer = params => {
    return request(URL.SAVE_CUSTOMER, {
        method: "post",
        data: params
    });
}

/**
 * 修改客户信息
 * @param {*} params 
 */
export const updateCustomer = params => {
    return request(URL.UPDATE_CUSTOMER, {
        method: "post",
        data: params
    });
}

/**
 * 获取排队等待客户信息
 * @param {*} params 
 */
export const getQueueCustomers = params => {
    return request(URL.GET_QUEUE_CUSTOMERS, {
        method: "post",
        param: params
    });
}

/** 获取客服未完成服务单
* @param {*} param 
*/
export const getServiceRecord = params => {
    let url = URL.GET_SERVICE_RECORD + "?1=1";
    for (let attr in params) {
        url += '&search_' + attr + '=' + params[attr];
    }
    return request(url, {
        method: "post",
        param: params
    });
}

export const updateServiceRecordStatus = params => {
    let url = URL.UPDATE_SERVICE_RECORD_STATUS + "?1=1";
    for (let attr in params) {
        url += '&search_' + attr + '=' + params[attr];
    }
    return request(url, {
        method: "post",
        param: params
    });
}

/**
 * 更新service_record的customerId
 */
export const updateServiceRecordCustomer = params => {
    let url = URL.UPDATE_SERVICE_RECORD_CUSTOMER + "?1=1";
    for (let attr in params) {
        url += '&search_' + attr + '=' + params[attr];
    }
    return request(url, {
        method: "post",
        param: params
    });
}

/**
 * 呼叫转接
 * @param {*} params 
 */
export const callTranfer = params => {
    let url = URL.CALL_TRANFER + "?1=1";
    for (let attr in params) {
        url += '&search_' + attr + '=' + params[attr];
    }
    return request(url, {
        method: "get",
        param: params
    });
}

/**
 *  获取拨号盘信息
* @param {*} param 
*/
export const getKeyBoardModel = params => {
    let url = URL.GET_KEYBOARD_MODEL + "?1=1";
    for (let attr in params) {
        url += '&search_' + attr + '=' + params[attr];
    }
    return request(url, {
        method: "post",
        param: params
    });
}

/**
 * 获取翻译信息
 */
export const getTranslate = params => {
    let url = URL.GET_TRANSLATE + "?1=1";
    for (let attr in params) {
        url += '&search_' + attr + '=' + params[attr];
    }
    return request(url, {
        method: "post",
        param: params
    });
}

/**
 * 查询技能组下的客服
 * @param {*} params 
 */
export const queryStaffListByGroupId = (params) => {
    let url = URL.QUERY_STAFF_LIST_BY_GROUP_ID + '?1=1';
    for (let attr in params) {
        url += '&search_' + attr + '=' + params[attr];
    }
    return request(url, {
        method: "get",
        data: params
    });
}
/**
 * 根据工单模板ID查询工单模板自定义属性信息--工单信息展示
 * @param {*} params 
 */
export const queryPropertyBySelectTemplateId = (params) => {
    let url = URL.QUERY_PROPERTY_BY_SELECT_TEMPLATE_ID + '?1=1';
    for (let attr in params) {
        url += '&search_' + attr + '=' + params[attr];
    }
    return request(url, {
        method: "get",
        data: params
    });
}
/**
 * 新增工单模板
 * @param {*} params 
 */
export const addWorkOrderTemplate = (params) => {
    return request(URL.WORK_ORDER_TEMPLATE_ADD, {
        method: "post",
        data: params
    });
}

/**
 * 新增工单附件--批量接口
 * @param {*} params
 */
export const saveMaterialMultiple = (params) => {
    return request(URL.WORK_ORDER_MATERIAL_MULTIPLE_ADD, {
        method: "post",
        data: params
    });
}
/**
 * 新增工单关注人-批量接口
 * @param {*} params
 */
export const saveFollowerMultiple = (params) => {
    return request(URL.WORK_ORDER_FOLLOWER_MULTIPLE_ADD, {
        method: "post",
        data: params
    });
}

/**
 * 工单状态流转
 * @param {*} params
 */
export const workOrderStatusFlow = (params) => {
    return request(URL.WORK_ORDER_STATUS_FLOW, {
        method: "post",
        data: params
    });
}
/**
 * 新增工单
 * @param {*} params
 */
export const addWorkOrder = (params) => {
    return request(URL.WORK_ORDER_ADD, {
        method: "post",
        data: params
    });
}

/**
 * 查询客户的最后一次服务记录
 * @param {*} params 
 */
export const queryLastServiceRecordByCustomerId = (params) => {
    let url =URL.QUERY_LAST_SERVICE_RECORD_BY_CUSTOMER_ID+'?1=1';
    for(let attr in params){
        url+='&search_'+attr+'='+params[attr];
    }
    return request(url, {
        method: "get",
        data: params
    });
}

/**
 * 查询客户的最后一次工单记录
 * @param {*} params 
 */
export const queryLastWorkOrderByCustomerId = (params) => {
    let url =URL.QUERY_LAST_WORK_ORDER_BY_CUSTOMER_ID+'?1=1';
    for(let attr in params){
        url+='&search_'+attr+'='+params[attr];
    }
    return request(url, {
        method: "get",
        data: params
    });
}

/**
 * 查询客服当日的通话记录
 * @param {*} params 
 */
export const queryTodayServiceRecordCallByStaff = (params) => {
    let url =URL.QUERY_TODAY_SERVICE_RECORD_CALL_BY_STAFF+'?1=1';
    for(let attr in params){
        url+='&search_'+attr+'='+params[attr];
    }
    return request(url, {
        method: "get",
        data: params
    });
}

/**
 * 根据状态查询服务单列表
 */

export const querylistByStatus = (params) => {
    let url =URL.QUERY_SERVICE_RECORD_BY_STATUS+'?1=1';
    for(let attr in params){
        url+='&search_'+attr+'='+params[attr];
    }
    return request(url, {
        method: "get",
        data: params
    });
}



  
/**
 * 在线空闲或小休坐席列表查询
 * @param {*} params
 */
export const getFreeAgent = (params) => {
    let url =URL.QUERY_LAST_GET_FREE_AGENT+'?1=1';
    for(let attr in params){
        url+='&'+attr+'='+params[attr];
    }
    return request(url, {
        method: "get",
        data: params
    });
}

/**
 * 取消转接
 * @param {*} params
 */
export const cancelTransfer = (params) => {
    let url =URL.CALL_CANCEL_TRANFER+'?1=1';
    for(let attr in params){
        url+='&'+attr+'='+params[attr];
    }
    return request(url, {
        method: "get",
        data: params
    });
}
/**
 * 确认转接接口
 * @param {*} params
 */
export const confirmTransfer = (params) => {
    let url =URL.CALL_CONFIRM_TRANFER+'?1=1';
    for(let attr in params){
        url+='&'+attr+'='+params[attr];
    }
    return request(url, {
        method: "get",
        data: params
    });
}
/**
 * 三方通话
 * @param {*} params
 */
export const thirdConsult = (params) => {
    let url =URL.CALL_THIRD_CONSULT+'?1=1';
    for(let attr in params){
        url+='&'+attr+'='+params[attr];
    }
    return request(url, {
        method: "get",
        data: params
    });
}
/**
 * 取消三方通话
 * @param {*} params
 */
export const cancelThirdConsult = (params) => {
    let url =URL.CALL_CANCEL_THIRD_CONSULT+'?1=1';
    for(let attr in params){
        url+='&'+attr+'='+params[attr];
    }
    return request(url, {
        method: "get",
        data: params
    });
}
/**
 * 查询当前坐席服务组织列表
 */
export const getStaffHotlineOrgs = () => {
    return request(URL.CALL_CANCEL_GET_STAFF_HOTLINE_ORGS, {
        method: "get"
    });
}

/**
 * 切换服务组织
 */
export const changeStaffHotlineOrg = (params) => {
    let url =URL.CALL_CANCEL_CHANGE_STAFF_HOTLINE_ORG+'?1=1';
    for(let attr in params){
        url+='&'+attr+'='+params[attr];
    }
    return request(url, {
        method: "get"
    });
}
/**
 * 重置坐席状态
 */
export const initStaffState = (params) => {
    let url =URL.CALL_CANCEL_INIT_STAFF_STATUS+'?1=1';
    for(let attr in params){
        url+='&'+attr+'='+params[attr];
    }
    return request(url, {
        method: "get"
    });
}
