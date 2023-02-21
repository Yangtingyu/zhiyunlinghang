
<template>
  <zebra-auto-fullscreen-container scaleMode="auto" center style="background-color: #081738">
    <div id="main" class="gxb-container" style="overflow:hidden;">
      <div class="top-title">
        <!-- <div class="title-name">{{ appTitle }}</div> -->
        <el-date-picker v-model="daterangeValue" @change="onDateChange" type="daterange"
          value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div class="main fr">
        <div class="left">
          <div class="left-1 part" style="width:100%">
            <div class="part-title">
              <span class="cursor" @click="$router.push({name: 'page1'})">攻击趋势</span>
              <img src="/image/cvis/icon_title.png" alt="" class="underline" />
            </div>
            <trend :data="left1Data" />
          </div>
          <div class="left-3 part">
            <div class="part-title">
              <span class="cursor" @click="$router.push({name: 'page1'})">攻击源 TOP5</span>
              <img src="/image/cvis/icon_title.png" alt="" class="underline" />
            </div>
            <div class="left3List">
              <div class="hd">
                <div class="td">城市</div>
                <div class="td">源IP</div>
                <div class="td">数量</div>
              </div>
              <div class="bd">
                <div v-for="(item, index) in left2Data" :key="index" class="tr"
                  :style="{'--width': (item.eventCount/ left2Max)*100 + '%'}">
                  <div class="td">{{ item.srcGeoCity }}</div>
                  <div class="td">{{ item.srcAddress }}</div>
                  <div class="td">{{ formatNumber(item.eventCount) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="center">
          <!-- <div class="marquee">
            <marquee>
              <span v-for="(item, index) in marqueeList" :key="index">
                <span class="text">发现{{ item.ip }}遭受{{ item.lx }}</span>
                <span class="time">{{ item.time }}</span>
              </span>
            </marquee>
          </div> -->
          <div class="map">
            <div class="map-select">
              <div @click="mapType = 'china'" class="item" :class="{ active: mapType == 'china' }">
                <img src="/image/cvis/type_china.png" alt="" />
                <span>中国</span>
              </div>
              <div @click="mapType = 'world'" class="item" :class="{ active: mapType == 'world' }">
                <img src="/image/cvis/type_world.png" alt="" />
                <span>世界</span>
              </div>
            </div>
            <div class="map_wrap">
              <d-map :data="mid1Data" :mapType="mapType" />
            </div>
          </div>
        </div>

        <div class="right">
          <div class="part">
            <div class="part-title">
              <span class="cursor" @click="$router.push({name: 'page1'})">攻击类型分布</span>
              <img src="/image/cvis/icon_title.png" alt="" class="underline" />
            </div>
            <div style="width: 100%; height: 250px">
              <zebra-echart :option="攻击类型分布option" />
            </div>
          </div>

          <div class="left-3 part">
            <div class="part-title">
              <span class="cursor" @click="$router.push({name: 'page1'})">攻击目标 TOP5</span>
              <img src="/image/cvis/icon_title.png" alt="" class="underline" />
            </div>
            <div class="left3List">
              <div class="hd">
                <div class="td">序号</div>
                <div class="td">攻击目标IP</div>
                <div class="td">数量</div>
              </div>
              <div class="bd">
                <div v-for="(item, index) in right2Data" :key="index" class="tr"
                  :style="{'--width': (item.eventCount/ right2Max)*100 + '%'}">
                  <div class="td">{{ ("0" + (index + 1)).substr(-2) }}</div>
                  <div class="td">{{ item.destAddress }}</div>
                  <div class="td">{{ formatNumber(item.eventCount) }}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="bottom">
        <div class="part" style="width:400px">
          <div class="part-title">
            <span class="cursor" @click="$router.push({name: 'page1'})">安全日志类型分布</span>
            <img src="/image/cvis/icon_title.png" alt="" class="underline" />
          </div>
          <div style="width: 100%; height: 300px">
            <rose :data="left3Data" />
          </div>
        </div>

        <div class="part" style="flex:1">
          <div class="part-title">
            <span class="cursor" @click="$router.push({name: 'page1'})">安全日志统计列表</span>
            <img src="/image/cvis/icon_title.png" alt="" class="underline" />
          </div>
          <div class="right3List">
            <div class="hd">
              <div class="td">攻击类型</div>
              <div class="td">事件级别</div>
              <div class="td">开始时间</div>
              <div class="td">结束时间</div>
              <div class="td">来源地址</div>
              <div class="td">目的地址</div>
              <div class="td">事件数量</div>
            </div>
            <vue-seamless-scroll :data="mid2Data" class="seamless-warp"
              style="height: 200px; overflow: hidden">
              <div class="bd">
                <div v-for="(item, index) in mid2Data" :key="index" class="tr">
                  <div class="td">{{ item.catAttackType }}</div>
                  <div class="td">{{ item.thresholdRange }}</div>
                  <div class="td">{{ item.startTime}}</div>
                  <div class="td">{{ item.endTime}}</div>
                  <div class="td">{{ item.srcAddress }}</div>
                  <div class="td">{{ item.destAddress}}</div>
                  <div class="td">{{ item.eventCount }}</div>
                </div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>

        <div class="left-3 part" style="width:450px">
          <div class="part-title">
            <span class="cursor" @click="$router.push({name: 'page1'})">攻击端口 TOP5</span>
            <img src="/image/cvis/icon_title.png" alt="" class="underline" />
          </div>
          <div class="left3List">
            <div class="hd">
              <div class="td">序号</div>
              <div class="td">端口</div>
              <div class="td">数量</div>
            </div>
            <div class="bd">
              <div v-for="(item, index) in right3Data" :key="index" class="tr"
                :style="{'--width': (item.eventCount/ right3Max)*100 + '%'}">
                <div class="td">{{ ("0" + (index + 1)).substr(-2) }}</div>
                <div class="td">{{ item.srcPort }}</div>
                <div class="td">{{ formatNumber(item.eventCount) }}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </zebra-auto-fullscreen-container>
</template>

<script>
import { toThousands } from '@/utils/base'
import { customList, commonList } from '@/api'
import { formatNumber } from '@/libs/commonUtil.js'
import Radar from '../components/radar.vue'
import DMap from '../components/map.vue'
import Trend from '../components/trend.vue'
import Rose from '../components/rose.vue'
import RotatePie from '../components/rotate-pie.vue'
import Mock from './mock'
import vueSeamlessScroll from 'vue-seamless-scroll'
import 攻击类型分布option from './攻击类型分布option'
import {
  getAttackPortTop5,
  getDestTop5,
  getAttackType,
  getSafeLogStatistics,
  getAttackTrend,
  getSrcTop5,
  getSafeLogType,
  getMap
} from '@/api.js'
import moment from 'moment'

export default {
  name: 'index',
  components: { Radar, DMap, Trend, Rose, RotatePie, vueSeamlessScroll },
  data () {
    return {
      daterangeValue: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },

      appTitle: window.VUE_CONFIG.appTitle,
      formatNumber,
      isMock: window.VUE_CONFIG.isMockQuery,
      assetsCount: 0,
      left2List: [],
      attackSourceList: [
        { ip: '12.21.12.123', city: '北京', val: 742 },
        { ip: '12.21.12.122', city: '上海', val: 548 },
        { ip: '12.21.12.212', city: '广州', val: 348 },
        { ip: '12.21.12.142', city: '深圳', val: 197 },
        { ip: '12.21.12.120', city: '重庆', val: 85 }
      ],
      攻击类型分布option: {},
      marqueeList: [],
      mapDataList: [],
      mapType: 'china',
      trendDataList: [],
      safeEventDataList: [],
      safeEventDetailList: [],
      left2Max: 0,
      right2Max: 0,
      right3Max: 0,
      left1Data: [],
      left2Data: [],
      left3Data: [],
      mid1Data: [],
      mid2Data: [],
      right1Data: [],
      right2Data: [],
      right3Data: []
    }
  },
  computed: {
    terminalCountText: function () {
      // console.log('terminalCountText computed ~', this.terminalCount)
      let num = this.assetsCount.toString()
      if (num.length > 6) {
        num = '999999'
      }
      let numArr = toThousands(num).split('')
      return numArr
    }
  },
  created () {
    this.init()
    setInterval(() => {
      this.init(false)
      console.log('自动随机增加数值')
    }, 1000 * 6)
    setInterval(() => {
      this.mapType = this.mapType == 'china' ? 'world' : 'china'
    }, 1000 * 60)

    window.onresize = () => {
      this.adaptation()
    }
  },
  mounted () {
    this.daterangeValue = [
      moment().subtract(3, 'months').format('YYYY-MM-DD'),
      moment().format('YYYY-MM-DD')
    ]
    this.getAllData()
  },
  methods: {
    getAllData () {
      this.getLeft1()
      this.getLeft2()
      this.getLeft3()
      this.getMid1()
      this.getMid2()
      this.getRight1()
      this.getRight2()
      this.getRight3()
    },
    onDateChange (e) {
      this.getAllData()
    },
    getLeft1 () {
      getAttackTrend({
        startTime: this.daterangeValue[0],
        endTime: this.daterangeValue[1]
      }).then((res) => (this.left1Data = res))
    },
    getLeft2 () {
      getSrcTop5({
        startTime: this.daterangeValue[0],
        endTime: this.daterangeValue[1]
      }).then((res) => {
        this.left2Data = res
        this.left2Max = Math.max(...res.map((item) => item.eventCount))
      })
    },
    getLeft3 () {
      getSafeLogType({
        startTime: this.daterangeValue[0],
        endTime: this.daterangeValue[1]
      }).then((res) => (this.left3Data = res))
    },

    getMid1 () {
      getMap({
        startTime: this.daterangeValue[0],
        endTime: this.daterangeValue[1]
      }).then((res) => {
        this.mid1Data = res
      })
    },

    getMid2 () {
      getSafeLogStatistics({
        startTime: this.daterangeValue[0],
        endTime: this.daterangeValue[1]
      }).then((res) => {
        this.mid2Data = res
      })
    },
    getRight1 () {
      getAttackType({
        startTime: this.daterangeValue[0],
        endTime: this.daterangeValue[1]
      }).then((res) => {
        const data = res.map((item) => ({
          name: item.catAttackType,
          value: item.eventCount
        }))
        this.攻击类型分布option = 攻击类型分布option(data)
      })
    },
    getRight2 () {
      getDestTop5({
        startTime: this.daterangeValue[0],
        endTime: this.daterangeValue[1]
      }).then((res) => {
        this.right2Data = res
        this.right2Max = Math.max(...res.map((item) => item.eventCount))
      })
    },
    getRight3 () {
      getAttackPortTop5({
        startTime: this.daterangeValue[0],
        endTime: this.daterangeValue[1]
      }).then((res) => {
        this.right3Data = res
        this.right3Max = Math.max(...res.map((item) => item.eventCount))
      })
    },
    rndIncrease () {
      return Math.ceil(Math.random() * 30)
    },
    handleAutoIncease (data) {
      return data.map((item) => ({
        ...item,
        val: item.val + this.rndIncrease()
      }))
    },
    adaptation () {
      var w = document.body.clientWidth
      var h = document.body.clientHeight
      var nw = 1920,
        nh = 1080
      var left, top, scale
      if (w / h > nw / nh) {
        scale = h / nh
        top = 0
        left = (w - nw * scale) / 2
      } else {
        scale = w / nw
        left = 0
        top = (h - nh * scale) / 2
      }
      document
        .getElementById('main')
        .setAttribute(
          'style',
          'transform: scale(' +
            scale +
            ');left:' +
            left +
            'px;top:' +
            top +
            'px;'
        )
      this.scale = scale
    },
    init (auto) {
      this.getData('zcxx').then((data) => {
        let _data = auto ? this.handleAutoIncease(data) : data
        let num = _data.find((item) => item.name === '资产总数').val
        this.scrollNum(num, 'assetsCount')
        // this.assetsCount = num;

        // 资产安全态势
        this.left2List = _data.filter((item) => item.name !== '资产总数')
      })

      // this.getData('ldts').then((data) => {
      //   let _data = auto ? this.handleAutoIncease(data) : data
      //   this.left3List = _data
      // })

      // this.getData('gdbb').then((data) => {
      //   this.marqueeList = data
      // })

      // this.getData('gjmap').then((data) => {
      //   this.mapDataList = data
      // })

      // this.getData('aqqs').then((data) => {
      //   let _data = auto ? this.handleAutoIncease(data) : data
      //   this.trendDataList = _data
      // })

      // this.getData('aqsjlxtj').then((data) => {
      //   let _data = auto ? this.handleAutoIncease(data) : data

      //   this.safeEventDataList = _data
      //     .sort(() => Math.random() - 0.5)
      //     .slice(0, 6)
      // })

      // this.getData('aqsjxq').then((data) => {
      //   this.safeEventDetailList = data
      // })
    },
    /**
     * 数字滚动
     * @param {Number} num 最终显示的值
     * @param {String} property 需要赋值的字段
     * @param {Number} time 动画时间
     * @return {void}
     * */
    scrollNum (num, property, time = 1000) {
      let subtract = num - this[property]
      let count = time / 50
      let add = (subtract / count).toFixed(6) - 0
      // console.log(subtract,add)
      let resultNum = this[property]
      let timer = setInterval(() => {
        resultNum += add
        this[property] = parseInt(resultNum)
        // console.log(this[property])
        count--
        if (count === 0) {
          this[property] = num
          clearInterval(timer)
        }
      }, 50)
    },
    getData (module) {
      let commonParam = {
        matchCondition: {}
      }
      let params = {
        // 滚动播报
        gdbb: commonParam,
        // 攻击地图
        gjmap: commonParam,
        // 资产信息
        zcxx: commonParam,
        // 漏洞态势
        ldts: commonParam,
        // 安全趋势
        aqqs: commonParam,
        // 安全事件类型统计
        aqsjlxtj: commonParam,
        // 安全事件详情
        aqsjxq: commonParam
      }
      let param = { module: module, ...params[module] }
      console.log('param---', param)
      if (this.isMock) {
        return new Promise((resolve) => {
          resolve(Mock[module])
        })
      }
      if (['ztts_clw_sxzc_list'].includes(module)) {
        return new Promise((resolve, reject) => {
          commonList(param)
            .then((res) => {
              resolve(res)
            })
            .catch((res) => {
              reject(res)
            })
        })
      }
      return new Promise((resolve, reject) => {
        customList(param)
          .then((res) => {
            resolve(res.rows || [])
          })
          .catch((res) => {
            reject(res)
          })
      })
    }
  }
}
</script>

<style src="@/assets/gxb/css/gxb-all.scss" scoped lang="scss"></style>
<style src="./index.scss" scoped lang="scss"></style>
<style scoped>
.cursor {
  cursor: pointer;
  position: relative;
  z-index: 9;
}
</style>
