import httpRequest from "./httpRequest";

export default {
  // 获取组织列表
  getList(o) {
    return httpRequest({
      url: "/system/sys/security/org",
      params: {
        bindCurrentUser: false,
        ...o
      }
    });
  },

  // 获取单个组织信息
  getInfo(id) {
    return httpRequest({
      url: "/system/sys/security/org/" + id
    });
  },

  insertOrUpdate(o) {
    return httpRequest({
      url: "/system/sys/security/org",
      method: "put",
      params: o
    });
  },

  delete(id) {
    return httpRequest({
      url: "/system/sys/security/org/" + id,
      method: "delete"
    });
  }
};
