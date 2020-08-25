import React from 'react'
import { Layout } from 'antd'
import  styles from './BlankLayout.module.scss'

export default function BlankLayout(props) {
    const { children } = props;
    return(
       <Layout className={ styles['blank-layout'] } {...props}>
           {children}
       </Layout>
    )
}