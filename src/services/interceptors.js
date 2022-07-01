import Axios from 'axios';

function interceptors(url, options) {
    const { method, params, timeout, cache, needCache, ttl } = options;
    const axios = Axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        timeout: timeout || 2000,
        validateStatus: function (status) {
            return status >= 200 && status < 300;
        }
    });

    axios.interceptors.request.use(
        (config) => {
            config.headers['common']['Authorization'] = 'Bearer 1243444';
            if (needCache) {

            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (res) => {
            // 是否存入缓存池
            if (needCache) {
                if (res.status === 200) {
                    const copy = res;
                    copy.useCache = true;
                    cache.set({ url, params, method }, copy, ttl);
                }
            }

            const { status, data, message } = res.data;
            if (status === "200") {
                return data;
            } else {
                return Promise.reject(new Error(message))
            }

        },
        (error) => {
            switch (error.response.status) {
                case 401:

                    localStorage.removeItem("USER_INFO_TOKEN");
                    window.location.href = "/user/login";
                    break;
                case 403:

                    break;

                default:
                    break;
            }

            return Promise.reject(error)
        }
    );

    return axios;
}
export default interceptors;



