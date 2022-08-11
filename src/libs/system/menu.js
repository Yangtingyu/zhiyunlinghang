import httpRequest from "./httpRequest";
// import config from "@/config";

export default {
  // 获取完整菜单
  getMenuList() {
    return httpRequest({
      url: "/system/sys/security/menu/app"
    });
  },

  // 获取当前用户菜单 已经按seq排好序了
  getMenuNav(id) {
    return httpRequest({
      url: "/system/sys/security/permission/getMenuPermission",
      params: {
        id: id
      }
    });
  },

  // /sso/my 接口拿到的菜单有seq字段，但是不会及时更新，退出再进才会更新
  /* getMenuNavMy() {
    return httpRequest({
      url: "/sso/my",
      params: {
        appKey: config.appKey
      }
    });
  }, */

  insertOrUpdate(o) {
    return httpRequest({
      url: "/system/sys/security/menu",
      method: "put",
      params: o
    });
  },

  delete(id) {
    return httpRequest({
      url: "/system/sys/security/menu/" + id,
      method: "delete"
    });
  }
};
