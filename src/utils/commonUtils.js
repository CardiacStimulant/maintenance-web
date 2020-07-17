import $ from "jquery"

let timer = {};

/**
 * @description 计时器：需在model中定义timeStr字段,约定命名规则为"计时器名称+Str"形式即可。
 * @param {String} timerStr 注意：隐式变量名为timer，切勿在引用页面进行重复定义！
 */
export const timeKeeperStart = (timerStr) => {
    let HH = 0;
    let mm = 0;
    let ss = 0;
    let str = "";
    let timerKey = timerStr.substring(0, timerStr.length-3);
    let timerStrObj = {};
    clearInterval(timer[timerKey]);
    $("."+timerStr).html("");
    timer[timerKey] = setInterval(function(){
        str = "";
        if(++ss == 60) {
            if(++mm == 60) {
                HH++;
                mm = 0;
            }
            ss = 0;
        }
        str += HH < 10 ? "0"+HH : HH;
        str += ":";
        str += mm < 10 ? "0"+mm : mm;
        str += ":";
        str += ss < 10 ? "0"+ss : ss;
        timerStrObj[timerStr] = str;
        $("."+timerStr).html(str);
    },1000);
    
}

export const timeKeeperStop = (timerStr) => {
    let timerKey = timerStr.substring(0, timerStr.length-3);
    clearInterval(timer[timerKey]);
}

export const timeKeeperClear = (timerStr) => {
    timeKeeperStop(timerStr);
    $("."+timerStr).html("");
}

/**
 * @description 计算所占字节长度
 * @param {*} str 
 * @returns {Number}
 */
export const getByteLength = (str) => {
    if (str == null) return 0;
    if (typeof str != "string"){
      str += "";
    }
    return str.replace(/[^x00-xff]/g,"01").length;
}

/**
 * @description 按字节截取长度
 * @param {*} str 待处理字符串
 * @param {*} len 截取字节长度 中文2字节 英文1字节
 * @returns {String}
 */
export const subStringByByteLength = (str, len) => {
    // 正则表达式匹配中文
	let regexp = /[^\x00-\xff]/g;
	// 当字符串字节长度小于指定的字节长度时
	if (str.replace(regexp, "aa").length <= len) {
		return str;
	}
	// 假设指定长度内都是中文
	let m = Math.floor(len/2);
	for (let i = m, j = str.length; i < j; i++) {
		// 当截取字符串字节长度满足指定的字节长度
		if (str.substring(0, i).replace(regexp, "aa").length >= len) {
			return str.substring(0, i);
		}
	}
    return str;
}
export const tooltipFn = (value, lengths) => {
    const reg = [
        {'reg':/[\u4E00-\u9FA5]/g, 'length':16},
        {'reg':/[A-Z]/g, 'length':12},
        {'reg':/[a-z0-9]/g, 'length':9},
    ];
    lengths = lengths || 54;
    let _value = '';
	for (let i = 0; i < value.length; i++) {
        let lengthAll = 0;
        _value += value[i];
        reg.map(({reg, length})=>{
            _value.match(reg) && (lengthAll += _value.match(reg).length * length);
        });
        if(lengthAll > lengths){
            return _value.substring(0, i);
        }
    }
    return value;
}

/**
 * 替换字符串中的特殊字符
 * 替换+，空格，/，?，%，#，&，=
 * @param {*} str 
 */
export const replaceSpecialCharacters = (str) => {
    if(str && typeof(str)=='string') {
        return str.replace(/%/g,"%25").replace(/#/g,"%23").replace(/\+/g,"%2B").replace(/ /g,"%20").replace(/\//g,"%2F").replace(/\?/g,"%3F").replace(/&/g,"%26").replace(/=/g,"%3D");
    } else {
        return str;
    }
}