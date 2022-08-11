import httpRequest from "./httpRequest";
export default {
  // 获取数据字典
  getDicList(dicCodeArr) {
    let codeArray = [];
    dicCodeArr.forEach(function(item) {
      codeArray.push({ dicCode: item, pId: "-9", isQueryAllSon: "0" });
    });
    let data = {
      dicParam: JSON.stringify(codeArray),
      operator: -9,
      province: -9,
      service: -9
    };
    return httpRequest({
      url: "/everbase/dic/baseDicItem/selectSon",
      params: data,
      method: "get"
    });
  },
  getList(o) {
    return httpRequest({
      url: "/everbase/dic/baseDic",
      params: {
        ...o
      }
    });
  },

  /*更新*/
  update(o) {
    return httpRequest({
      url: "/everbase/dic/baseDic/update",
      method: "put",
      params: o
    });
  },
  /*添加字段管理*/
  add(o) {
    return httpRequest({
      url: "/everbase/dic/baseDic/add",
      method: "post",
      params: o
    });
  },

  delete(id) {
    return httpRequest({
      url: "/everbase/dic/baseDic/delete",
      params: { id: id },
      method: "put"
    });
  },
  getCode(id) {
    return httpRequest({
      url: "/everbase/dic/baseDicItem/listTree",
      params: { dicId: id }
    });
  },
  /*添加字段项*/
  addCode(o) {
    return httpRequest({
      url: "/everbase/dic/baseDicItem/add",
      method: "post",
      params: o
    });
  },
  /*更改字典项*/
  updateCode(o) {
    return httpRequest({
      url: "/everbase/dic/baseDicItem/update",
      method: "put",
      params: o
    });
  },
  /*删除字典项*/
  deleteCode(id) {
    return httpRequest({
      url: "/everbase/dic/baseDicItem/delete",
      params: { id: id },
      method: "put"
    });
  }
};
