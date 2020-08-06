// 主页面菜单标签
export const menu = [
    // {
    //   name: '仪表盘',
    //   icon: 'DashboardOutlined',
    //   path: '/dashboard',
    // },
    {
      name: '系统管理',
      icon: 'UserOutlined',
      path: '/component',
      children: [
        {
          key: "userManager",
          componentName: "user",
          name: '用户管理',
          path: 'http://127.0.0.1:3000/fe/user#/',
        },
        {
          key: "roleManager",
          componentName: "role",
          name: '角色管理',
          path: 'http://127.0.0.1:3000/fe/role#/',
        },
        {
          name: '搜索条',
          path: '/searchBar',
        },
        {
          name: '数据表格',
          path: '/datatable',
        },
        {
          name: '表单',
          path: '/form',
        },
        {
          name: '穿梭树',
          path: '/transferTree',
        },
        {
          name: '图表',
          path: '/charts',
          children: [
            {
              name: 'ECharts',
              path: '/charts/ec',
            },
            {
              name: 'G2',
              path: '/charts/g2',
            },
          ]
        },
        {
          name: '打印',
          path: '/print',
        },
        {
          name: 'Banner 管理',
          path: '/banner',
        },
      ],
    },
    {
      name: 'UI元素',
      icon: 'ShareAltOutlined',
      path: '/ui',
      children: [
        {
          name: '按钮',
          path: '/button',
        },
        {
          name: '图片',
          path: '/image',
        },
        {
          name: '消息',
          path: '/alerts',
        },
        {
          name: '动画',
          path: '/animations',
        },
        {
          name: '图标',
          path: '/icons',
        },
        {
          name: '富文本',
          path: '/editor',
        },
        {
          name: '模态窗',
          path: '/modal',
        },
        {
          name: '遮罩',
          path: '/mask',
        },
      ],
    },
    {
      name: '页面',
      icon: 'BookOutlined',
      path: '/page',
      children: [
        {
          name: '登录页',
          path: '/login',
        },
        {
          name: '注册页',
          path: '/sign/register',
        },
        {
          name: '锁屏',
          path: '/lock',
        },
        {
          name: '画廊',
          path: '/gallery',
        },
        {
          name: '空白页',
          path: '/blank',
        },
        {
          name: '结果页',
          path: '/result',
        },
        {
          name: 'Coming Soon',
          path: '/coming',
        },
        {
          name: '403',
          path: '/403',
        },
        {
          name: '404',
          path: '/404',
        },
        {
          name: '500',
          path: '/500',
        },
        {
          name: '多级路由',
          path: '/level-route/:sub?',
        },
      ],
    },
    {
      name: '通用场景',
      icon: 'BulbOutlined',
      path: '/business',
      children: [
        {
          name: 'CRUD',
          path: '/crud/:detail?',
        }
      ],
    },
];

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

export const OPERATION_TYPE_ADD = "add";
export const OPERATION_TYPE_EDIT = "edit";
export const OPERATION_TYPE_DETAIL = "detail";