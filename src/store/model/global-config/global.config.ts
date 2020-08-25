import {RootDispatch, RootState} from "@src/store";

interface GlobalConfigDeclare {
    minWidth:number,
    hasToken:boolean,
    device:{
        name:string,
        type:string
    }
}

const state:GlobalConfigDeclare = {
    minWidth:1000,
    hasToken:false,
    device:{
        name:'',
        type:''
    }
};

const globalConfig = {
    name:'global',
    state,
    reducers:{
        setMiniWidth(state:GlobalConfigDeclare,payload):GlobalConfigDeclare{

            state.minWidth = payload;

            return state;
        },
        setDevice(state:GlobalConfigDeclare,payload):GlobalConfigDeclare{

            state.device = payload;
            return state
        },
        setTokenStatus(state:GlobalConfigDeclare,payload):GlobalConfigDeclare{

            state.hasToken = payload;
            return state
        }
    },
    effects:(dispatch:RootDispatch) => ({

    })
};

export default globalConfig