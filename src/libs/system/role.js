import httpRequest from "./httpRequest";

export default {
  // 获取角色列表
  getList(o) {
    return httpRequest({
      url: "/system/sys/security/role",
      params: o
    });
  },

  // 获取单个角色信息
  getInfo(id) {
    return httpRequest({
      url: "/system/sys/security/role/" + id
    });
  },

  insertOrUpdate(o) {
    return httpRequest({
      url: "/system/sys/security/role",
      method: "put",
      params: o
    });
  },

  delete(id) {
    return httpRequest({
      url: "/system/sys/security/role/" + id,
      method: "delete"
    });
  }
};
