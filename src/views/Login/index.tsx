import React, {useEffect, useRef, useState} from 'react'
import {Layout, Button ,Tabs} from 'antd'
import api from '@src/services/api'
import {Input} from '@src/components'

import BlankLayout from "@src/layouts/BlankLayout/BlankLayout"
import {Icon} from '@src/components'
import logo from '@assets/img/logo.png'
import styles from './login.module.scss'
import {RouterProps} from "react-router";
import { tokenMange } from '@src/services/token-manage'
import {useDispatch} from "react-redux";
import {RootDispatch} from "@src/store";

const {Header, Content} = Layout;
const { TabPane } = Tabs;

type Props = RouterProps;

// function areEqual(prevProps: any, nextProps: any) {
//
//     return (
//         (prevProps.password && prevProps.account) === (nextProps.password && nextProps.account)
//     )
// }
//
// const LoginButton = React.memo((props:any) => {
//
//     const [loading,setLoading] = useState(false);
//     const{account,password} = props;
//     function login() {
//         setLoading(true);
//         api.user.getUserInfo({phone:account,password}).then((data) => {
//             setLoading(false)
//         }).catch(() => {
//             setLoading(false)
//         })
//     }
//
//     function isCanLogin():boolean {
//         return !(account && password )
//     }
//
//     return (
//         <Button disabled={isCanLogin()}
//                 shape="round"
//                 size={'large'}
//                 onClick={login}
//                 loading={loading}
//         >
//             登陆
//         </Button>
//     )
// },areEqual);

export default function Login(props: Props) {

    const [account,setAccount] = useState();
    const [password,setPassword] = useState();
    const [loading,setLoading] = useState(false);
    const [isAccount, setIsAccount] = useState(true);
    const dispatch:RootDispatch = useDispatch();
    let accountRef = useRef<any>(),
        passwordRef = useRef<any>();

    function getData(event,type?) {
        type == 'account'  &&  (setAccount(event.target.value));
        type == 'password' && (setPassword(event.target.value));

    }

    useEffect(()=>{
        setIsAccount(!(account && accountRef.current.validate() && accountRef.current.validate() && password ))
    },[account,password]);

    // function isCanLogin():boolean {
    //     return !(account && accountRef.current.validate() && password )
    // }
    function loginOrtRegister(type:string) {

        setLoading(true);

        let res:Promise<any> ;

        if(type === 'login'){
             res = api.user.login({username:account,password})
        }else {
             res = api.user.register({username:account,password})
        }
        res.then((data:any) => {
            console.log(data)
            tokenMange.setToken({token:data.token,hasToken:true,username:account,password});
            dispatch.global.setTokenStatus(true);
            setLoading(false)
        }).catch(() => {

            setLoading(false)
        })

    }
    return (
        <BlankLayout>
            <Header className={styles.header}>
                <img src={logo} className={styles.logo} onClick={() => props.history.push('/home')}/>

                <div className={`${styles.login_button}`}>
                    <div className={styles.navItem}>忘记密码</div>
                </div>
            </Header>
            <Content>
                <div className={styles.content}>
                    <p>登陆</p>
                    <div className={styles.icon_content}>
                        <Icon name={'icon-_weixindenglu weixinIcon'}/>
                    </div>
                    <div style={{width:'256px'}}>
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="密码登陆" key="1">
                                <div>
                                    <Input type={'text'}
                                           name={'account'}
                                           ref={accountRef}
                                           rule={{regExp: '^1[345789]\\d{9}$', message: '请输入正确的手机号'}}
                                           change={(event) => getData(event,'account')}/>
                                </div>
                                <div  style={{marginBottom:'15px'}}>
                                    <Input type={'password'}
                                           name={'password'}
                                           ref={passwordRef}
                                           change={(event) => getData(event,'password')}/>
                                </div>
                            </TabPane>
                            <TabPane tab="验证码登陆" key="2">
                                <div>
                                    <Input type={'text'}
                                           name={'account'}
                                           ref={accountRef}
                                           rule={{regExp: '^1[345789]\\d{9}$', message: '请输入正确的手机号'}}
                                           change={(event) => getData(event,'account')}/>
                                </div>
                                <div  style={{marginBottom:'15px'}}>
                                    <Input type={'password'}
                                           name={'password'}
                                           ref={passwordRef}
                                           change={(event) => getData(event,'password')}/>
                                    <Button size={'small'} type='link'>获取验证码</Button>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>

                    <Button disabled={isAccount}
                            shape="round"
                            size={'large'}
                            onClick={()=>loginOrtRegister('login')}
                            loading={loading}
                    >
                         登陆
                    </Button>
                    <Button type="link"
                            disabled={isAccount}
                            onClick={()=>loginOrtRegister('register')}
                    >
                        注册
                    </Button>
                </div>

            </Content>
        </BlankLayout>
    )
}