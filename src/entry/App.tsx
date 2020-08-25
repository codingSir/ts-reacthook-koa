import React, {useContext} from 'react';
import './global.scss'
import './antd.less';
import { renderAllRouter } from '@router/router.loader'
import {GlobalContext,GlobalProvider} from "@assets/context/global-context";
import {Switch, RouteComponentProps} from "react-router";
import {RootDispatch, useTypedSelector} from "@src/store";
import {useDispatch} from "react-redux";
import { getDevice } from '@utils/device'
import LoginTips, {useLoginReduce} from '@src/custom-hook/login-tips-hook/login.tips'

function mapStateToProps(state) {
    return state;
}
/**
 * 路由参数 Props 类型声明
 */
interface RouterProps extends RouteComponentProps<any> {}

/**
 * 映射状态（从 store 中获取某些状态并传递给当前组件）类型声明
 */
type MapStateFromStoreProps = ReturnType<typeof mapStateToProps>;

type AppProps = RouterProps & MapStateFromStoreProps & {
    routes?:any
}


function App(props:AppProps) {

    const { routes } = props;
    const [status,setLoginTips] = useLoginReduce();
    const dispatch:RootDispatch = useDispatch();

    const router = renderAllRouter(routes,{ setLoginTips });
    dispatch.global.setDevice(getDevice);

    return (
        <GlobalProvider>
            <div className="App">
                <Switch>{router}</Switch>
                <LoginTips status={status} setLoginTips={setLoginTips}/>
            </div>
        </GlobalProvider>
    );
}


export default App;
