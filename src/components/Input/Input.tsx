import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react'
import styles from './input.module.scss'

interface BasicProps extends React.HTMLAttributes<HTMLDivElement>{}

interface validateDeclare {
    regExp: string,
    message?:string
}

interface inputDeclare{
    type:string ,
    name?:string,
    change?:(config:any) => any,
    forces?:(config:any) => any,
    blur?:(config:any) => any,
    rule?: validateDeclare
}

type Props = BasicProps & inputDeclare;

function Input(props:Props,ref) {
    const [pass, setPass] = useState(true);
    const inputRef = useRef<any>();

    useImperativeHandle(ref, () =>  ({
        validate: () => {
            if(inputRef.current.value.length === 0){
                setPass(true);
                return true
            }else if(props.rule){
                const testReg = new RegExp(props.rule.regExp).test(inputRef.current.value);
                setPass(testReg);

                return testReg;
            }else {
                return true
            }
        }
    }));

    return(
        <div className={styles.input_content}>
            <div className={styles.input_filed}>
                <input onChange={(event)=> props.change && props.change.apply(this,[event])}
                       onFocus={(event)=> props.forces && props.forces.apply(this,[event])}
                       onBlur={(event)=> props.blur && props.blur.apply(this,[event])}
                       ref={inputRef}
                       type={props.type}
                       name={props.name}
                />
                <div className={styles.input_line}/>
                <div className={styles.input_force_line} />
            </div>
            {
                !pass && (
                    <span className={styles.phone_tips}>{props.rule && props.rule.message}</span>
                )
            }
        </div>
    )
}
export default forwardRef(Input)