import request from "utils/request";
//定义接口地址
const URL = {
    "QUERY_PAGE" : `${GROBAL_HTTP_CTX}/userManager/queryPage`,  //查询用户管理分页数据
}

/**
 * 查询用户管理分页数据
 * @param {*} params 
 */
export const queryPage = (params) => {
    let url =URL.QUERY_PAGE+'?1=1';
    for(let attr in params){
        url+='&'+attr+'='+params[attr];
    }
    return request(url, {
        method: "get",
    });
}