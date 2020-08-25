export function getDevice() {
        const agent = navigator.userAgent.toLowerCase();
        const regStr_ie = /msie [\d.]+;/gi;
        const regStr_ff = /firefox\/[\d.]+/gi;
        const regStr_chrome = /chrome\/[\d.]+/gi;
        const regStr_saf = /safari\/[\d.]+/gi;
        const regStr_Edge = /Edge\/[\d.]+/gi;
        let device = {
            type:'',
            name:''
        };


        //IE
        if (agent.indexOf("msie") > 0) {
             device.type = agent.match(regStr_ie)[0].split("/")[0];
             device.name = 'IE浏览器'
        }

        //firefox
        if (agent.indexOf("firefox") > 0) {
            device.type = agent.match(regStr_ff)[0].split("/")[0];
            device.name = '火狐浏览器'
        }

        //Chrome
        if (agent.indexOf("chrome") > 0) {
            device.type = agent.match(regStr_chrome)[0].split("/")[0];
            device.name = '谷歌浏览器'
        }

        //Safari
        if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
            device.type = agent.match(regStr_saf)[0].split("/")[0];
            device.name = '苹果浏览器'
        }
        //Edge
        if (agent.indexOf("Edge") > 0 && agent.indexOf("Edge") < 0) {
            device.type = agent.match(regStr_Edge)[0].split("/")[0];
            device.name = 'edge浏览器'
        }

        return device
}