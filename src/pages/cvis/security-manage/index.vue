<!--/**
 * @name: index
 * @Author: xiao jun
 * @Date: 2022/8/8
 * @Description:
 */-->
<template>
  <div class="gxb-container">
    <div class="top-title">
      <div class="title-name">车路协同安全管理平台</div>
    </div>
    <div class="main fr">
      <div class="left">
        <div class="left-1">
          <div class="name">资产总数</div>
          <div class="value"><span v-for="(item,index) in terminalCountText" :key="index">{{item}}</span><div class="footer"></div></div>
        </div>

        <div class="left-2">

        </div>
      </div>
      <div class="center"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
  import { toThousands } from '@/utils/base';
  import {customList,commonList} from '@/api'
  import Mock from './mock'
  export default {
    name: "index",
    data() {
      return {
        isMock: window.VUE_CONFIG.isMockQuery,
        assetsCount: 0
      }
    },
    computed: {
      terminalCountText: function () {
        // console.log('terminalCountText computed ~', this.terminalCount)
        let num = this.assetsCount.toString();
        if (num.length > 6) {
          num = '999999';
        }
        let numArr = toThousands(num).split('');
        return numArr;
      },
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.getData('zcxx').then(data => {
          let num = data.find(item => item.name === '资产总数').val
          this.scrollNum(num, 'assetsCount');
        })
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
          "matchCondition": {
          }
        }
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
        let param = {'module': module, ...params[module]};
        console.log('param---', param);
        if (this.isMock) {
          return new Promise(resolve => {
            resolve(Mock[module]);
          });
        }
        if (['ztts_clw_sxzc_list'].includes(module)) {
          return new Promise((resolve, reject) => {
            commonList(param).then(res => {
              resolve(res);
            }).catch(res => {
              reject(res);
            });
          });
        }
        return new Promise((resolve, reject) => {
          customList(param).then(res => {
            resolve(res.rows || []);
          }).catch(res => {
            reject(res);
          });
        });
      }
    }
  }
</script>

<style src="@/assets/gxb/css/gxb-all.scss" scoped lang="scss"></style>
<style src="./index.scss" scoped lang="scss">

</style>
