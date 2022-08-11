import axios from 'axios';
import store from '@/store';
import router from '@/router';

const production = process.env.NODE_ENV === 'production';

// 格式化baseURL alias
const formateAlias = (url) => {
    const alais = store.state.baseUrlAlais;
    Object.keys(alais).forEach(item => {
        const reg = new RegExp(`^${item}`, 'i');
        url = url.replace(reg, alais[item]);
    });
    return url;
};

// 拦截 发
axios.interceptors.request.use(function (config) {
    if (config.method.toLowerCase() === 'get') {
        config.params = config.params || {};
        config.params.v = +new Date();
    }
    config.url = formateAlias(config.url);
    if (production) {
        if (!navigator.onLine) {
            return Promise.reject(new Error('未连接网络，请检查网络！'));
        } else {
            return config;
        }
    } else {
        return config;
    }
}, function (error) {
    return Promise.reject(error);
});

// 收
axios.interceptors.response.use(function (response) {
    // if (response.data.code === -999) {
    //     router.replace({ path: "/login" });
    // }
    if (+response.data.code === 200) {
        try {
            return Promise.resolve(JSON.parse(response.data.body));
        } catch (error) {
            return Promise.resolve(response.data.body);
        }
    } else {
        return Promise.reject(response.data);
    }
}, function (error) {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                // 未登录
                store.commit('LOGIN_OUT');
                router.replace({
                    path: '/login',
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                });
                break;
            case 500:
            case 504:
                return Promise.reject(new Error('系统繁忙，请稍后再试！'));
        }
    }
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
});

export const fetch = axios;

export const apiFormat = (str, res) => {
    let reg = /\{(\w+?)\}/gi;
    return str.replace(reg, ($0, $1) => {
        return res[$1];
    });
};
