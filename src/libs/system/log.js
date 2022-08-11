import httpRequest from "./httpRequest";

export default {
  // 获取登录日志
  getLoginLogs(o) {
    return httpRequest({
      url: "/system/sys/security/log/login",
      params: o
    });
  },
  // 获取操作日志
  getOptLogs(o) {
    return httpRequest({
      url: "/system/sys/security/log/opt",
      params: o
    });
  }
};
