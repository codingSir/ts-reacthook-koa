import React from 'react'
import {RouterProps} from "react-router";
import { Result,Button} from 'antd'

type Props = RouterProps;

export default function NotMatch(props:Props) {

    return(
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={() => {props.history.push('/home')}}>Back Home</Button>}
        />
    )
}