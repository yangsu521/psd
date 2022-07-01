import interceptors from "./interceptors";
import { MapCache, mergeRequestOptions } from './utils';
const cache = new MapCache();
// 默认缓存判断，开放缓存判断给非 get 请求使用
function validateCache(url, options) {
    const { method = 'get' } = options;
    return method.toLowerCase() === 'get';
}

function request(initOptions = {}) {
   
    const aslInstance = (url, options = {}) => {
        const {
            method = 'get',
            params,
            data,
            headers = { 'Content-Type': 'application/json' },
            timeout,
            responseType = 'json',
            useCache = false,
            ttl = 0,
        } = options;
       
        const mergeOptions = mergeRequestOptions(initOptions,options);
        const needCache = validateCache(url, mergeOptions) && useCache;

        const axiosInstance = interceptors(url, { ...mergeOptions, cache, needCache });
        if (needCache) {
            let responseCache = cache.get({
                url,
                params,
                method,
            });
            if (responseCache) {
                responseCache = responseCache;
                responseCache.useCache = true;
                return Promise.resolve(responseCache);
            }
        }
        return new Promise((resolve, reject) => {
            axiosInstance({
                method: method,
                url: url,
                params,
                data,
                headers,
                needCache

            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    };

    // 请求语法糖： reguest.get request.post ……
    const METHODS = ['get', 'post', 'delete', 'put', 'patch', 'head', 'options', 'rpc'];
    METHODS.forEach(method => {
        aslInstance[method] = (url, options) => aslInstance(url, { ...options, method });
    });

    return aslInstance;

}

/**
 * extend 方法参考了ky, 让用户可以定制配置.
 * initOpions 初始化参数
 * @param {number} maxCache 最大缓存数
 * @param {string} prefix url前缀
 * @param {function} errorHandler 统一错误处理方法
 * @param {object} headers 统一的headers
 */
export const extend = initOptions => request(initOptions);

export default request({});