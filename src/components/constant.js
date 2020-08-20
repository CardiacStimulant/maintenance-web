// 列表页查询条件栅格默认分割
export const attrs = {lg:3,md:6,sm:6,xs:12,};

/**
 * 格式校验
 */
export const CHECK_EMAIL = /^\w+@[a-z0-9]+\.[a-z]+$/i;  // 邮箱格式
export const CHECK_NUMBER = /^[1-9]+[0-9]*]*$/; //判断字符串是否为数字（正整数）
export const CHECK_NUMBER2 = /^[0-9]*]*$/; //判断字符串是否为数字（正整数）包含0
export const CHECK_NUMBER_LETTER = /^[A-Za-z0-9]*$/; // 判断字符串是否只有数字和字母
export const CHECK_CHINESE_CHARACTERS = /.*[\u4e00-\u9fa5]+.*$/; //判断字符串是否包含汉字

/**
 * 操作类型
 */
export const OPERATION_TYPE_ADD = "add";
export const OPERATION_TYPE_EDIT = "edit";
export const OPERATION_TYPE_DETAIL = "detail";

/**
 * 资源类型
 */
export const RESOURCE_TYPE_MENU = "menu";  // 菜单
export const RESOURCE_TYPE_BUTTON = "button";  // 按钮

/**
 * 资源归属
 */
export const RESOURCE_OWNER_SYSTEM = "system";
export const RESOURCE_OWNER_MAINTENANCE = "maintenance";

/**
 * 日志-业务类型
 */
export const LOG_BUSINESS_TYPE_USER = "user";
export const LOG_BUSINESS_TYPE_ROLE = "role";
export const LOG_BUSINESS_TYPE_RESOURCE = "resource";
export const LOG_BUSINESS_TYPE_TENANT_TELEPHONE_NUMBER = "tenantTelephoneNumber";

/**
 * 日志-操作类型
 */
export const LOG_OPERATION_TYPE_ADD = "add";
export const LOG_OPERATION_TYPE_UPDATE = "update";
export const LOG_OPERATION_TYPE_DELETE = "delete";
