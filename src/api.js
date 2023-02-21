import util from '@/libs/util.js';

/**
 * 描述：获取数据api
 */
import httpRequest from "@/utils/httpRequest";
//  通用接口
const getDatasApi = "/" + window.globalConfig.serviceKey + "/bigscreen/getCtDatasByUserId";

//  通用接口-江苏
const getDatasJsApi = "/" + window.globalConfig.jiangSuKey + "/bigscreen/getCtDatasByUserId";


//  通用接口-江苏-平台详情
const getPtDatadetalApi = "/" + window.globalConfig.jiangSuKey + "/bigScreenController/findplatDetail";

//  通用自定义接口     数据
const customListApi = "/" + window.globalConfig.serviceKey + '/lotgg/custom';

//  挂图作战     数据
const jinyuCicApi = "/" + window.VUE_CONFIG.systemInfo.keyJinyuCic + '/lotgg/custom';

//  通用自定义接口     模糊查询
const commonListApi = "/" + window.globalConfig.serviceKey + '/lotgg/list';

//  通用自定义接口     模糊查询
const commonListJsApi = "/" + window.globalConfig.jiangSuKey + '/lotgg/list';

//  通用自定义接口     模糊查询
const JsApi = "/" + window.VUE_CONFIG.systemInfo.keyJiangXiIoT + '/lotgg/custom';

// 全局获取数据
export const getDatas = (opt) => {
  return httpRequest({
    url: getDatasApi,
    params: {
      userid: /*localStorage.getItem('id')*/util.cookies.get('uuid'),
      ...opt
    }
  });
};

export const getDatasJs = (opt) => {
  return httpRequest({
    url: getDatasJsApi,
    params: {
      userid: util.cookies.get('uuid'),
      ...opt
    }
  });
};

export const getPtDatadetal = (opt) => {
  return httpRequest({
    url: getPtDatadetalApi,
    params: {
      ...opt
    }
  });
};

export const customList = (opt) => {
  return httpRequest({
    url: customListApi + (opt.module ? ('?module=' + opt.module) : ""),
    method: "post",
    data: {
      ...opt
    }
  });
};
// export const commonList = (opt) => httpRequest.post(commonListApi, opt);
export const commonList = (opt) => {
  return httpRequest({
    url: commonListApi + (opt.module ? ('?module=' + opt.module) : ""),
    method: "post",
    data: {
      ...opt
    }
  });
};

export const jinyuCic = (opt, flag) => {
  return httpRequest({
    url: jinyuCicApi + (opt.module ? ('?module=' + opt.module) : ""),
    method: "post",
    data: {
      ...opt
    }
  });
};

export const commonListJs = (opt) => {
  return httpRequest({
    url: commonListJsApi,
    method: "post",
    data: {
      ...opt
    }
  });
};
export const customJs = (opt) => {
  return httpRequest({
    url: JsApi + (opt.module ? ('?module=' + opt.module) : ""),
    method: "post",
    data: {
      ...opt
    }
  });
};


export const getAttackPortTop5 = (params) => {
  return httpRequest({
    url: '/monitoring-query/tsgz5/dp/attackPortTop5',
    method: "get",
    params
  });
};

export const getDestTop5 = (params) => {
  return httpRequest({
    url: '/monitoring-query/tsgz5/dp/destTop5',
    method: "get",
    params
  });
};

export const getAttackType = (params) => {
  return httpRequest({
    url: '/monitoring-query/tsgz5/dp/attackType',
    method: "get",
    params
  });
};

export const getSafeLogStatistics = (params) => {
  return httpRequest({
    url: '/monitoring-query/tsgz5/dp/safeLogStatistics',
    method: "get",
    params
  });
};

export const getAttackTrend = (params) => {
  return httpRequest({
    url: '/monitoring-query/tsgz5/dp/attackTrend',
    method: "get",
    params
  });
};

export const getSrcTop5 = (params) => {
  return httpRequest({
    url: '/monitoring-query/tsgz5/dp/srcTop5',
    method: "get",
    params
  });
};

export const getSafeLogType = (params) => {
  return httpRequest({
    url: '/monitoring-query/tsgz5/dp/safeLogType',
    method: "get",
    params
  });
};

export const getMap = (params) => {
  return httpRequest({
    url: '/monitoring-query/tsgz5/dp/map',
    method: "get",
    params
  });
};
export const getCommonList = (data) => {
  return httpRequest({
    url: '/monitoring-query/dataanalysiscommon/list',
    method: "post",
    data
  });
};
