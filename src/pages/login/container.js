import React from 'react';
import mirror, { connect } from 'mirrorx';

// 组件引入
import LoginMain from './components/Login-main';

// 数据模型引入
import model from './model'
mirror.model(model);

// 数据和组件UI关联、绑定
export const ConnectedLoginMain = connect( state => state.Login, null )(LoginMain);
