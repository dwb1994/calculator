export default {
    toNumber(obj) {
        for(let key in obj){
            if(obj[key] === ''){
                obj[key] = 0;
            }else {
                obj[key] = parseInt(obj[key], 10);
            }
        }
        return obj;
    },
    parseQuery(str) {
        const query = str.split('\?')[1];
        if(query){
            const resArr = query.split('\&');
            const res = {};
            resArr.forEach((item, index) => {
                const keyValue = item.split('\=');
                res[keyValue[0]] = keyValue[1];
            });
            return res;
        }
    }
}
