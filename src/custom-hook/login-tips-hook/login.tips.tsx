import React, {useState, useReducer, useEffect} from 'react'
import ReactDOM from 'react-dom'
import { Modal,Result,Button } from 'antd'

export function useLoginReduce() {
    const [status,setStatus] = useState(false);

    function dispatch(status) {
        console.log(status);
        setStatus(status)
    }

    const tump:[typeof status,typeof dispatch] = [status, dispatch];

    return tump
}
// const LoginTips =function (props:any) {
//     const { status,setLoginTips} = props;
//     console.log(status);
//         return(
//         <Modal visible={status}
//                onCancel={()=> setLoginTips(false)}
//         >
//             <Result
//                 title="登陆后查看"
//                 extra={
//                     <Button type="primary" key="console">
//                         立即登陆
//                     </Button>
//                 }
//             />
//         </Modal>
//     )
// };
const LoginTips = React.memo((props:any) => {
    const { status,setLoginTips} = props;
    console.log(status);

    return(
        <Modal visible={status}
               onCancel={()=> setLoginTips(false)}
        >
            <Result
                title="登陆后查看"
                extra={
                    <Button type="primary" key="console">
                        立即登陆
                    </Button>
                }
            />
        </Modal>
    )
},(prevProps:any,nextProps:any) => {
    return prevProps.status == nextProps.status
});
export default LoginTips