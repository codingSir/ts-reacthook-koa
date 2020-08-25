import React from 'react'

interface BasicProps extends React.HTMLAttributes<HTMLDivElement>{

}
interface iconDeclare {
    name:string
}

type Props =  iconDeclare & BasicProps;

export default function Icon(props:Props) {

    return(

        <i className={`iconfont ${props.name}`} {...props} />
    )
}