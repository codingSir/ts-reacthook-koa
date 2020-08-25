import { init } from '@rematch/core'
import immerPlugin from '@rematch/immer'
import createLoadingPlugin from '@rematch/loading'
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { RematchRootState,RematchRootDispatch} from '@src/d.ts/rematch-store'
import history from './history'
import * as models from './model'
import {TypedUseSelectorHook, useSelector} from "react-redux";
import { tokenMange } from '@src/services/token-manage'

export type RootState = RematchRootState<typeof models>;

export type RootDispatch = RematchRootDispatch<typeof models>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;


const immer = immerPlugin();
const loadingOptions = {};
const loading = createLoadingPlugin(loadingOptions);

function initGlobalConfig() {
   const token:any = tokenMange.getToken();
   token && (models.global.state.hasToken = token?.token && true)
}

initGlobalConfig();

const store = init({
    models,
    plugins: [loading, immer],
    redux: {
        middlewares: [routerMiddleware(history)],
        reducers: {
            router: connectRouter(history),
        },
    }
});

export default store
