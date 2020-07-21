import React, { PureComponent } from 'react';
import cx from 'classnames';
import { Menu, Layout, Switch, Select, } from 'antd';
import pathToRegexp from 'path-to-regexp';
import Icon from '../Icon';
import isEqual from 'react-fast-compare';
import './style/index.less';
import { actions } from 'mirrorx';
const Option = Select.Option;
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const getIcon = icon => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={`sider-menu-item-img`} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} antd />;
  }
  return icon;
};

export const getMeunMatchKeys = (flatMenu, path) => {
  return flatMenu.filter(item => {
    return pathToRegexp(item.path).test(path);
  });
};

class LeftSideBar extends PureComponent {
  static defaultProps = {
    fixed: true,
    theme: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      openKeys: props.currentMenu ? props.currentMenu.parentPath : []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !isEqual(
        this.props.currentMenu.parentPath,
        prevProps.currentMenu.parentPath
      )
    ) {
      this.setState({
        openKeys: this.props.currentMenu.parentPath || []
      });
    }
  }

  getMenuItemPath = item => {
    const {addTabMenus} = this.props;
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { onCollapse } = this.props;
    const { target, name } = item;
    return (
      <a onClick={addTabMenus ? addTabMenus.bind(this, item) : () => {}}>
        {icon}
        <span>{name}</span>
      </a>
    );
  };

  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return (
        <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
      );
    }
  };

  /**
   * 获得菜单子节点
   */
  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        const ItemDom = this.getSubMenuOrItem(item);
        return ItemDom;
      })
      .filter(item => item);
  };

  // 转化路径
  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/fe/${path || ''}`.replace(/\/+/g, '/').replace(/\/:\w+\??/, '');
    }
  };

  getSelectedMenuKeys = () => {
    const pathname = this.props.location.pathname;
    const selectMenu = getMeunMatchKeys(this.props.flatMenu, pathname)[0];
    return selectMenu ? [selectMenu.path] : [];
  };

  isMainMenu = key => {
    return this.props.menu.some(
      item => key && (item.key === key || item.path === key)
    );
  };

  handleOpenChange = openKeys => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne =
      openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys]
    });
  };

  render() {
    const {
      fixed,
      theme,
      collapsed,
      onCollapse,
      onCollapseAll,
      leftCollapsedWidth,
      showHeader,
      menu,
      user,
    } = this.props;

    const classnames = cx('sidebar-left', 'sidebar-default', {
      affix: !!fixed,
      'sidebar-left-sm': collapsed,
      'show-header': collapsed ? false : showHeader,
      'sidebar-left-close': leftCollapsedWidth === 0,
      [theme]: !!theme
    });

    const { openKeys } = this.state;
    let selectedKeys = this.getSelectedMenuKeys();
    const menuProps = collapsed
      ? {
          selectedKeys
        }
      : {
          openKeys,
          selectedKeys
        };

    const siderBar = (
      <Sider
        className={classnames}
        width={230}
        collapsedWidth={leftCollapsedWidth + 0.1}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        breakpoint="lg"
        trigger={null}
      >
        <div className="sidebar-left-content">
          <header className="sidebar-header">
            <div className="userlogged clearfix">
              <Icon type="woman" />
              <div className="user-details">
                <span>{user.name}</span>
                <div className="dropdown">
                  <Select
                    size="small"
                    defaultValue="online"
                    dropdownClassName="sidebar-header-dropdown"
                  >
                    <Option value="online">
                      <span className="user online" />
                      在线
                    </Option>
                    <Option value="busy">
                      <span className="user busy" />
                      忙碌
                    </Option>
                    <Option value="invisible">
                      <span className="user invisible" />
                      隐身
                    </Option>
                    <Option value="offline">
                      <span className="user offline" />
                      离线
                    </Option>
                  </Select>
                </div>
              </div>
            </div>
          </header>
          <Menu
            onClick={this.handleClick}
            onOpenChange={this.handleOpenChange}
            mode="inline"
            theme={theme}
            {...menuProps}
          >
            {this.getNavMenuItems(menu)}
          </Menu>
          <div className="sidebar-toggle-mini">
            {collapsed && leftCollapsedWidth !== 0 ? (
              <Switch
                checked={collapsed}
                onChange={onCollapseAll}
                size="small"
              />
            ) : null}
          </div>
        </div>
      </Sider>
    );

    return siderBar;
  }
}

export default LeftSideBar;
