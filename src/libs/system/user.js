import httpRequest from "./httpRequest";

export default {
  getList(o) {
    return httpRequest({
      url: "/system/sys/security/user",
      params: {
        bindCurrentUser: true,
        ...o
      }
    });
  },

  insertOrUpdate(o) {
    return httpRequest({
      url: "/system/sys/security/user",
      method: "put",
      params: o
    });
  },

  delete(id) {
    return httpRequest({
      url: "/system/sys/security/user/" + id,
      method: "delete"
    });
  },

  resetPassword(id) {
    return httpRequest({
      url: "/system/sys/security/user/password/" + id,
      method: "PUT"
    });
  }
};
