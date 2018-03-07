/**
 * 将回调函数改写为使用async、await关键字的写法
 * 
 * @param  {function} 要包装的异步函数
 * @return {function} 返回一个返回值为Promise对象的函数
 */
function wrap(func) {
    //包装函数返回的新函数在执行时，将会返回一个Promise对象，
    return function() {
        return new Promise((resolve,reject) => {
            arguments[arguments.length++] = function(err, ...rest) {
                if(err) {
                    reject(err);
                }
                resolve(rest);
            }
            //包装函数在执行时实际上还是执行原来的异步函数func,只是对arguments做了修改
            func.apply(this,arguments)
        })
    }
}

module.exports = {
    wrap: wrap
};