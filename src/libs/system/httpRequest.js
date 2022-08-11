import axios from "axios";
//import router from "@/router";
import qs from "qs";
import { Message } from "element-ui";
//import { clearLoginInfo } from "../utils";

const errorMessages = res => `${res.status} ${res.statusText}`;

const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true
  /* headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  } */
});

/**
 * 请求拦截
 */
http.interceptors.request.use(
  config => {
    // get 请求加上随机数
    if (config.method == "get") {
      config.params = {
        t: new Date().getTime(),
        ...config.params
      };
    }

    // 请求头带上token
    // config.headers["token"] = Vue.cookie.get("token");
    // 或 config.headers['Authorization'] = Vue.cookie.get("token");

    // url 转换
    /* config.url = (process.env.NODE_ENV !== "production" && process.env.OPEN_PROXY
      ? "/proxyApi"
      : "") + config.url; */
    if (!config.baseURL) {
      config.baseURL = "/service";
    }

    // application/x-www-form-urlencoded 请求的数据进行序列化
    // console.log(config.headers['Content-Type'])
    if (
      config.headers["Content-Type"] &&
      config.headers["Content-Type"].indexOf(
        "application/x-www-form-urlencoded"
      ) != -1
    ) {
      config.data = qs.stringify(config.data);
    }

    // console.log(config)
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截
 */
http.interceptors.response.use(
  res => {
    if (res.data && (res.data.code === 401 || res.data.code === -999)) {
      // 401, token失效
      //clearLoginInfo();
      /*router.push({
        name: "login",
        params: { target: router.currentRoute.path }
      });*/
      Message.error(res.data.message);
      return Promise.reject(errorMessages(res));
    }
    if (res.data && res.data.code != undefined && res.data.code !== 200) {
      if (res.data.message) {
        Message.error(res.data.message);
      } else {
        Message.error("数据获取失败");
      }

      return Promise.reject(errorMessages(res));
    }

    if (res.data.body !== undefined) return res.data.body;
    return res.data;
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = "请求错误(400)";
          break;
        case 401:
          err.message = "未授权，请重新登录(401)";
          break;
        case 403:
          err.message = "拒绝访问(403)";
          break;
        case 404:
          err.message = "请求出错(404)";
          break;
        case 408:
          err.message = "请求超时(408)";
          break;
        case 500:
          err.message = "服务器错误(500)";
          break;
        case 501:
          err.message = "服务未实现(501)";
          break;
        case 502:
          err.message = "网络错误(502)";
          break;
        case 503:
          err.message = "服务不可用(503)";
          break;
        case 504:
          err.message = "网络超时(504)";
          break;
        case 505:
          err.message = "HTTP版本不受支持(505)";
          break;
        default:
          err.message = `连接出错(${err.response.status})!`;
      }
    } else {
      err.message = "连接服务器失败!";
    }
    Message.error(err.message);
    return Promise.reject(err);
  }
);

export default http;
