
import ReactDOM from 'react-dom';
import { Message } from 'tinper-bee';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

export const confirm = (confirmObj) => {
    if(confirmObj) {
        let buttons = [];
        if(confirmObj.buttons) {
            buttons = confirmObj.buttons;
        } else {
            buttons = [
                {
                  label: '确认',
                  onClick: () => console.log('Click Yes')
                },
                {
                  label: '取消',
                  onClick: () => console.log('Click No')
                }
            ]
        }
        confirmAlert({
            title: confirmObj.title || "确认",
            message: confirmObj.message || '是否确认？',
            buttons: buttons
        })
    } else {
        confirmAlert({
            title: "确认",
            message: '是否确认？',
            buttons: [
                {
                  label: '确认',
                  style: {
                    "background": "#1E7BE2",
                    "color": "#FFF"
                  },
                  onClick: () => console.log('Click Yes')
                },
                {
                  label: '取消',
                  onClick: () => console.log('Click No')
                }
            ]
        })
    }
}

export const Success = (msg, duration) => {
    Message.create({
        content: msg, color : 'success',
        style: {width:'100%', top:0, left:0, transform:'none'},
        duration: duration || 3,
    });
}

export const Error = (msg, duration) => {
    Message.create({
        content: msg, color : 'danger',
        style: {width:'100%', top:0, left:0, transform:'none'},
        duration: duration || 3,
    });
}

export const Warning = (msg, duration) => {
    Message.create({
        content: msg, color : 'warning',
        style: {width:'100%', top:0, left:0, transform:'none'},
        duration: duration || 3,
    });
}
/**
 * 数据返回统一处理函数
 * @param {*} response 
 * @param {*} successMsg 成功提示
 */
export const processData = (response,successMsg) => {
    if(typeof response != 'object') {
        Error('数据返回出错，服务异常');
        return false;
    }
    if(response && response.data) {
        if(successMsg) {
            Success(successMsg);
        }
        return response.data;
    } else {
        Error("请求失败");
        return false;
    }
}

/**
 * param拼接到url地址上
 * @param {*} url 
 * @param {*} params
 * @param {*} prefix 
 */
export const paramToUrl = (url,params,prefix) =>{
    if(!prefix)prefix='';
    if(url.indexOf('?')==-1){
        url += '?r='+Math.random();
    }
    for(let attr in params){
        if((attr=='pageIndex')||(attr=='pageSize')){
            url+='&'+attr+'='+params[attr];
        }else{
            url+='&'+prefix+attr+'='+params[attr];
        }
    }
    return url;
}

// 后台乱码转换
export const convert = (text) => {
    let element = document.createElement("p");
    element.innerHTML = text;
    let output = element.innerText || element.textContent; 
    console.log("output",output);
    element = null;
    return output;
}

export const setCookie = (name, value, options) => {

    options = options || {};
    if (value === null) {
        value = '';
        options.expires = -1;
    }
    var expires = '';
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
        var date;
        if (typeof options.expires == 'number') {
            date = new Date();
            date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
        } else {
            date = options.expires;
        }
        expires = '; expires=' + date.toUTCString();
    }
    var path = options.path ? '; path=' + options.path : '';
    var domain = options.domain ? '; domain=' + options.domain : '';
    var s = [ cookie, expires, path, domain, secure ].join('');
    var secure = options.secure ? '; secure' : '';
    var c = [ name, '=', encodeURIComponent(value) ].join('');
    var cookie = [ c, expires, path, domain, secure ].join('')
    document.cookie = cookie;

}

export const getCookie = (name) => {

    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    // 按照总设部规范，调整为下划线
    if(cookieValue != null && typeof cookieValue != 'undefined'){
        cookieValue = cookieValue.replace(/-/,"_");
    }
    return cookieValue;
}
