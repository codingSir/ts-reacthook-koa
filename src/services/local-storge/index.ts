
const localStorage =  window.localStorage;

export function getItem(type?:string):string |object {
    if(type){
        return JSON.parse(localStorage.getItem(type))
    }else {
        return JSON.parse(localStorage.getItem(''))
    }
}

export function setItem(type:string, payload : object | string |number | boolean) {

    localStorage.setItem(type,JSON.stringify(payload))
}

export function removeItem(type:string) {
    localStorage.removeItem(type)
}
export function clear() {

    localStorage.clear()
}

export default {
    getItem,
    setItem,
    removeItem,
    clear
}