import React from 'react';
import mirror, { connect } from 'mirrorx';

// 组件引入
import ResourceManagerMain from './components/resource-manager-main';

// 数据模型引入
import model from './model'
mirror.model(model);

// 数据和组件UI关联、绑定
export const ConnectedResourceManagerMain = connect( state => state.ResourceManager, null )(ResourceManagerMain);
