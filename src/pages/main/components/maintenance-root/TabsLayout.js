import './styles/tabs.less';
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Layout, Tabs, Dropdown, Button, Menu } from 'antd';
import NotFound from 'components/Pages/404';
import {Router, Route, Link, actions} from 'mirrorx'
const { Content } = Layout;
const TabPane = Tabs.TabPane;

export default class TabsLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      noMatch: false,
    };
  }

  componentDidMount() {
    const { theme, } = this.props;
    this.setState({
      noMatch: theme && theme.layout && theme.layout.indexOf('tabLayout') >= 0 ? false : true,
      activeKey: "",
    });
  }
  
  // componentDidUpdate(prevProps, prevState) {
  //   const { tabMenus, activeMenu, } = this.props;
  //   if (JSON.stringify(tabMenus) !== JSON.stringify(prevProps.tabMenus) || JSON.stringify(activeMenu) !== JSON.stringify(prevProps.activeMenu)) {

  //   }
  // }

  setCurPanes = (pathName, _panes) => {
    const { childRoutes } = this.props;
    let panes = _panes || this.state.panes;
    const existPane = panes.some(item => item.key === pathName);
    if (existPane) {
      return {
        activeKey: pathName,
        panes,
      };
    } else {
      const nextPanes = childRoutes.filter(item => item.key === pathName);
      if (nextPanes.length) {
        return {
          activeKey: pathName,
          panes: panes.concat(nextPanes),
        };
      } 
      // else if (
      //   window.dva_router_pathMap[pathName] &&
      //   window.dva_router_pathMap[pathName].parentPath
      // ) {
      //   // childRoutes中如果没有(分两种情况,确实没有,或可能是一个子路由在subChildRoute中)
      //   // 如果是子路由
      //   const parentPath = window.dva_router_pathMap[pathName].parentPath;
      //   return this.setCurPanes(parentPath, panes);
      // } 
      else {
        return {
          activeKey: pathName,
          panes: panes,
        };
      }
    }
  };

  // 选择tab事件
  onChange = activeKey => {
    const {tabMenus} = this.props;
    let activeMenu = {};
    tabMenus.forEach((menu) => {
      if (menu.key === activeKey) {
        activeMenu = menu;
      }
    });
    actions.Maintenance.updateState({
      activeMenu: activeMenu,
    });
    return activeMenu;
  };

  // 关闭tab事件
  onRemove = targetKey => {
    let { tabMenus, activeMenu, } = this.props;
    let lastIndex, activeKey = activeMenu.key;
    tabMenus.forEach((menu, i) => {
      if (menu.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newTabMenus = tabMenus.filter(menu => menu.key !== targetKey);
    if (newTabMenus.length) {
      if(activeKey === targetKey) {
        activeMenu = lastIndex >= 0 ? newTabMenus[lastIndex] : newTabMenus[0];
      } else {
        activeMenu = this.onChange(activeKey);
      }
    } else {
      activeMenu = {};
    }
    
    actions.Maintenance.updateState({
      tabMenus: newTabMenus,
      activeMenu: activeMenu,
    });
  };

  onRemoveOther = () => {
    let { activeKey, panes } = this.state;
    const newpanes = panes.filter(pane => pane.key === activeKey);
    this.setState({ panes: newpanes });
  };

  onRemoveAll = () => {
    this.setState({ panes: [], activeKey: null });
  };

  onTabsActions = ({ key }) => {
    let { activeKey } = this.state;
    switch (key) {
      case 'close':
        this.onRemove(activeKey);
        break;
      case 'closeother':
        this.onRemoveOther();
        break;
      case 'closeall':
        this.onRemoveAll();
        break;
      default:
        break;
    }
  };

  render() {
    const { panes, activeKey, noMatch } = this.state;
    const { tabMenus, activeMenu, } = this.props;

    return (
      <Layout className="full-layout tabs-layout">
        <Content>
            {noMatch ? (
              <NotFound />
            ) : (
              <Tabs
                hideAdd
                type="editable-card"
                className="lanif-tabs-content"
                tabBarExtraContent={
                  <Dropdown
                    overlay={
                      <Menu onClick={this.onTabsActions}>
                        <Menu.Item key="close">关闭当前</Menu.Item>
                        <Menu.Item key="closeother">关闭其它</Menu.Item>
                        <Menu.Item key="closeall">关闭所有</Menu.Item>
                      </Menu>
                    }
                  >
                    <Button type="primary" ghost>
                      操作
                      <DownOutlined />
                    </Button>
                  </Dropdown>
                }
                onEdit={this.onRemove}
                onChange={this.onChange}
                activeKey={tabMenus && tabMenus.length>0 && activeMenu ? activeMenu.key : ""}
              >
                {tabMenus.map(item => (
                  <TabPane tab={<div className="tab-title">{item.name || 'tag'}</div>} key={item.key}>
                    {/* <Link to={"/fe/" + item.componentName} /> */}
                    {/* <Link to={"user"} > link </Link> */}
                    {/* <Link to={location => `${location.pathname}`} /> */}
                    <iframe name={"iframe" + item.key} id={"iframe" + item.key} height="100%" width="100%" src={`${GLOBAL_COMPONENTS_URL}/fe/${item.componentName}#/`}></iframe>
                  </TabPane>
                ))}
              </Tabs>
            )}
        </Content>
      </Layout>
    );
  }
}
