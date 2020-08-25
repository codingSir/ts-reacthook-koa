import React from 'react'

// const GlobalContext= React.createContext(null);

export function createCtx<StateType, ActionType>(
    reducer: React.Reducer<StateType, ActionType>,
    initialState: StateType,
) {
    const defaultDispatch: React.Dispatch<ActionType> = () => initialState // we never actually use this
    const GlobalContext = React.createContext({
        state: initialState,
        dispatch: defaultDispatch, // just to mock out the dispatch type and make it not optioanl
    });
    function GlobalProvider(props: React.PropsWithChildren<{}>) {
        const [state, dispatch] = React.useReducer<React.Reducer<StateType, ActionType>>(reducer, initialState)
        return <GlobalContext.Provider value={{ state, dispatch }} {...props} />
    }

    return { GlobalContext, GlobalProvider };

}
const initialState = { count: 0 };
export type AppState = typeof initialState
export type Action =
    | { type: 'increment' }
    | { type: 'add'; payload: number }
    | { type: 'minus'; payload: number }
    | { type: 'decrement' }

function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count - 1 }
        case 'add':
            return { count: state.count + action.payload }
        case 'minus':
            return { count: state.count - action.payload }
        default:
            throw new Error()
    }
}

export const  {GlobalContext, GlobalProvider} = createCtx(reducer, initialState);
