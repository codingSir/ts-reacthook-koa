import React, {useState} from 'react';
import { Layout, Carousel} from 'antd'
import { RouterProps } from 'react-router'
import BlankLayout from '@src/layouts/BlankLayout/BlankLayout'
import styles from './home.module.scss'
import logo from '@assets/img/logo.png'
import banner from '@assets/img/home/banner.png'
import workflowImg from '@assets/img/home/底图元素1.png'
import LoginSuccess from '@src/views/Home/login.success'
import CaseMarket from '@src/views/CaseMarket'
import {operationList } from './img'
import { carouselList } from './img'
import { useDispatch } from "react-redux";
import { RootDispatch, useTypedSelector} from '@store/index'
import {useLoginReduce} from '@src/custom-hook/login-tips-hook/login.tips'

const {Header,Content,Footer} = Layout;

interface NavItemInter {
    title:string,
    className?:string,
    event?:string,
    callBack?:() => any,
    type?:string
}

interface DispatchProps {
    setMiniWidth:() => void
}


type Props = RouterProps  & DispatchProps & {
    setLoginTips:(param:boolean) => any
};


const navItem:NavItemInter[] = [
    {
        title:'首页',
        className:'',
        type:'index'
    },
    {
        title:'案例市场',
        className:'',
        type:'model'
    },
    {
        title:'工作台',
        className:'',
        type:'work'
    }
];

function introdutedNavItem(selected:string,setSelected,hasToken:boolean,setLoginTips:(params:boolean) => void){

    function clickTab(item) {
       console.log(hasToken);
        if(item.type ==='work'){
            !hasToken && setLoginTips(true)
        }

        setSelected(item.type)
    }

    return navItem.map((item,index) => {

        return (
            <span className={`${item.className} ${styles.navItem} ${selected === item.type && styles.navItem_selected}`}
                  key={index}
                  onClick={() => clickTab(item)}>
                {item.title}
            </span>
        )
    })
}

export default function Home(props:Props) {

    const [selected, setSelected] =  useState('index');
    const hasToken = useTypedSelector(state => state.global.hasToken);
    const { setLoginTips } = props;
   // const miniWidth = useTypedSelector(state => state.global.minWidth);
   // console.log(miniWidth);
   // const dispatch:RootDispatch = useDispatch();
   // dispatch.global.setMiniWidth(1100);

    return (
        <BlankLayout style={{backgroundColor:'white'}}>
           <Header className={styles.header}>
               <img src={logo}
                    className={styles.logo}
                    onClick={() => window.location.reload()}/>
               {
                   introdutedNavItem(selected, setSelected,hasToken,setLoginTips)
               }
               {
                   !hasToken ? (
                       <div className={`${styles.login_button}`}>
                           <div className={styles.navItem}
                                onClick={() => props.history.push('/login')}>登陆</div>
                       </div>
                   ):(
                      <div className={`${styles.login_button}`}>
                          <LoginSuccess {...props}/>
                      </div>
                   )
               }
           </Header>
            {
                selected === 'model'?(
                    <CaseMarket className={styles.content}/>
                ):(
                    <Content className={styles.content}>
                        <img src={banner}/>

                        <div className={styles.platform_introduce}>
                            <p>平台介绍</p>

                            <Carousel autoplay>
                                {
                                    carouselList.map((item,index) => {
                                        return (
                                            <div className={styles.carousel_content}
                                                 key={index}
                                            >
                                                <img src={item.img} />
                                                <div  className={styles.carousel_text}>
                                                    <p>{item.p}</p>
                                                    <p>{item.p2}</p>
                                                    <p>{item.span}</p>
                                                    <p>{item.span2}</p>
                                                    <p>{item.span3}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>

                        <div className={styles.platform_operation}
                             style={{background:`url(${workflowImg})`}}>
                            <p>操作流程</p>
                            <div className={styles.platformIntroduced_operation_content}>
                                {
                                    operationList.map((item,index) =>
                                        (
                                            <div className={styles.platformIntroduced_operation_box}
                                                 key={index}>

                                                <img className="creatIcon" src={item.img}/>
                                                <p>{item.text1}</p>
                                                <p>{item.text2}</p>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </div>

                        <Footer>
                            <div style={{textAlign:'center'}}>
                                版权所有 ICP证： 粤ICP备17057389号 | 版本号：20190911
                            </div>
                        </Footer>
                    </Content>
                )
            }
        </BlankLayout>
    )
}