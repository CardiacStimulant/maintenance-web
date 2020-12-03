import React from 'react';
import { Layout } from 'antd';
import NavBar from 'components/NavBar';
import { LeftSideBar, RightSideBar } from 'components/SideBar';
import TopBar from 'components/TopBar';
import SkinToolbox from 'components/SkinToolbox';
import pathToRegexp from 'path-to-regexp';
import TabsLayout from './TabsLayout';
import $$ from 'cmn-utils';
import cx from 'classnames';
import isEqual from 'react-fast-compare';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import {Modal, } from "tinper-bee";
import * as commentAction from "utils/commentAction";
import UserConfig from "./user-config";
import { actions } from "mirrorx";
import * as constant from 'components/constant';
import { Warning, Error, Success } from "utils";
import './styles/transition.less';
import './styles/basic.less';

const { Content, Header } = Layout;

/**
 * 基本部局
 * 可设置多种皮肤 theme: [light, grey, primary, info, warning, danger, alert, system, success, dark]
 * 可设置多种布局 [header(固定头), sidebar(固定边栏), breadcrumb(固定面包蟹), tabLayout(标签布局)]
 */
export default class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    const theme = $$.getStore('theme', {
      leftSide: 'darkgrey', // 左边
      navbar: 'primary' // 顶部
    });
    if (!theme.layout) {
      theme.layout = [
        'fixedHeader',
        'fixedSidebar',
        'fixedBreadcrumbs'
      ];
    }
    this.state = {
      collapsedLeftSide: false, // 左边栏开关控制
      leftCollapsedWidth: 60, // 左边栏宽度
      expandTopBar: false, // 头部多功能区开合
      showSidebarHeader: false, // 左边栏头部开关
      collapsedRightSide: true, // 右边栏开关
      theme, // 皮肤设置
      currentMenu: {},
      menu: [], // 菜单
      showUserConfigModal: false, // 是否显示账户设置modal
    };

    props.dispatch({
      type: 'global/getMenu'
    });
  }

  async componentDidMount() {
    // 获取当前登录用户信息
    await commentAction.comment_getUserInfo({}, actions.Maintenance, "userInfo", `${GROBAL_HTTP_CTX}`);
    const {userInfo} = this.props;
    if(userInfo && userInfo.user && userInfo.user.id) {
      // 设置菜单权限
      if(userInfo.resourceList && userInfo.resourceList.length>0) {
        // 菜单项
        let menus = [];
        // 系统管理菜单
        let systemMenus = {
          name: '系统管理',
          icon: 'UserOutlined',
          children: [],
        };
        // 运维管理菜单项
        let maintenanceMenus = {
          name: '运维管理',
          icon: 'ShareAltOutlined',
          children: [],
        };
        // 遍历角色资源，配置菜单
        userInfo.resourceList.map((resource) => {
          if(resource.type===constant.RESOURCE_TYPE_MENU) {
            if(resource.owner===constant.RESOURCE_OWNER_SYSTEM) {
              // 系统管理菜单
              systemMenus.children.push({
                key: resource.key,
                name: resource.name,
                path: `${GLOBAL_COMPONENTS_URL}${GLOBAL_WEB_PERFIX}` + resource.url,
              });
            } else if(resource.owner===constant.RESOURCE_OWNER_MAINTENANCE) {
              // 运维管理菜单
              maintenanceMenus.children.push({
                key: resource.key,
                name: resource.name,
                path: `${GLOBAL_COMPONENTS_URL}${GLOBAL_WEB_PERFIX}` + resource.url,
              });
            }
          }
        });
        menus.push(systemMenus);
        menus.push(maintenanceMenus);
        this.setState({
          menu: menus,
        });
      }
    } else {
      Error("当前用户未登录");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !isEqual(this.props.location.pathname, prevProps.location.pathname) ||
      !isEqual(this.props.flatMenu, prevProps.flatMenu)
    ) {
      this.setState({
        currentMenu: this.getCurrentMenu(this.props) || {}
      });
    }
  }

  getCurrentMenu(props) {
    const {
      location: { pathname },
      flatMenu
    } = props || this.props;
    return this.getMeunMatchKeys(flatMenu, pathname)[0];;
  }

  getMeunMatchKeys = (flatMenu, path) => {
    return flatMenu.filter(item => {
      return pathToRegexp(item.path).test(path);
    });
  };

  /**
   * 顶部左侧菜单图标收缩控制
   */
  onCollapseLeftSide = _ => {
    const collapsedLeftSide =
      this.state.leftCollapsedWidth === 0
        ? true
        : !this.state.collapsedLeftSide;
    const collapsedRightSide =
      this.state.collapsedRightSide || !collapsedLeftSide;

    this.setState({
      collapsedLeftSide,
      collapsedRightSide,
      leftCollapsedWidth: 60
    });
  };

  /**
   * 完全关闭左边栏，即宽为0
   */
  onCollapseLeftSideAll = _ => {
    this.setState({
      collapsedLeftSide: true,
      leftCollapsedWidth: 0
    });
  };

  /**
   * 展开面包屑所在条中的多功能区
   */
  onExpandTopBar = _ => {
    this.setState({
      expandTopBar: true
    });
  };

  /**
   * 与上面相反
   */
  onCollapseTopBar = _ => {
    this.setState({
      expandTopBar: false
    });
  };

  /**
   * 切换左边栏中头部的开合
   */
  toggleSidebarHeader = _ => {
    this.setState({
      showSidebarHeader: !this.state.showSidebarHeader
    });
  };

  /**
   * 切换右边栏
   */
  toggleRightSide = _ => {
    const { collapsedLeftSide, collapsedRightSide } = this.state;
    this.setState({
      collapsedLeftSide: collapsedRightSide ? true : collapsedLeftSide,
      collapsedRightSide: !collapsedRightSide
    });
  };

  onChangeTheme = theme => {
    $$.setStore('theme', theme);
    this.setState({
      theme
    });
  };

  // 添加tabMenus
  addTabMenus = (item, _this) => {
    const {tabMenus} = this.props;
    if(tabMenus) {
      tabMenus.push(item);
    }
    actions.Maintenance.updateState({
      activeMenu: item,
      tabMenus: tabMenus || [],
    });
  }

  // 账户设置
  userConfig = () => {
    this.setState({
      showUserConfigModal: true, // 是否显示账户设置modal
    });
  }

  // 关闭modal
  closeModal = () => {
    this.setState({
      showUserConfigModal: false, // 是否显示账户设置modal
    });
  }

  // 登出
  logout= () => {
    actions.Maintenance.logout({});
  }

  render() {
    const {
      collapsedLeftSide,
      leftCollapsedWidth,
      expandTopBar,
      showSidebarHeader,
      collapsedRightSide,
      theme,
      currentMenu,
      menu,
      showUserConfigModal,
    } = this.state;
    const { routerData, location, flatMenu, activeMenu, tabMenus, userInfo, } = this.props;
    // const { childRoutes } = routerData;
    const classnames = cx('basic-layout', 'full-layout', {
      fixed: theme.layout && theme.layout.indexOf('fixedSidebar') !== -1,
      'fixed-header':
        theme.layout && theme.layout.indexOf('fixedHeader') !== -1,
      'fixed-breadcrumbs':
        theme.layout && theme.layout.indexOf('fixedBreadcrumbs') !== -1,
      'hided-breadcrumbs':
        theme.layout && theme.layout.indexOf('hidedBreadcrumbs') !== -1
    });

    return (
      <Layout className={classnames}>
        <Header>
          <NavBar
            collapsed={collapsedLeftSide}
            onCollapseLeftSide={this.onCollapseLeftSide}
            onExpandTopBar={this.onExpandTopBar}
            toggleSidebarHeader={this.toggleSidebarHeader}
            theme={theme.navbar}
            logout={this.logout.bind(this)}
            userConfig={this.userConfig.bind(this)}
            user={userInfo}
          />
        </Header>
        <Layout>
          <LeftSideBar
            collapsed={collapsedLeftSide}
            leftCollapsedWidth={leftCollapsedWidth}
            showHeader={showSidebarHeader}
            onCollapse={this.onCollapseLeftSide}
            onCollapseAll={this.onCollapseLeftSideAll}
            location={location}
            theme={theme.leftSide}
            flatMenu={flatMenu}
            currentMenu={currentMenu}
            menu={menu}
            user={userInfo}
            addTabMenus = {this.addTabMenus.bind()}
          />
          <Content>
            {theme.layout.indexOf('tabLayout') >= 0 ? (
              <TabsLayout childRoutes={[]} location={location} theme={theme} tabMenus={tabMenus} activeMenu={activeMenu} />
            ) : (
              <Layout className="full-layout">
                {/* <Header>
                  <TopBar
                    expand={expandTopBar}
                    toggleRightSide={this.toggleRightSide}
                    collapsedRightSide={collapsedRightSide}
                    onCollapse={this.onCollapseTopBar}
                    currentMenu={currentMenu}
                    location={location}
                    theme={theme}
                  />
                </Header> */}
                <Content style={{ overflow: 'hidden' }}>
                  <SwitchTransition>
                    <CSSTransition
                      key={location.pathname}
                      classNames="fade"
                      timeout={500}
                    >
                      <Layout className="full-layout">
                        <Content className="router-page">
                          <div location={location}>{[]}</div>
                        </Content>
                      </Layout>
                    </CSSTransition>
                  </SwitchTransition>
                </Content>
              </Layout>
            )}
          </Content>
          <RightSideBar
            collapsed={collapsedRightSide}
            onCollapse={this.toggleRightSide}
          />
        </Layout>
        <SkinToolbox onChangeTheme={this.onChangeTheme} theme={theme} />
        
        {/* 账户设置modal */}
        <Modal
            show={showUserConfigModal}
            backdrop = "static"
            onHide={this.closeModal.bind(this)} >
            <Modal.Header closeButton>
                <Modal.Title>{(userInfo && userInfo.user ? (userInfo.user.name || "") : "") + "账户设置"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UserConfig closeModal={this.closeModal.bind(this)} userInfo={userInfo} />
            </Modal.Body>
        </Modal>
      </Layout>
    );
  }
}
