import axios from "axios";
import { Success, Warning, Error } from "utils";

export default (url, options) => {
    return axios({
        method: options.method,
        url: url,
        data: options.data,
        params: options.param
    }).catch(function (err) {
        console.log(err);
        if(err.response&&err.response.status==401){
            console.log("RBAC鉴权失败!"+err.response.data.msg);
            Error("用户未登录");
            window.location.href=`${GLOBAL_LOGIN_URL}`;
        }
    });
}
