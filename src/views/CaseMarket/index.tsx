import React from 'react'
import { Layout,Card,Input } from 'antd'
import styles from './caseMarket.module.scss'

const { Content } = Layout;
const { Meta }= Card;
const { Search } = Input;


function CaseMarket(props) {

    return(

        <Content className={styles.content}>
            <div className={styles.searchWrap}>
                <p className={styles.tips}>学习案例记录</p>
                <Search
                    style={{width:'400px'}}
                    placeholder="关键字，标题"
                    enterButton="搜索"
                    size="large"
                    onSearch={value => console.log(value)}
                />
            </div>
            <div className={styles.listWrap}>
                <Card
                    hoverable
                    style={{ width: 240,marginTop:'25px' }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
            </div>
        </Content>
    )
}

export default  React.memo(CaseMarket)