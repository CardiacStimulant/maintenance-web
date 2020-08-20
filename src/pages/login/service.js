import request from "utils/request";
import * as commonUtils from 'utils/commonUtils';

//定义接口地址
const URL = {
    "LOGIN" : `${GROBAL_HTTP_CTX}/login`,  //查询用户管理分页数据
}

/**
 * 查询用户管理分页数据
 * @param {*} params 
 */
export const login = (params) => {
    let url =URL.LOGIN+'?1=1';
    for(let attr in params){
        // 特殊字符替换
        url+='&'+attr+'='+commonUtils.replaceSpecialCharacters(params[attr]);
    }
    return request(url, {
        method: "post",
    });
}