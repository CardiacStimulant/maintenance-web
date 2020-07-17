//常量类
// 原子服务编码
 export const YYCTIC001001 = "YYCTIC001001"; // 组织授权管理
 export const YYCTIC001002 = "YYCTIC001002"; // 计费账户管理
 export const YYCTIC001003 = "YYCTIC001003"; // 交易记录查询
 export const YYCTIC001004 = "YYCTIC001004"; // 技能组管理
 export const YYCTIC001005 = "YYCTIC001005"; // 坐席管理
 export const YYCTIC001006 = "YYCTIC001006"; // 计费账户查询
 export const YYCTIC002001 = "YYCTIC002001"; // 客户标签设置
 export const YYCTIC002002 = "YYCTIC002002"; // 客户自定义
 export const YYCTIC002003 = "YYCTIC002003"; // 客户中心
 export const YYCTIC002004 = "YYCTIC002004"; // 电话弹屏管理
 export const YYCTIC002005 = "YYCTIC002005"; // 黑名单管理
 export const YYCTIC003001 = "YYCTIC003001"; // 自定义音频
 export const YYCTIC003002 = "YYCTIC003002"; // 号码IVR导航
 export const YYCTIC003003 = "YYCTIC003003"; // 号码服务时间
 export const YYCTIC003004 = "YYCTIC003004"; // 坐席分配策略
 export const YYCTIC003005 = "YYCTIC003005"; // 服务总结设置
 export const YYCTIC003006 = "YYCTIC003006"; // 电话满意度评价
 export const YYCTIC003007 = "YYCTIC003007"; // 热线服务设置
 export const YYCTIC003008 = "YYCTIC003008"; // 服务总结自定义
 export const YYCTIC003009 = "YYCTIC003009"; // 工作台字段
 export const YYCTIC003010 = "YYCTIC003010"; // 智能电话翻译
 export const YYCTIC003011 = "YYCTIC003011"; // 热线服务方式
 export const YYCTIC004001 = "YYCTIC004001"; // 热线工作台
 export const YYCTIC004002 = "YYCTIC004002"; // 我的服务记录
 export const YYCTIC004003 = "YYCTIC004003"; // 我接待过的服务记录
 export const YYCTIC004004 = "YYCTIC004004"; // 我回拨过的服务记录
 export const YYCTIC004005 = "YYCTIC004005"; // 我所在技能组的服务记录
 export const YYCTIC004006 = "YYCTIC004006"; // 组织的服务记录
 export const YYCTIC004007 = "YYCTIC004007"; // 内部通话管理
 export const YYCTIC004008 = "YYCTIC004008"; // 呼损来电管理
 export const YYCTIC004009 = "YYCTIC004009"; // 电话留言管理
 export const YYCTIC004010 = "YYCTIC004010"; // 个人热线设置
 export const YYCTIC004011 = "YYCTIC004011"; // 热线坐席汇总报表
 export const YYCTIC004012 = "YYCTIC004012"; // 热线技能组汇总报表
 export const YYCTIC004013 = "YYCTIC004013"; // 坐席通话监听
 export const YYCTIC005001 = "YYCTIC005001"; // 工单分类设置
 export const YYCTIC005002 = "YYCTIC005002"; // 工单模板设置
 export const YYCTIC005003 = "YYCTIC005003"; // 工单自定义字段
 export const YYCTIC005004 = "YYCTIC005004"; // 工单触发器
 export const YYCTIC006001 = "YYCTIC006001"; // 待我处理的
 export const YYCTIC006002 = "YYCTIC006002"; // 我创建的
 export const YYCTIC006003 = "YYCTIC006003"; // 我参与的
 export const YYCTIC006004 = "YYCTIC006004"; // 我关闭的
 export const YYCTIC006005 = "YYCTIC006005"; // 我关注的
 export const YYCTIC006006 = "YYCTIC006006"; // 我的工单
 export const YYCTIC006007 = "YYCTIC006007"; // 我的技能组未接单
 export const YYCTIC006008 = "YYCTIC006008"; // 我的跨组织下游工单
 export const YYCTIC006009 = "YYCTIC006009"; // 组织的全部工单
 export const YYCTIC006010 = "YYCTIC006010"; // 组织的跨组织下游工单
 export const YYCTIC006011 = "YYCTIC006011"; // 组织的跨组织上游工单
 export const YYCTIC006012 = "YYCTIC006012"; // 我所在技能组的工单
 export const YYCTIC007001 = "YYCTIC007001"; // 短信模板设置
 export const YYCTIC008001 = "YYCTIC008001"; // 我的发送记录
 export const YYCTIC008002 = "YYCTIC008002"; // 组织的发送记录
 export const YYCTIC008003 = "YYCTIC008003"; // 短信发送
 export const YYCTIC008004 = "YYCTIC008004"; // 短信报表
 export const YYCTIC009001 = "YYCTIC009001"; // 技能组电话分析
 export const YYCTIC009002 = "YYCTIC009002"; // 坐席电话分析
 export const YYCTIC009003 = "YYCTIC009003"; // 坐席电话满意度分析
 export const YYCTIC009004 = "YYCTIC009004"; // 坐席服务量统计
 export const YYCTIC009005 = "YYCTIC009005"; // 电话周期汇总统计


/**
 * phoneStatus通话状态常量
 */
export const HANGUP = "hangup"; //挂断
export const CALLIN_RING = "callin_ring"; //呼入振铃
export const CALLIN_ANSWER = "callin_answer"; //来电接听
export const CALLOUT_RING = "callout_ring"; //呼出振铃
export const CALLOUT_ANSWER = "callout_answer"; //呼出被接
export const CALLED_AFTER_WORK = "called_after_work"; //话后处理

/**
 * phoneThirdStatus第三方通话状态常量
 */
export const CALLOUT_PEER_RINGING = "peerRinging"; //对端坐席振铃
export const CALLOUT_PEER_TALKING = "peerTalking"; //对端坐席接通
export const CALLOUT_PEER_HANUGP = "peerHangup"; //对端坐席挂断
export const CALLIN_MONITOR_RINGING = "monitorRinging"; //监听坐席振铃
export const CALLIN_MONITOR_TALKING = "monitorTalking"; //监听坐席接通
export const CALLIN_MONITOR_HANGUP = "monitorHangup"; //监听坐席挂断
export const CALLIN_CANCEL_TRANSFER = "cancelTransfer"; //询转中取消转接
export const CALLIN_CANFIRM_TRANSFER = "confirmTransfer"; //询转中确认转接
export const CALLIN_RING_THIRD_PARTY = "callin_ring_third_party"; //三方通话呼入振铃
export const CALLIN_ANSWER_THIRD_PARTY = "callin_answer_third_party"; //三方通话呼入接听

export const QUESTION_PROCESS_TOBESOLVE = "tobesolve";   // 待解决
export const QUESTION_PROCESS_SOLVING = "solving";   // 解决中
export const QUESTION_PROCESS_RESOLVED = "resolved";   // 已解决
export const QUESTION_PROCESS_NONEEDSOLVE = "noneedsolve";   // 无需解决

export const SERVICE_RECORD_LOG_ENTER_TYPE_SYSTEM = "system";
export const SERVICE_RECORD_LOG_ENTER_TYPE_MANUAL = "manual";
export const SERVICE_RECORD_LOG_ENTER_TYPE_NOTE = "note";

/** 自定义属性实体类别 */
export const CUSTOM_PROPERTY_ENTITY_CUSTOMER = "customer";  // 客户
export const CUSTOM_PROPERTY_ENTITY_SERVICE_RECORD = "service_record";  // 服务单
export const CUSTOM_PROPERTY_ENTITY_WORK_ORDER = "work_order";  // 工单
export const CUSTOM_PROPERTY_ENTITY_SALE_ORDER = "sale_order";  // 销售订单

/** 自定义属性类型 */
export const CUSTOM_PROPERTY_SET_TYPE_FIX = "fix";  // 固定字段
export const CUSTOM_PROPERTY_SET_TYPE_CUSTOM_FIX = "custom_fix";  // 自定义固定字段
export const CUSTOM_PROPERTY_SET_TYPE_CUSTOM = "custom";  // 自定义字段

//  页面各种计时器
export const PHONE_STATUS_TIMER_STR = "phoneStatusTimerStr";    //通话状态计时器HH:mm:ss
export const THIRD_PARTY_TIMER_STR = "thirdPartyTimerStr";      //第三方通话计时器HH:mm:ss
export const STAFF_SERVICE_TIMER_STR = "staffServiceTimerStr";  //服务时间计时器HH:mm:ss
export const STAFF_STATUS_TIMER_STR = "staffStatusTimerStr";    //客服状态计时器HH:mm:ss
export const AGENT_RINGING_TIMER_STR = "agentRingingTimerStr";  //客服振铃计时器HH:mm:ss

export const STAFF_STATUS_IDLE = "idle";    //在线（空闲）
export const STAFF_STATUS_REST = "rest";    //小休
export const STAFF_STATUS_OFFLINE = "offline";      //离线

//用户角色
export const ADMIN = "admin";   //系统管理员
export const ROLE_CC = "role_cc"; //电话客服
export const ROLE_EPR_ADMIN = "role_epr_admin";   //企业管理员
export const STAFF_ROLE_ADMIN = "staff_role_admin";   //客服管理员
export const STAFF_ROLE_COMMON = "staff_role_common"; //普通客服
export const STAFF_ROLE_ORDER = "staff_role_order";   //工单客服

/**
 * 创建渠道/类型
 */
export const SERVICE_TOOL_CC = "cc";    // 热线客服
export const SERVICE_TOOL_IM = "im";
export const SERVICE_TOOL_WO = "wo";    // 工单客服
export const SERVICE_TOOL_CC_GL = "cc_gl";  // 热线组长
export const SERVICE_TOOL_WO_GL = "wo_gl";  // 工单组长

/**
 * 启用/禁用
 */
export const ENABLE = "enable";
export const DISABLE = "disable";

/**
 * 工单附件业务类型
 */
export const MATERIAL_BUSINESS_TYPE_ORDER = "order";
export const MATERIAL_BUSINESS_TYPE_COMMUNICATION = "communication";
export const MATERIAL_BUSINESS_TYPE_RECEIPT = "receipt";

/**
 * 附件业务类型
 */
export const MATERIAL_BUSINESS_TYPE_SERVICE_RECORD = "serviceRecord";

/**
 * 工单状态
 * 待分配(undistribute),已分配(distributed),已接单(receipt)，进行中(processing)，已完成(finish),
 * 已作废(cancel),已删除(delete),已关闭(close)
 */
export const WORK_ORDER_STATUS_UNDISTRIBUTE = "undistribute";
export const WORK_ORDER_STATUS_DISTRIBUTED = "distributed";
export const WORK_ORDER_STATUS_RECEIPT = "receipt";
export const WORK_ORDER_STATUS_PROCESSING = "processing";
export const WORK_ORDER_STATUS_FINISH = "finish";
export const WORK_ORDER_STATUS_CANCEL = "cancel";
export const WORK_ORDER_STATUS_DELETE = "delete";
export const WORK_ORDER_STATUS_CLOSE = "close";

/**
 * 工单状态流转操作
 */
export const WORK_ORDER_STATUS_FLOW_ADD = "add";   //新增
export const WORK_ORDER_STATUS_FLOW_EDIT = "edit";   //编辑
export const WORK_ORDER_STATUS_FLOW_DISTRIBUTION = "distribution";   //分配
export const WORK_ORDER_STATUS_FLOW_REVOKE = "revoke";   //撤回
export const WORK_ORDER_STATUS_FLOW_REFUSE = "refuse";   //拒绝
export const WORK_ORDER_STATUS_FLOW_ACCEPTANCE = "acceptance";    //接单
export const WORK_ORDER_STATUS_FLOW_TRANSFER = "transfer";  //转派
export const WORK_ORDER_STATUS_FLOW_BEGIN_WORK = "beginWork";    //开始工作
export const WORK_ORDER_STATUS_FLOW_REVOKE_BEGIN_WORK = "revokeBeginWork"; //撤销开始
export const WORK_ORDER_STATUS_FLOW_FINISH = "finish";    //完成
export const WORK_ORDER_STATUS_FLOW_REVOKE_FINISH = "revokeFinish"; //撤销完成
export const WORK_ORDER_STATUS_FLOW_VOID = "void";  //作废
export const WORK_ORDER_STATUS_FLOW_DELETE = "delete";    //删除
export const WORK_ORDER_STATUS_FLOW_REMINDER = "reminder";    //催单
export const WORK_ORDER_STATUS_FLOW_EVALUATION = "evaluation";    //回访
export const WORK_ORDER_STATUS_FLOW_CLOSE = "close";    //关闭
export const WORK_ORDER_STATUS_FLOW_REOPEN = "open";    //重新打开
export const WORK_ORDER_STATUS_FLOW_RECYCLE_DISTRIBUTION = "recycle_distribution";  //回收分配
export const WORK_ORDER_STATUS_FLOW_RECYCLE_VOID = "recycle_void"; //回收作废

/**
 * 工单权限
 */
export const WORK_ORDER_LIST_TYPE_GROUP_ALL = "groupAll";  //组织的全部工单
export const WORK_ORDER_LIST_TYPE_GROUP_HIGHER = "groupHigher";  //组织的跨组织上游工单
export const WORK_ORDER_LIST_TYPE_GROUP_LOWER = "groupLower";  //组织的跨组织下游工单
export const WORK_ORDER_LIST_TYPE_MY_GROUP_LOWER = "myGroupLower";  //我的跨组织下游工单
export const WORK_ORDER_LIST_TYPE_STAFF_GROUP = "staffGroup"; //我的技能组未接单的工单
export const WORK_ORDER_LIST_TYPE_MY_STAFF_GROUP = "myStaffGroup"; //我所在技能组工单
export const WORK_ORDER_LIST_TYPE_MY = "my"; //我的工单
export const WORK_ORDER_LIST_TYPE_FOLLOW = "follow";  //我关注的工单
export const WORK_ORDER_LIST_TYPE_CLOSE = "close";  //我关闭的工单
export const WORK_ORDER_LIST_TYPE_INVOLVE = "involve";  //我参与的工单
export const WORK_ORDER_LIST_TYPE_CREATE = "create";  //我创建的工单
export const WORK_ORDER_LIST_TYPE_PENDING = "pending";  //待我处理的工单

/**
 * 引用新增工单组件，父组件的位置
 */
export const CC_IMPORT = "cc";  //电话工作台
export const CALL_HISTORY_IMPORT = "callHistory"; // 历史通话
export const IM_IMPORT = "im"; //在线工作台
export const IM_HISTORY_IMPORT ="imHistory";     //历史会话

export const CUSTOMER_TAG = "customer_tag"; //客户标签
export const SERVICE_TYPE = "service_type"; //服务类别

export const ACCESS_TYPE_WEIXIN = "weixin";    //来访类型--微信

// 列表页查询条件栅格默认分割
export const attrs = {
    lg:3,
    md:6,
    sm:6,
    xs:12,
};

export const ORGANIZATION_COMPANY = "company"; // 公司
export const ORGANIZATION_DISTRIBUTOR = "distributor";  // 经销商
export const ORGANIZATION_CUSTOM = "custom";   // 自定义组织

/** 操作记录类型 */
export const OPERATION_BUSINESS_TYPE_STAFF = "staff";
export const OPERATION_BUSINESS_TYPE_CUSTOMER = "customer";
export const OPERATION_BUSINESS_TYPE_CUSTOM_DATA = "custom_data";
export const OPERATION_BUSINESS_TYPE_HOTLINE_SERVICE = "hotline_service";
export const OPERATION_BUSINESS_TYPE_SERVICE_RECORD = "service_record";
export const OPERATION_BUSINESS_TYPE_ORGANIZATION_RELATION = "organization_relation";
export const OPERATION_BUSINESS_TYPE_PHONE_TAG = "phone_tag";   // 黑名单
export const OPERATION_TYPE_ADD = "add";
export const OPERATION_TYPE_UPDATE = "update";
export const OPERATION_TYPE_DELETE = "delete";

/**
 * 呼叫类型
 */
export const CALL_DIRECTION_IN = "in";
export const CALL_DIRECTION_OUT = "out";

/**
 * 接听方式
 */
export const ANSWER_TYPE_WEB = "web";   // PC电脑（仅web）
export const ANSWER_TYPE_EXT = "ext";    // PC+SIP话机
export const ANSWER_TYPE_PHONE = "phone";    // 手机（仅第三方号码接听）
export const ANSWER_TYPE_SIP = "sip";    // SIP话机


/***
 * 电话服务  常量
 */
export const SERVER_LIST_TYPE_MY_SERVER_RECORD = "finalHandleByUser";  //我的服务记录
export const SERVER_LIST_TYPE_MY_RECEPRION_SERVER_RECORD = "servicedByUser";  //我接待过的服务记录
export const SERVER_LIST_TYPE_MY_CALLBACK_SERVER_RECORD = "callbackByUser";  //我回拨过的服务记录
export const SERVER_LIST_TYPE_MY_GROUP_SERVER_RECORD = "staffGroupOfUser"; //我所在技能组的服务记录
export const SERVER_LIST_TYPE_MY_ORGANIZATION_SERVER_RECORD = "organizationOfUser";  //组织的服务记录

/**
 * 服务单来源
 */
export const SERVICE_SOURCE_CALL = "call";  // 热线工作台
export const SERVICE_SOURCE_VOICE = "voice";    // 留言管理

/**
 * 自定义属性类型
 */
export const CUSTOME_PROPERTY_TYPE_DATE = "Date";   //日期
export const CUSTOME_PROPERTY_TYPE_DATETIME = "DateTime";   //日期时间
export const CUSTOME_PROPERTY_TYPE_DOUBLE = "Double";   //数值
export const CUSTOME_PROPERTY_TYPE_INTEGER = "Integer";   //整型
export const CUSTOME_PROPERTY_TYPE_STRING = "String";   //文本
export const CUSTOME_PROPERTY_TYPE_TIME = "Time";   //时间
export const CUSTOME_PROPERTY_TYPE_DEFAULT = "default";   //系统默认
export const CUSTOME_PROPERTY_TYPE_TEXT = "text";   //单行文本
export const CUSTOME_PROPERTY_TYPE_TEXTAREA = "textarea";   //多行文本
export const CUSTOME_PROPERTY_TYPE_RADIO = "radio";   //单项选择
export const CUSTOME_PROPERTY_TYPE_CHECKBOX = "checkbox";   //多项选择
export const CUSTOME_PROPERTY_TYPE_DATETIME2 = "datetime";   //时间选择
export const CUSTOME_PROPERTY_TYPE_DATE2 = "date";   //日期选择
export const CUSTOME_PROPERTY_TYPE_NUMBER = "number";   //数值

/**
 * 自定义固定字段
 */
/** 客户 */
export const CUSTOM_FIX_CUSTOMER_CODE = "code"; // 客户编码
export const CUSTOM_FIX_CUSTOMER_NAME = "name"; // 客户名称
export const CUSTOM_FIX_CUSTOMER_CLASS = "customerClass"; // 客户分类
export const CUSTOM_FIX_CUSTOMER_LEVEL = "customerLevel"; // 客户级别
export const CUSTOM_FIX_CUSTOMER_AREA = "customerArea"; // 销售区域
export const CUSTOM_FIX_CUSTOMER_INDUSTRY = "customerIndustry"; // 客户行业
export const CUSTOM_FIX_CUSTOMER_ENTERPRISE_NATURE = "enterpriseNature"; // 企业类型
export const CUSTOM_FIX_CUSTOMER_PERSON_NAME = "personName"; // 姓名
export const CUSTOM_FIX_CUSTOMER_PERSON_EMAIL = "email"; // 邮箱
/** 服务单 */
export const CUSTOM_FIX_SERVICE_RECORD_SERIAL_NUMBER = "serialNumber"; // 服务编号
export const CUSTOM_FIX_SERVICE_RECORD_STATUS = "status"; // 状态
export const CUSTOM_FIX_SERVICE_RECORD_ORGANIZATION_ID = "organizationId"; // 服务组织
export const CUSTOM_FIX_SERVICE_RECORD_SERVICE_SOURCE = "serviceSource"; // 来源
export const CUSTOM_FIX_SERVICE_RECORD_QUESTION_PROCESS = "questionProcess"; // 问题进展
export const CUSTOM_FIX_SERVICE_RECORD_SERVICE_TYPE = "serviceType"; // 服务类别
export const CUSTOM_FIX_SERVICE_RECORD_QUESTION_DESC = "questionDesc"; // 问题描述
export const CUSTOM_FIX_SERVICE_RECORD_PROBLEM_FILES = "problemFiles"; // 问题附件
export const CUSTOM_FIX_SERVICE_RECORD_PROBLEM_TYPE = "questionType"; // 问题分类
export const CUSTOM_FIX_SERVICE_RECORD_SERVICE_DATETIME = "serviceDatetime"; // 服务时间
export const CUSTOM_FIX_SERVICE_RECORD_DUE_TIME = "duetime"; // 到期时间
export const CUSTOM_FIX_SERVICE_RECORD_LAST_MODIFIED = "lastModified"; // 更新时间
export const CUSTOM_FIX_SERVICE_RECORD_SOLUTION = "solution"; // 解决方案
export const CUSTOM_FIX_SERVICE_RECORD_COMMENT = "comment"; // 备注

/** 服务单状态 */
export const SERVICE_RECORD_STATUS_UNFINISH = "unfinish"; // 待结束
export const SERVICE_RECORD_STATUS_FINISH = "finish"; // 待关闭
export const SERVICE_RECORD_STATUS_CLOSE = "close"; // 已关闭

/**
 * 客户固定字段枚举类型
 */
export const PROPERTY_COLUMN_CUSTOMER_CLASS = "customerClass"; // 客户分类
export const PROPERTY_COLUMN_CUSTOMER_LEVEL = "customerLevel"; // 客户级别
export const PROPERTY_COLUMN_CUSTOMER_AREA = "customerArea"; // 销售区域
export const PROPERTY_COLUMN_CUSTOMER_INDUSTRY = "customerIndustry"; // 客户行业

/**
 * 格式校验
 */
export const CHECK_EMAIL = /^\w+@[a-z0-9]+\.[a-z]+$/i;  // 邮箱格式
export const CHECK_NUMBER = /^[1-9]+[0-9]*]*$/; //判断字符串是否为数字（正整数）
export const CHECK_NUMBER2 = /^[0-9]*]*$/; //判断字符串是否为数字（正整数）包含0