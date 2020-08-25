import React from 'react';
import ReactDOM from 'react-dom';
import {ConnectedRouter} from 'connected-react-router'
import {Provider} from 'react-redux'
import {Switch} from "react-router";
import {ConfigProvider} from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import * as serviceWorker from './serviceWorker';

/**
 * @desc 自定义脚本
 */
import history from '@store/history'
import store from '@store/index'
import {renderRouter} from '@src/router/router.loader'
import {routerConfig} from '@src/router/router.config'


ReactDOM.render(
    <ConfigProvider locale={zh_CN}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>{renderRouter(routerConfig)}</Switch>
            </ConnectedRouter>
        </Provider>
    </ConfigProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
