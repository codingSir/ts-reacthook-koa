import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import { Spin } from 'antd'
import { RouteConfigDeclaration } from '@src/router/router.config'

/**
 * @desc:路由转换器
 *
 * */
/**
 * @desc渲染所有路由
 * @param routesConfig
 * @param extraProps
 * */
export function renderAllRouter(routesConfig:RouteConfigDeclaration [], extraProps:any = {}) {
   let routes = renderRouter(routesConfig,extraProps);
   console.log(routesConfig)
   let redirect = renderRedirectRoute(routesConfig);
   return [...routes,redirect];
}


/**
 * @desc:渲染普通路由
 *
 * */

export function renderRouter(routesConfig:RouteConfigDeclaration [],extraProps:any = {}) {
    return routesConfig.map((item, index) =>{
        const {
            path,
            exact,
            isProtected,
            isDynamic,
            component: Component,
            routes = [],
            loadingFallback,
        } = item;


        return(
            <Route key={path}
                   path={path}
                   exact={exact}
                   component={(props:any ={}) => {
                       if (isProtected && !localStorage.getItem('token')) {
                           return <Redirect key={'login-redirect'} to={'/login'} />;
                       }
                       if (isDynamic) {
                           return (
                               <React.Suspense fallback={loadingFallback || <Spin size="large" style={{position:'absolute',top:'50%',left:'50%'}}/>}>
                                   <Component {...props} {...extraProps} routes={routes} />
                               </React.Suspense>
                           );
                       }
                       return <Component {...props} {...extraProps} routes={routes} />;
                   }}
            >

            </Route>
        )

    })
}

/**
 * 渲染重定向路由
 * @param routes
 */
export function renderRedirectRoute(routes: RouteConfigDeclaration[]) {
    let { path } = routes.find(route => route.isRedirect) || routes[0];

    return <Redirect key={path + '-redirect'} to={path} />;
}
