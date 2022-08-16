<!--/**
 * @name: index
 * @Author: xiao jun
 * @Date: 2022/8/8
 * @Description:
 */-->
<template>
  <div class="gxb-container">
    <div class="top-title">
      <div class="title-name">{{ appTitle }}</div>
    </div>
    <div class="main fr">
      <div class="left">
        <div class="left-1 part part-l">
          <div class="name">资产总数</div>
          <div class="value">
            <span v-for="(item, index) in terminalCountText" :key="index">{{
              item
            }}</span>
            <div class="footer"></div>
          </div>
        </div>

        <div class="left-2 part part-l">
          <div class="part-title">
            <span>资产安全态势</span>
            <img src="/image/cvis/icon_title.png" alt="" class="underline" />
          </div>
          <ul class="left-2-list">
            <li class="item" v-for="(item, index) in left2List" :key="index">
              <div class="l">
                <img
                  :src="`/image/cvis/icon_zcaqts_0${index + 1}.png`"
                  alt=""
                />
              </div>
              <div class="r">
                <div class="name">{{ item.name }}</div>
                <div class="count">{{ formatNumber(item.val) }}</div>
              </div>
            </li>
          </ul>
          <div class="left-2-radar">
            <radar :data="left2List" />
          </div>
        </div>

        <div class="left-3 part part-l">
          <div class="part-title">
            <span>漏洞态势 TOP10</span>
            <img src="/image/cvis/icon_title.png" alt="" class="underline" />
          </div>
          <div class="left3List">
            <div class="hd">
              <div class="td">排名</div>
              <div class="td">漏洞名称</div>
              <div class="td">单位数</div>
            </div>
            <div class="bd">
              <div
                v-for="(item, index) in left3List"
                :key="item.name"
                class="tr"
              >
                <div class="td">{{ ("0" + (index + 1)).substr(-2) }}</div>
                <div class="td">{{ item.name }}</div>
                <div class="td">{{ formatNumber(item.val) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="marquee">
          <marquee>
            <span v-for="(item, index) in marqueeList" :key="index">
              <span class="text">发现{{ item.ip }}遭受{{ item.lx }}</span>
              <span class="time">{{ item.time }}</span>
            </span>
          </marquee>
        </div>
        <div class="map">
          <div class="map-select">
            <div
              @click="mapType = 'china'"
              class="item"
              :class="{ active: mapType == 'china' }"
            >
              <img src="/image/cvis/type_china.png" alt="" />
              <span>中国</span>
            </div>
            <div
              @click="mapType = 'world'"
              class="item"
              :class="{ active: mapType == 'world' }"
            >
              <img src="/image/cvis/type_world.png" alt="" />
              <span>世界</span>
            </div>
          </div>
          <div class="map_wrap">
            <d-map :data="mapDataList" :mapType="mapType" />
          </div>
        </div>
        <div class="safe_trend part">
          <!-- <div class="part-title">
              <span>安全趋势</span>
              <img src="/image/cvis/icon_title.png" alt="" class="underline" />
            </div> -->
          <trend :data="trendDataList" />
        </div>
      </div>
      <div class="right"></div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
import { toThousands } from "@/utils/base";
import { customList, commonList } from "@/api";
import { formatNumber } from "@/libs/commonUtil.js";
import Radar from "../components/radar.vue";
import DMap from "../components/map.vue";
import Trend from "../components/trend.vue";
import Mock from "./mock";
export default {
  name: "index",
  components: { Radar, DMap, Trend },
  data() {
    return {
      appTitle: window.VUE_CONFIG.appTitle,
      formatNumber,
      isMock: window.VUE_CONFIG.isMockQuery,
      assetsCount: 0,
      left2List: [],
      left3List: [],
      marqueeList: [],
      mapDataList: [],
      mapType: "china",
      trendDataList: [],
    };
  },
  computed: {
    terminalCountText: function () {
      // console.log('terminalCountText computed ~', this.terminalCount)
      let num = this.assetsCount.toString();
      if (num.length > 6) {
        num = "999999";
      }
      let numArr = toThousands(num).split("");
      return numArr;
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getData("zcxx").then((data) => {
        let num = data.find((item) => item.name === "资产总数").val;
        this.scrollNum(num, "assetsCount");

        // 资产安全态势
        this.left2List = data.filter((item) => item.name !== "资产总数");
      });

      this.getData("ldts").then((data) => {
        this.left3List = data;
      });

      this.getData("gdbb").then((data) => {
        this.marqueeList = data;
      });

      this.getData("gjmap").then((data) => {
        this.mapDataList = data;
      });

      this.getData("aqqs").then((data) => {
        this.trendDataList = data;
      });
    },
    /**
     * 数字滚动
     * @param {Number} num 最终显示的值
     * @param {String} property 需要赋值的字段
     * @param {Number} time 动画时间
     * @return {void}
     * */
    scrollNum(num, property, time = 1000) {
      let subtract = num - this[property];
      let count = time / 50;
      let add = (subtract / count).toFixed(6) - 0;
      // console.log(subtract,add)
      let resultNum = this[property];
      let timer = setInterval(() => {
        resultNum += add;
        this[property] = parseInt(resultNum);
        // console.log(this[property])
        count--;
        if (count === 0) {
          this[property] = num;
          clearInterval(timer);
        }
      }, 50);
    },
    getData(module) {
      let commonParam = {
        matchCondition: {},
      };
      let params = {
        //滚动播报
        gdbb: commonParam,
        //攻击地图
        gjmap: commonParam,
        //资产信息
        zcxx: commonParam,
        //漏洞态势
        ldts: commonParam,
        //安全趋势
        aqqs: commonParam,
        //安全事件类型统计
        aqsjlxtj: commonParam,
        //安全事件详情
        aqsjxq: commonParam,
      };
      let param = { module: module, ...params[module] };
      console.log("param---", param);
      if (this.isMock) {
        return new Promise((resolve) => {
          resolve(Mock[module]);
        });
      }
      if (["ztts_clw_sxzc_list"].includes(module)) {
        return new Promise((resolve, reject) => {
          commonList(param)
            .then((res) => {
              resolve(res);
            })
            .catch((res) => {
              reject(res);
            });
        });
      }
      return new Promise((resolve, reject) => {
        customList(param)
          .then((res) => {
            resolve(res.rows || []);
          })
          .catch((res) => {
            reject(res);
          });
      });
    },
  },
};
</script>

<style src="@/assets/gxb/css/gxb-all.scss" scoped lang="scss"></style>
<style src="./index.scss" scoped lang="scss"></style>
