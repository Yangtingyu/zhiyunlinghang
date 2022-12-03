<template>
  <d2-container>
    <div style="padding:20px">
      <div class="main-content">
        <div data-v-581b0279="" class="threat-analysis">

          <!---->
          <div data-v-5604a00e="" data-v-581b0279="" class="event-chart">
            <div data-v-5604a00e="" class="el-row" style="margin-left: -10px; margin-right: -10px;">
              <div data-v-5604a00e="" class="el-col el-col-5"
                style="padding-left: 10px; padding-right: 10px;">
                <ul data-v-5604a00e="" class="eventText"><a data-v-5604a00e=""
                    href="#/pe_overview/threatAnalysis/securityEvent?startDate=2022-12-03%2000%3A00%3A00&amp;endDate=2022-12-03%2023%3A59%3A59"
                    class="" target="_blank">
                    <div data-v-5604a00e="" class="icon-left"><img data-v-5604a00e=""
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAmCAYAAACyAQkgAAADTElEQVRYhc2YX2jNYRjHP2d//FlrLUutVqtdqMlktFxxIeJC7UKWWpkbjd3MMFKSmgsuFKNQyo2kLCFJpBEXbohaUhIxsi2MzMg2X73rOXk7Ozvnd37nt3P21Nvv+b3v932e7+/9vX+e50VSVGWJpKuSBiUNSOqRVBuV/ahIrpM0oqnyTdKqKHzEJtlmJ5XAC2CBWbkHxIC19j4ELLVneInga69449jm1Xd49Zfy/evXeGRuJGm/bW1/Ja3OF9EiSX1G5JekmiSYRZJ+G+aZpMJ8EG33RrMrBe64h9uRa6ILJQ2b83eSSlJgyyR9MuyQpPJcEj3vjVJTAPw2D9+dK6LLJU2Y04eSYgntc634dQ7z2PqMSaqbaaIxI+dkXFJ9QvsySV8lfZa0OKGtwfvA3pkm2uz9wjNJ2g977Z0RTJlQREslfTAnbsQqkmCOekQOJGmvlPTdW4TzgvovyOBIOwhUmX4I+BLiOBwAukyvBvYF7hnwi/yN+3mKjTvdiLpSLOmlYX5Kqo5yRI8Dc03fDUxkPJb/ZQzYZW8lZjutBCG6Hmg0vQe4nwXJuNwFrpveBKzJlmgx0G36KNAZAcm47AF+m34KKEoFTke0Hag1/RjwPjKa8BY4aXodsDMlOsUE9reSNwG3kiCLKdMtL+1iciNYZvpe7zdFKSPAfrNXARyZzvZ0RFcCLaa7xXNtBkjG5TLwyPRWoD4ZKBnRmC0g9xy3eRpUBjzc14B9ZD7clldoCys2FTV1PmQTkrm49Jyk05kcj1bOen6b0531kQS5IYsfjPcnBuOJRv20YXsOScbLtOmND3K3Gn8M9ERSQQhHjXZL4v7GhhD9p00YfdAdA4RNbV2gMuyNyFDIj/VT8GuJRDd6jWEvC9ycGvfsuJRjfkhb/qXG+jjROZJeWeUPSVVZzDH/ZEqVQqcrLvQbNTsuJCxylS0ZHnvpSn2SXCpM6fJ4bXXJWq+FWW6zrpmhozKMlAL9QLm7eHMnU4MZuTWLSGJxwE3TGxzRefYS9MjLpQybr1JH9LW9bLGEa7aIm4abjUufm6MdwAmrcFH8A+CjBQv5kipbNyXmvzW+UV/U7JUL7obGvxrfBLQBK7xr7nzIX2AQeApcmIyFgX/dbFUhDN0FjAAAAABJRU5ErkJggg==">
                    </div>
                    <div data-v-5604a00e="" class="fl">
                      <h1 data-v-5604a00e="">成功安全事件</h1>
                      <h2 data-v-5604a00e="">127</h2>
                    </div>
                  </a><a data-v-5604a00e=""
                    href="#/pe_overview/threatAnalysis/sinkingAssets?startDate=2022-12-03%2000%3A00%3A00&amp;endDate=2022-12-03%2023%3A59%3A59&amp;victimIpAssets="
                    class="" target="_blank">
                    <div data-v-5604a00e="" class="icon-left"><img data-v-5604a00e=""
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAmCAYAAABQ3RJZAAADOElEQVRYhe2Y24uOQRzHP+sspSQp67ByyAXFsjlbJXJYytVSNpQoxa1rhfgDhBtkkXJIaO3NOpUSbQl7pU1Ii7QHG8Lar2abt2bHztjnNe9bar817zMzv9P3fZ6Z+f2eB0mFaIckddprcv8l5qcA+AEMBb4DI1K7LxRp12lJaueDUjssBgZIFwsx0lOAOuApsD8jn4/2+j6j3T4bz8QtC2pFjpZH6o1VGY6lZZLO2mt/bVZ58e6GdIdE/vU8b1wBNET0hwELgTnAZOAzUAXMBV4Aj4GvEfsF3nhRPnf6hvOvuySVB/QqJNXaZBLDV0nnJS0J+Cm3cXK4GeIWIz1a0mFJFyWt6UM+SdLVvxAN4ZakqX34XGPjHbHxk2bEdUAtMNabNxvvIfAKaAPG2A29FJjg6ZrlsxO4ljl6Hrl/u/cYDRokVUoqCdiY+cWSbnt2vyTtycohK+Eqj3CLpPUZfZgl8Nrx0S1pS6FIT5bU6gRrklSax5MybbykRseX2cQzCkH6uhPkraSJeRLOtXGSmh2fd1KTXuo9zhX/SDjXKrzl1tcplTfpK47j2kSEc+2k47u+PzZmV5vMswcY5R0sz4FjwEjgAzDczs8GmiIHksmcm4Dx1u4G8CSiPw14aevuX/ZobAcO2Ozq4gtwyjB/H0kCuyVtdMaNkTswUtK5gJ9zVh6ydTflVkm7IpzemSrvU+QufPJqgljtcQaoCchqrDyEOmfe1C+tMU6mYFptM5xfPL0B6oHNztyLgKNKoNoZ19nMaDLhejtn5CeBe33YP3P6U2yWXGcLLxddwO3+bJRbzqPZENA54ehc9GRm4+ZwKmC/0rEPlqS5lurNZabTv+TJLjv96QH7LqcfK5d7kIp0m9Of5MlKnX57imCpSN93+gftejTfO9bacQ4PUgRLRfqs8z441m7Ebz2bBsbZeSM/nSJYKtKdwBagIyDvsPLOFMFSfkIwS2Q+cMGbN+P53hL6J6T+7tEMbPPmzLg5ZZCBL0zFwgDpYuG/JB3K84OBvTYFz3LmdwDLM/jvBo72Q2+i0y+zNiYZHQd+/qEdqKSqIkV4MVGdpcozdfPbDHe0EGixn317A/gNpf3fUp9tMEMAAAAASUVORK5CYII=">
                    </div>
                    <div data-v-5604a00e="" class="fl">
                      <h1 data-v-5604a00e="">失陷资产</h1>
                      <h2 data-v-5604a00e="">77</h2>
                    </div>
                  </a></ul>
              </div>
              <div data-v-5604a00e="" class="el-col el-col-10"
                style="padding-left: 10px; padding-right: 10px;">
                <div data-v-21b88e15="" data-v-5604a00e="" class="box-chart">
                  <h3 data-v-21b88e15="">攻击阶段链条</h3>
                  <div data-v-5604a00e="" data-v-21b88e15="" class="bar-chart" ref="barChart"
                    style="-webkit-tap-highlight-color: transparent; user-select: none; position: relative;"
                    _echarts_instance_="ec_1670072776923">
                    <div
                      style="position: relative; width: 658px; height: 274px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;">
                      <canvas data-zr-dom-id="zr_0" width="658" height="274"
                        style="position: absolute; left: 0px; top: 0px; width: 658px; height: 274px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas>
                    </div>
                    <div
                      style="position: absolute; display: none; border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px / 21px sans-serif; padding: 5px; left: 126px; top: 222px; pointer-events: none;">
                      侦查: 314298</div>
                  </div>
                </div>
              </div>
              <div data-v-5604a00e="" class="el-col el-col-9"
                style="padding-left: 10px; padding-right: 10px;">
                <div data-v-21b88e15="" data-v-5604a00e="" class="box-chart">
                  <h3 data-v-21b88e15="">告警规则占比</h3>
                  <div data-v-5604a00e="" data-v-21b88e15="">
                    <div data-v-5604a00e="" data-v-21b88e15="" class="pie-chart" ref="pieChart"
                      style="-webkit-tap-highlight-color: transparent; user-select: none; position: relative;"
                      _echarts_instance_="ec_1670072776924">
                      <div
                        style="position: relative; width: 248px; height: 274px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;">
                        <canvas data-zr-dom-id="zr_0" width="248" height="274"
                          style="position: absolute; left: 0px; top: 0px; width: 248px; height: 274px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas>
                      </div>
                      <div></div>
                    </div>
                    <ul data-v-5604a00e="" data-v-21b88e15="" class="pie-text">
                      <li data-v-5604a00e="" data-v-21b88e15=""><em data-v-5604a00e=""
                          data-v-21b88e15="" style="background: rgb(85, 160, 248);"></em><span
                          data-v-5604a00e="" data-v-21b88e15="" class="pie-name">网络探测（新）</span><span
                          data-v-5604a00e="" data-v-21b88e15="" class="pie-rate">99%</span><span
                          data-v-5604a00e="" data-v-21b88e15="" class="pie-value">314318</span></li>
                      <li data-v-5604a00e="" data-v-21b88e15=""><em data-v-5604a00e=""
                          data-v-21b88e15="" style="background: rgb(102, 200, 202);"></em><span
                          data-v-5604a00e="" data-v-21b88e15="" class="pie-name">恶意程序（新）</span><span
                          data-v-5604a00e="" data-v-21b88e15="" class="pie-rate">0%</span><span
                          data-v-5604a00e="" data-v-21b88e15="" class="pie-value">656</span></li>
                      <li data-v-5604a00e="" data-v-21b88e15=""><em data-v-5604a00e=""
                          data-v-21b88e15="" style="background: rgb(114, 199, 124);"></em><span
                          data-v-5604a00e="" data-v-21b88e15="" class="pie-name">监测规则</span><span
                          data-v-5604a00e="" data-v-21b88e15="" class="pie-rate">0%</span><span
                          data-v-5604a00e="" data-v-21b88e15="" class="pie-value">409</span></li>
                      <li data-v-5604a00e="" data-v-21b88e15=""><em data-v-5604a00e=""
                          data-v-21b88e15="" style="background: rgb(245, 211, 89);"></em><span
                          data-v-5604a00e="" data-v-21b88e15=""
                          class="pie-name">Web攻击（新）</span><span data-v-5604a00e=""
                          data-v-21b88e15="" class="pie-rate">0%</span><span data-v-5604a00e=""
                          data-v-21b88e15="" class="pie-value">400</span></li>
                      <li data-v-5604a00e="" data-v-21b88e15=""><em data-v-5604a00e=""
                          data-v-21b88e15="" style="background: rgb(226, 109, 125);"></em><span
                          data-v-5604a00e="" data-v-21b88e15="" class="pie-name">可疑行为（新）</span><span
                          data-v-5604a00e="" data-v-21b88e15="" class="pie-rate">0%</span><span
                          data-v-5604a00e="" data-v-21b88e15="" class="pie-value">233</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div data-v-3a10c694="" data-v-581b0279="" class="el-row"
            style="margin-left: -10px; margin-right: -10px; margin-top: 20px;">
            <div data-v-3a10c694="" class="el-col el-col-8"
              style="padding-left: 10px; padding-right: 10px;">
              <div data-v-21b88e15="" data-v-3a10c694="" class="box-chart">
                <h3 data-v-21b88e15="">危害等级对比</h3>
                <div data-v-59e0894c="" data-v-3a10c694="" class="chart" ref="whChart"
                  data-v-21b88e15=""
                  style="-webkit-tap-highlight-color: transparent; user-select: none; position: relative;"
                  _echarts_instance_="ec_1670072776925">
                  <div
                    style="position: relative; width: 523px; height: 274px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;">
                    <canvas data-zr-dom-id="zr_0" width="523" height="274"
                      style="position: absolute; left: 0px; top: 0px; width: 523px; height: 274px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas>
                  </div>
                  <div
                    style="position: absolute; display: none; border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px / 21px sans-serif; padding: 5px; left: 127px; top: 84px; pointer-events: none;">
                    2022-12-03 02:00:00<br><span
                      style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#72c77c;"></span>低危:
                    76,409<br><span
                      style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#f5d359;"></span>中危:
                    0<br><span
                      style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#e26d7d;"></span>高危:
                    4</div>
                </div>
              </div>
            </div>
            <div data-v-3a10c694="" class="el-col el-col-8"
              style="padding-left: 10px; padding-right: 10px;">
              <div data-v-21b88e15="" data-v-3a10c694="" class="box-chart">
                <h3 data-v-21b88e15="">攻击源TOP</h3>
                <div data-v-3a10c694="" class="top-component" data-v-21b88e15=""
                  style="-webkit-tap-highlight-color: transparent; user-select: none; position: relative;"
                  _echarts_instance_="ec_1670072776927" ref="gjTop10">
                  <div
                    style="position: relative; width: 523px; height: 274px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;">
                    <canvas data-zr-dom-id="zr_0" width="523" height="274"
                      style="position: absolute; left: 0px; top: 0px; width: 523px; height: 274px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas>
                  </div>
                  <div
                    style="position: absolute; display: none; border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px / 21px sans-serif; padding: 5px; left: 322px; top: 110px; pointer-events: none;">
                    192.168.202.128 (局域网)<br><span
                      style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#008dff;"></span>10173
                  </div>
                </div>
              </div>
            </div>
            <div data-v-3a10c694="" class="el-col el-col-8"
              style="padding-left: 10px; padding-right: 10px;">
              <div data-v-21b88e15="" data-v-3a10c694="" class="box-chart">
                <h3 data-v-21b88e15="">事件TOP</h3>
                <div data-v-3a10c694="" class="top-component" data-v-21b88e15=""
                  style="-webkit-tap-highlight-color: transparent; user-select: none; position: relative;"
                  _echarts_instance_="ec_1670072776926" ref="sjTop10">
                  <div
                    style="position: relative; width: 523px; height: 274px; padding: 0px; margin: 0px; border-width: 0px;">
                    <canvas data-zr-dom-id="zr_0" width="523" height="274"
                      style="position: absolute; left: 0px; top: 0px; width: 523px; height: 274px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
          <div style="display:none" data-v-5244b1cc="" data-v-581b0279="" class="attack-map cb">
            <div data-v-5244b1cc="" class="threat-title"><span data-v-5244b1cc="">攻击来源</span></div>
            <div data-v-5244b1cc="" class="chart"
              style="height: 400px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;"
              _echarts_instance_="ec_1670072776928">
              <div
                style="position: relative; width: 1348px; height: 400px; padding: 0px; margin: 0px; border-width: 0px;">
                <canvas data-zr-dom-id="zr_0" width="1348" height="400"
                  style="position: absolute; left: 0px; top: 0px; width: 1348px; height: 400px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas>
              </div>
              <div></div>
            </div>
            <div data-v-49011cdc="" data-v-5244b1cc="" class="map-detail" style="height: 400px;">
              <div data-v-49011cdc="" class="radio"><span data-v-49011cdc="" class="">全球</span><span
                  data-v-49011cdc="" class="active">境内</span></div>
              <div data-v-49011cdc="" class="detail-list">
                <div data-v-49011cdc="" class="list-title"><span data-v-49011cdc=""
                    class="detail-dot">排名</span><span data-v-49011cdc=""
                    class="detail-text">地区</span><span data-v-49011cdc=""
                    class="detail-count">数量</span><span data-v-49011cdc=""
                    class="detail-num">占比</span></div><span data-v-49011cdc=""
                  class="detail-text-null">暂无数据</span>
              </div>
              <div class="el-loading-mask" style="display: none;">
                <div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular">
                    <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
                  </svg>
                  <!---->
                </div>
              </div>
            </div><img data-v-5244b1cc=""
              src="data:image/png;base64,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"
              class="img">
          </div>
        </div>
      </div>
    </div>
    <common-list typeName="network" />
  </d2-container>
</template>

<script>
import * as echarts from 'echarts'
import SearchForm from './searchForm.vue'
import CommonList from './commonList.vue'
export default {
  components: {
    CommonList,
    SearchForm
  },
  data () {
    return {
      list0: [],
      colors: [
        '#55a0f8',
        '#66c8ca',
        '#72c77c',
        '#f5d359',
        '#e26d7d',
        '#8e66dd',
        '#ea0cee'
      ],
      successStat: 0,
      vicAssetStat: 0,
      ruleClassStat: [],
      list: [],
      formItems: [
        {
          label: 'IP地址',
          prop: 'target',
          type: 'input'
        },
        {
          label: '端口',
          prop: 'port',
          type: 'input'
        }
      ],
      tableItems: {
        target: 'IP地址',
        deviceName: '操作系统',
        deviceClass: '操作系统版本',
        risk: '风险得分',
        osName: '端口描述',
        portBanner: '用户列表',
        shareInfo: '共享列表信息',
        protocol: '是否存活',
        port: '端口号',
        serv: '服务',
        protocol: '协议',
        isp: '策略说明',
        description: '漏洞说明',
        poc: 'poc信息',
        cve: 'cve编号',
        insertTime: '发现时间'
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    handleSearch (e) {
      console.log(e)
      if (!e.port && !e.target) return (this.list = this.list0)

      this.list = this.list0.filter(
        (item) => item.port == e.port || item.target == e.target
      )
    },
    init () {
      this.setBarChart()
      this.setPieChart()
      // this.eventData()
      this.setWhchart()
      this.setGjTop10()
      this.setSjTop10()
    },
    toPercent (t) {
      var e = Number(100 * t).toFixed(0)
      return (e += '%')
    },
    eventData () {
      var t = this
      i.default.successStat(this.timeDate).then(function (e) {
        t.successStat = e
      }),
      i.default.vicAssetStat(this.timeDate).then(function (e) {
        t.vicAssetStat = e
      })
    },
    setBarChart () {
      var t = this,
        e = [],
        a = []

      var r = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        color: ['#55a0f8'],
        xAxis: {
          type: 'category',
          data: [
            '侦查',
            '攻击尝试',
            '成功入侵',
            '命令与控制',
            '木马植入',
            '危害实施'
          ],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            },
            interval: 0
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        },
        series: [
          {
            data: [318820, 932, 466, 256, 0, 689],
            type: 'bar',
            barWidth: '50%',
            label: {
              show: true,
              formatter: '{c}'
            }
          }
        ]
      }
      echarts.init(t.$refs.barChart).setOption(r, !0)
    },
    setPieChart () {
      var t = this

      var a = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        color: [
          '#55a0f8',
          '#66c8ca',
          '#72c77c',
          '#f5d359',
          '#e26d7d',
          '#8e66dd',
          '#ea0cee'
        ],
        legend: {
          show: false
        },
        graphic: [
          {
            type: 'text',
            left: 'center',
            top: '42%',
            style: {
              text: '告警总数:',
              textAlign: 'center',
              fill: '#8a8585',
              width: 30,
              fontSize: 14,
              color: '#4d4f5c'
            }
          },
          {
            type: 'text',
            left: 'center',
            top: '50%',
            style: {
              text: '320763',
              textAlign: 'center',
              fill: '#333',
              width: 30,
              fontSize: 24,
              fontFamily: "'Arial Normal', 'Arial'"
            }
          }
        ],
        series: [
          {
            name: '访问来源',
            avoidLabelOverlap: true,
            type: 'pie',
            radius: ['50%', '70%'],
            minAngle: 6,
            itemStyle: {
              normal: {
                borderWidth: 4,
                borderColor: '#ffffff'
              }
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {
                ruleClass: '23',
                ruleCount: 318462,
                ruleClassName: '网络探测（新）',
                rate: '0.99',
                allCount: 320763,
                name: '网络探测（新）',
                value: 318462
              },
              {
                ruleClass: '22',
                ruleCount: 948,
                ruleClassName: 'Web攻击（新）',
                rate: '0.00',
                allCount: 320763,
                name: 'Web攻击（新）',
                value: 948
              },
              {
                ruleClass: '20',
                ruleCount: 694,
                ruleClassName: '恶意程序（新）',
                rate: '0.00',
                allCount: 320763,
                name: '恶意程序（新）',
                value: 694
              },
              {
                ruleClass: '39',
                ruleCount: 414,
                ruleClassName: '监测规则',
                rate: '0.00',
                allCount: 320763,
                name: '监测规则',
                value: 414
              },
              {
                ruleClass: '24',
                ruleCount: 245,
                ruleClassName: '可疑行为（新）',
                rate: '0.00',
                allCount: 320763,
                name: '可疑行为（新）',
                value: 245
              }
            ]
          }
        ]
      }
      echarts.init(t.$refs.pieChart).setOption(a, !0)
    },
    setWhchart: function () {
      var t = {
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 100
          },
          {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100
          }
        ],
        legend: {
          right: 50,
          icon: 'circle',
          data: ['低危', '中危', '高危']
        },
        grid: {
          top: '13%',
          left: '3%',
          right: '4%',
          bottom: '13%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '2022-12-03 00:00:00',
            '2022-12-03 01:00:00',
            '2022-12-03 02:00:00',
            '2022-12-03 03:00:00',
            '2022-12-03 04:00:00',
            '2022-12-03 05:00:00',
            '2022-12-03 06:00:00',
            '2022-12-03 07:00:00',
            '2022-12-03 08:00:00',
            '2022-12-03 09:00:00',
            '2022-12-03 10:00:00',
            '2022-12-03 11:00:00',
            '2022-12-03 12:00:00',
            '2022-12-03 13:00:00',
            '2022-12-03 14:00:00',
            '2022-12-03 15:00:00',
            '2022-12-03 16:00:00',
            '2022-12-03 17:00:00',
            '2022-12-03 18:00:00',
            '2022-12-03 19:00:00',
            '2022-12-03 20:00:00',
            '2022-12-03 21:00:00',
            '2022-12-03 22:00:00',
            '2022-12-03 23:00:00'
          ]
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#C1BFBF',
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: '低危',
            type: 'line',
            smooth: true,
            itemStyle: {
              color: '#72c77c'
            },
            data: [
              70403, 105139, 76409, 5172, 14572, 5208, 5042, 5086, 5594, 5609,
              5563, 5599, 5556, 4840, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ]
          },
          {
            name: '中危',
            type: 'line',
            smooth: true,
            itemStyle: {
              color: '#f5d359'
            },
            data: [
              0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 6, 113, 114, 312, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0
            ]
          },
          {
            name: '高危',
            type: 'line',
            smooth: true,
            itemStyle: {
              color: '#e26d7d'
            },
            data: [
              6, 3, 4, 31, 2, 2, 0, 0, 5, 5, 4, 37, 38, 59, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0
            ]
          }
        ]
      }
      echarts.init(this.$refs.whChart).setOption(t, !0)
    },
    setGjTop10 () {
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        color: '#008dff',
        legend: {
          data: []
        },
        grid: {
          top: '6%',
          left: '3%',
          right: '8%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {},
            data: [
              '192.168.205.251',
              '176.58.117.241',
              '192.168.228.103',
              '192.168.203.43',
              '192.168.228.104',
              '192.168.202.128',
              '10.0.3.196',
              '192.168.205.242',
              '192.168.32.158',
              '192.168.203.146'
            ]
          }
        ],
        series: [
          {
            type: 'bar',
            itemStyle: {
              barBorderRadius: [5, 5, 5, 5]
            },
            barWidth: 10,
            data: [
              {
                value: 5607,
                query:
                  "((sip='192.168.205.251'and ctrl!=2) or (dip='192.168.205.251'and ctrl=2))and attack_stage !='0'",
                address: '局域网'
              },
              {
                value: 5824,
                query:
                  "((sip='176.58.117.241'and ctrl!=2) or (dip='176.58.117.241'and ctrl=2))and attack_stage !='0'",
                address: '英国伦敦'
              },
              {
                value: 6086,
                query:
                  "((sip='192.168.228.103'and ctrl!=2) or (dip='192.168.228.103'and ctrl=2))and attack_stage !='0'",
                address: '局域网'
              },
              {
                value: 7300,
                query:
                  "((sip='192.168.203.43'and ctrl!=2) or (dip='192.168.203.43'and ctrl=2))and attack_stage !='0'",
                address: '局域网'
              },
              {
                value: 8535,
                query:
                  "((sip='192.168.228.104'and ctrl!=2) or (dip='192.168.228.104'and ctrl=2))and attack_stage !='0'",
                address: '局域网'
              },
              {
                value: 10173,
                query:
                  "((sip='192.168.202.128'and ctrl!=2) or (dip='192.168.202.128'and ctrl=2))and attack_stage !='0'",
                address: '局域网'
              },
              {
                value: 10431,
                query:
                  "((sip='10.0.3.196'and ctrl!=2) or (dip='10.0.3.196'and ctrl=2))and attack_stage !='0'",
                address: '局域网'
              },
              {
                value: 11976,
                query:
                  "((sip='192.168.205.242'and ctrl!=2) or (dip='192.168.205.242'and ctrl=2))and attack_stage !='0'",
                address: '局域网'
              },
              {
                value: 13763,
                query:
                  "((sip='192.168.32.158'and ctrl!=2) or (dip='192.168.32.158'and ctrl=2))and attack_stage !='0'",
                address: '局域网'
              },
              {
                value: 205596,
                query:
                  "((sip='192.168.203.146'and ctrl!=2) or (dip='192.168.203.146'and ctrl=2))and attack_stage !='0'",
                address: '局域网'
              }
            ]
          }
        ]
      }
      echarts.init(this.$refs.gjTop10).setOption(option, !0)
    },
    setSjTop10 () {
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        color: '#008dff',
        legend: {
          data: []
        },
        grid: {
          top: '6%',
          left: '3%',
          right: '8%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              formatter: function (params, index) {
                // 超出省略
                params = params.toString()
                var maxlength = 14
                if (params.length > maxlength) {
                  return params.substring(0, maxlength - 1) + '...'
                } else {
                  return params
                }
              }
            },
            data: [
              'SSH协议登录行为检测',
              '[成功事件]Mysql数据库登录成功',
              'FTP登陆成功',
              'Mysql数据库登陆失败',
              '挖矿协议_jsonrpc协议_矿工登录矿池',
              '敏感目录及文件网络扫描探测-敏感服务路径3',
              '敏感目录及文件网络扫描探测-敏感服务路径8',
              '可疑行为向日葵建立连接',
              'PostgreSQL数据库基于时间进行的SQL注入漏洞',
              '敏感文件网络扫描探测'
            ]
          }
        ],
        series: [
          {
            type: 'bar',
            itemStyle: {
              barBorderRadius: [5, 5, 5, 5]
            },
            barWidth: 10,
            data: [
              {
                value: 287
              },
              {
                value: 294
              },
              {
                value: 295
              },
              {
                value: 345
              },
              {
                value: 647
              },
              {
                value: 719
              },
              {
                value: 1837
              },
              {
                value: 10601
              },
              {
                value: 53222
              },
              {
                value: 259915
              }
            ]
          }
        ]
      }
      echarts.init(this.$refs.sjTop10).setOption(option, !0)
    }
  }
}
</script>

<style>
.d2-layout-header-aside-group
  .d2-layout-header-aside-content
  .d2-theme-header
  .logo-group {
  line-height: 65px;
}

.box-chart[data-v-21b88e15] {
  width: 100%;
  height: 326px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
}

.box-chart h3[data-v-21b88e15] {
  font-size: 16px;
  color: #333;
  border-bottom: 1px solid #ebebeb;
  height: 53px;
  line-height: 53px;
  padding-left: 20px;
}

.event-chart[data-v-5604a00e] {
  padding-top: 20px;
  height: 348px;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.event-chart .fl[data-v-5604a00e] {
  float: left;
  width: 65%;
  margin-top: 40px;
  padding-left: 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: left;
}

.event-chart .data-null[data-v-5604a00e] {
  font-size: 14px;
  color: #666;
  line-height: 50px;
  padding-left: 20px;
}

.event-chart .eventText a[data-v-5604a00e] {
  width: 100%;
  height: 150px;
  display: inline-block;
  border: 1px solid rgba(248, 44, 44, 0.6);
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}

.event-chart .eventText a[data-v-5604a00e]:nth-child(2) {
  margin-bottom: 0;
}

.event-chart .eventText a:nth-child(2) .icon-left[data-v-5604a00e] {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAACBCAYAAADzGYX0AAAIZklEQVR4nO2daXLcNhBGm6MZydrH1hlS+eMD5AC5Vf6ncpqcIAfIEXIJW4u1b0w9knDoCYcASXDr6Vc1ZZeGIkF8QAPobkDJ4+fPIiI/icgfIvKriJyJMUuWIvKziPwtImuTcN4sROR3E1IHi8K0GgpY2Biph8WuV4AmTExFmJiKMDEVYWIqwsRUhImpCBNTESamIkxMRZiYijAxFWFiKsLEVISJqQgTUxEmpiJMTEWYmIowMRVhYirCxFSEiakIE1MRJqYiTExFmJiKMDEVYWIqwsRUhImpCBNTESamIkxMRZiYijAxFWFiKsLEVISJqQgTUxEmpiKWu14BjdjbEzk5kWR/P/ut9PlZ5PZW5O1tEsUzMUPZ25Pk40eRxX/GLDk4EFmtJL28nISgZmYDSU5PfxDyO4tF/t0EMDFDWa22X1j33YCYmCHQI5Nk+4V8V9Vrhy7m6CUwomFiKsLEVISJqQgTUxEmpiJMTEWYmIowMRVhYirCxFTENENgOK754O8ktETccMwQU5rGuaZP9vYmJuZymYeTKqIQ6eNjHgh+fx++XAhFYyI4XQXfjSUmDZ6A+YcPEzKzCEnwd0s4icIm5+ejRSeyxtTiu14hlnp+ntWNTGbMTBJJzs7qw0xSmN/j46FK9SN3d5WiZT+7uxunTNRFqfFPw8ySU7MMK0pyeCgplTeGub25kfThIS8vMJa/vAxfDil65eHhDz+ajphNoDU+PY1TVsQbS8AyFcPRNMRsOg5um4j0BeXjmQwD7uNg4oOVYBI0pLWoqINpiNl0JthnpVFJWIrVShL+j/n3jeUO3uP1VVKEdT349bWfclbUwTTE5KWLGVnw9bFAKEzWwUGeD9ul1xf3Srife5/39zy/lmGBf2MtYSrqYBpi8qLMzELMbSwHAs86Osqn9X0ud5io8Aw+CMvsl0lU13dwzpTSfGMaSxNe8tu3sOtubro9C+FOTyW5uJDk6GjYdSvC0oAuLkRYigXO4LeR1UXJ3E7HA/T0JOn19fZkY8ai6+v24yX3PD7+33R+LFxv7eTZonFfXubOlOVyYu48BGUsKNL+k8Uin0y4MacteI9OTiaR27pJJurBQb52vr9vfoO3N0m/fs3uMT1HOy2UMeXhQTpPFTBrmLOm69ihwQNGY0NUTGeb8fTpSfHGof39XMiYvZGG5taVUsp0j/UMrNGnT7mgLSyRTjEZG7v6cF9ecpPPh55SFxlBUJY0xbo0KdapraCXnp9LisllLG2APjEJBzFLbcPzcz4hYYxuMiEpnAXZh3Gf8Q+BEZXxmn9DHQ8FvENK46CXBq5N9YhJZbHkaOJ8kFyIzHlOT4jpWUIATCXiYoYPD/OZdAOTnO3/pJcyiw8QVI+YZ2f5y4fSl4hVcH9CaDwPUbEcoT2VsX+9lvTqyiuojhygpkJiTpnOD5254ET98kXSJhMcJkasJT0NYP5iMtkJNa30xtvbvJWPmVOEqNfX+aw11FfLuMvypYZ5i4lzPHTWyuIaEdsszPvi8TG3EIGRlWzMrfFgzVfMJmcJ4ArkEIkpBJU3cY0ssGyZc2GLT3e2YgYnd7FepLLGSDMJBR/r1VXYOFqTLzVPMTE1IYtyhOzinB8Sxk7GUNa4PuiZFcPL/MTEvHomAhmYr7kI6WCCRpkDTG62vNkwt/MTkxbpW6O5SpmTkI4GZd9s1PMSk1OyAuKRLD96y70ZgtBgPcuVyWUahBLic2XMwdMyd3ADBrxH2Q89HzFdLk0dmKiuaSVTIiTZuxShmY+YAf7MdAg/65BgbkPCYMXQMxsxvb0SEafk3YkFITnP+J/5pReLmYhZFLaOrFeOvUeyJ1LfxiQsVvQcICodf2nDNIrUBXcZ8KvMpC8iwu/3ua2OymJNx9jktilIad+my1zvqzHhGarbH1pYrjhiFqkObROnsqpBMHZ44XormxXu7REzc4P1MVY2SZR2Cc49jdu8Y20GxWoVyczykBgZcC6brgy9weckiN0reR7pJ00SpcsJzizmG6aJeAlYpkQRs3GqRh2Ys7KbyueDpReE+DNDQZT1ulk2QBksCaKu13EzA505ryHO02InF5fGhsQjZhpTSHcOe4yTnckO4F4Rtx+mg4gZO2pfHjN9+zFixSiL8wGi7v2kccQ8h2EIMdOY67vyLi8qwVcRsXomge6OG3kq4Z6xDuQfpGeS/hBDUOKPZXecr5e4pUFXWE41SQhrSFIs2TrjdmhvIV5TJFGKGVfAAv9/uHXmZqTdd59I5j04j4hy0uCKYSBxa8+AiRLPaJSRt42a9WZcu8KDYprcgLVdZwJPOqnaepe6MhaHKtXCM3hWx2GBXXHbms603Xk+x3okE+sjG0I2NrZ+h59xpExII45hamu8TNMW09czI7jPEp+zg0lHSOSCazwTFO+zQqixRrt9qqXbvVVDk4md99qyX7cHdlvM0AMxQgm5tsfd2yZmHW5zbSjljbhtn9nldXq78xzwCdXSN1tLjzHX3RbT14tcHDOUkNO8ekxrMTF9PaXJUTO+a0PMcAd2/ox2X9Qly9MNWVKwKdYjZtQITwU7L2bIqR5Z5KNuwY9vl2siPKsL9jen3WEUdbNMlxbjDrBwnidCXLjxQnpu7CB6BSYmuTsPD2HOdkxpSy9O1gh6zuk1Mwt4bvrcFs+9BzjH3cSU0raGPtaAfd57AxPTsRkYj0R2z4G235uYZYpjUqP0IrfPcsA/DGBiboKgHGbRZX+nOxBj4L/wYLPZKpwY7jStUOc4M2MmU6TPjLDvxcTcBmLc33//ozQ+p0BmUmMeqN8CM7M+iiQuL1wz8i40xFS01Xi3Qcy/dr0StICYv4nI1a5XhAYQ8x8R+UVE/hSRgPNKjEkiIv8C119Gh5AIbHsAAAAASUVORK5CYII=);
  background-size: cover;
}

.event-chart .eventText a .icon-left[data-v-5604a00e] {
  width: 35%;
  height: 100%;
  float: left;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: url(data:image/png;base64,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);
  background-size: cover;
  opacity: 0.6;
}

.event-chart .eventText a .icon-left img[data-v-5604a00e] {
  height: 38px;
  width: 42px;
}

.event-chart .eventText a h1[data-v-5604a00e] {
  font-size: 18px;
  color: #666;
}

.event-chart .eventText a h2[data-v-5604a00e] {
  font-size: 32px;
  margin-top: 6px;
  font-family: cfdinrg;
  color: #333;
}

.event-chart .eventText a p[data-v-5604a00e] {
  font-size: 16px;
  color: #fff;
  float: left;
  text-align: center;
  width: 100%;
  margin: 0 auto;
}

.event-chart .eventText a p span[data-v-5604a00e] {
  margin-right: 20px;
}

.event-chart .bar-chart[data-v-5604a00e] {
  width: 100%;
  height: 274px;
}

.event-chart .pie-chart[data-v-5604a00e] {
  width: 42%;
  height: 274px;
  float: left;
}

.event-chart .pie-text[data-v-5604a00e] {
  float: left;
  height: 274px;
  color: #333;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.event-chart .pie-text li[data-v-5604a00e] {
  font-size: 14px;
  height: 30px;
}

.event-chart .pie-text li em[data-v-5604a00e] {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.event-chart .pie-text li .pie-name[data-v-5604a00e] {
  border-right: 1px solid #8a8585;
  width: 70px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0 20px;
  display: inline-block;
  position: relative;
  top: 5px;
}

.event-chart .pie-text li .pie-rate[data-v-5604a00e] {
  color: #8a8585;
  width: 50px;
  display: inline-block;
}

.chart[data-v-59e0894c],
.top-component[data-v-3a10c694] {
  width: 100%;
  height: 274px;
}

.threat-analysis[data-v-581b0279] {
  position: relative;
}

.threat-analysis .goBack[data-v-581b0279] {
  position: absolute;
  right: 30px;
  font-size: 14px;
  top: 26px;
  cursor: pointer;
  color: #5099ca;
}

.threat-analysis .time[data-v-581b0279] {
  font-size: 15px;
  margin: 0;
  color: #008dff;
}

.threat-analysis .time i[data-v-581b0279] {
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABoklEQVQ4jZ3UzYuNYRgG8N85zMKChmIhH9mNhRIlWaCZ5CNSaGZSFiyUf8BSysbGUpZqokE2wsZXPkoidsJGvhdGCSvSjO66To7TIWfuzfO+z/1e1/Pc931db8OJKV1iECNZlyT9BrdwATc7ITM73gdwChsDvI6X6MNSbMFB3MYhPO9GtAGX8QV7cQ4z0I9P+aaBURzHQ+zAnUo0225yCS+wGuOomo/mZv35biq5lXgWzECLqE45jW/Yho9tt5yHWZjT0YLP2B5MYRtFNIS1OIyJbp3/S0wEU9ihIhrG6/Sk1zif0oebGfGN1N9rTGaygzW1xRnxv2IF5if/E0+zCnZfEX2PTrrFZPaudOSO4Uie+1o6+hCxdYuT+NomEyEfb3sv7LuyyBjWY9k0+tRMaXfr4WxYR6fR7JFgz9SNSpD3sQiretBSNf8x3mNdM+Xsx2xcxYL/IJmbAZTiDxRHq4nl4p3xzSPsjnU6o/Z24QmWB1Oe+8P95eI18c7FTPMaXiVfvdiMhXiAre2/kW4/tjp1E/bEhyXYH3iLezmk1PwbiF8jRl93fd/GngAAAABJRU5ErkJggg==);
  position: relative;
  top: 3px;
}
</style>