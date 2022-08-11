import api_dic from "./../dic";

/*
 * 获取字典信息方法
 * dicCodeList 需要获取的字典code数组
 * callback 回调函数
 */
export function getDic(dicCodeList, callback) {
  // 获取未缓存key和已缓存key
  let hasList = [];
  let nonList = [];

  for (var index = 0; index < dicCodeList.length; index++) {
    var key = dicCodeList[index];
    if (sessionStorage.getItem(key) != null) {
      hasList.push(key);
    } else {
      nonList.push(key);
    }
  }

  // 获取未缓存数据
  if (nonList.length > 0) {
    api_dic.getDicList(nonList).then(data => {
      // const jsonStr = JSON.stringify(data || "[]");
      // console.log(dicCodeList);
      // console.log(jsonStr);
      // 缓存对象
      if (data) {
        for (index = 0; index < nonList.length; index++) {
          key = nonList[index];
          const jsonStr = JSON.stringify(data[key]);
          sessionStorage.setItem(key, jsonStr);
        }

        for (index = 0; index < hasList.length; index++) {
          key = hasList[index];
          const cache = sessionStorage.getItem(key);
          data[key] = JSON.parse(cache);
        }
      }

      // console.log("取数据");
      callback(data || []);
    });
  } else {
    var jsonData = {};
    for (index = 0; index < dicCodeList.length; index++) {
      key = dicCodeList[index];
      const cache = sessionStorage.getItem(key);
      jsonData[key] = JSON.parse(cache);
    }

    return new Promise(function(resolve, reject) {
      callback(jsonData);
      resolve();

      // console.log("取缓存");
    });
  }
}

// 通过字典项的值获取名称，对于可用过滤器的场合，可采用 commonFilter 中的 codeFilter
export function getNameByValue(v, dic) {
  const tmp = dic.find(item => item.itemValue == v);
  return tmp ? tmp.itemName : v + "（无匹配)";
}
