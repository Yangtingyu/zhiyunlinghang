import httpRequest from "./httpRequest";

export default {
  // 获取app列表
  getList() {
    return httpRequest({
      url: "/system/sys/security/app",
      params: {
        maxResult: 0 // 查出全部，不分页？
      }
    });
  }
};
