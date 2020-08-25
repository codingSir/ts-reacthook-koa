import React from 'react'

import App from '@src/entry/App';
import NotMatch from '@src/views/404'

export interface RouteConfigDeclaration {

    /**
     * 当前路由路径
     */
    path: string;
    /**
     * 当前路由名称
     */
    name?: string;
    /**
     * 是否严格匹配路由
     */
    exact?: boolean;
    /**
     * 是否需要路由鉴权
     */
    isProtected?: boolean;
    /**
     * 是否需要路由重定向
     */
    isRedirect?: boolean;
    /**
     * 是否需要动态加载路由
     */
    isDynamic?: boolean;
    /**
     * 动态加载路由时的提示文案
     */
    loadingFallback?: string;
    /**
     * 路由组件
     */
    component: any;
    /**
     * 子路由
     */
    routes?: RouteConfigDeclaration[];

}

export const routerConfig: RouteConfigDeclaration[] = [
    {
        path:'/',
        name:'root',
        component:App,
        routes:[
            {
                path:'/home',
                name:'home',
                isRedirect:true,
                isDynamic:true,
                component:React.lazy(()=> import('@src/views/Home')),
            },
            {
                path:'/login',
                name:'login',
                isDynamic:true,
                component:React.lazy(()=> import('@src/views/Login'))
            },
            // {
            //     path:'*',
            //     name:"notMatch",
            //     component:NotMatch
            // }
        ]
    },
];
