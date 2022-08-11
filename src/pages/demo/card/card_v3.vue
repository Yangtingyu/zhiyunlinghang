<template>
    <div class="home">
        <div class="container">
            <div id="main" class="main">
                <header class="wk">
                    <h1 class="fc">
                        <span @click="goCardEventPage" style="cursor: pointer;">物联网卡安全态势</span>
                    </h1>
                    <div class="date"><clock-component /></div>
                    <div v-has="'物联网安全态势感知平台'" @click="goSituation" class="home" style="cursor: pointer;" />
                </header>

                <main class="wlwgz">
                    <div class="leftbox">
                        <section style="margin-top: 0px;height: 249px;">
                            <h2 style="background: url(/image/cmiot-home/title6.png) 0 0 no-repeat; cursor: pointer;">
                                TOP5 行业应用
                            </h2>
                            <div style="width: 510px; height: 196px;">
                                <zebra-echart :option="histogramOption1" not-merge />
                            </div>
                        </section>
                        <section style="margin-top: 10px">
                            <h2 style="background: url(/image/cmiot-home/title6.png) 0 0 no-repeat; cursor: pointer;">
                                各类异常事件统计量（年度）
                            </h2>
                            <div style="width: 510px; height: 257px; padding-top: 6px; padding-left: 40px">
                                <el-row>
                                    <el-col :span="10">
                                        <div class="title" style="line-height: 46px; font-size: 25px">异常事件总数：</div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="number" style="line-height: 46px; font-size: 27px">{{ leftMiddle1 }}</div>
                                    </el-col>
                                </el-row>
                                <el-row style="margin-top: 2px;">
                                    <el-col :span="12">
                                        <div class="title">异常上网访问</div>
                                        <div class="number">{{ leftMiddle2 }}</div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="title">手机终端使用</div>
                                        <div class="number">{{ leftMiddle3 }}</div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <div class="title">异常语音</div>
                                        <div class="number">{{ leftMiddle4 }}</div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="title">机卡分离</div>
                                        <div class="number">{{ leftMiddle4 }}</div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <div class="title">敏感区域漫游</div>
                                        <div class="number">{{ leftMiddle4 }}</div>
                                    </el-col>
                                </el-row>
                            </div>
                        </section>
                        <section style="margin-top: 10px">
                            <h2
                                @click="goCard"
                                style="background: url(/image/cmiot-home/title6.png) 0 0 no-repeat; cursor: pointer;"
                            >
                                物联网卡异常事件
                            </h2>
                            <div style="width: 510px; height: 307px;">
                                <div style="height: 40px;">
                                    <ul class="ultab1" style="height: 40px;">
                                        <li style="color: #bdfaff; height: 40px; line-height: 40px;">
                                            <span style="width: 50px;">卡号</span>
                                            <span style="width: 50px;">归属地</span>
                                            <span style="width: 100px;">异常类型</span>
                                            <!-- <span style="width: 100px;">时间</span> -->
                                        </li>
                                    </ul>
                                </div>
                                <vue-seamless-scroll
                                    :data="cardEventArray"
                                    style="height: 257px;"
                                    class="seamless-warp"
                                >
                                    <ul class="item" >
                                        <li
                                            v-for="(cardEvent, index) in cardEventArray"
                                            :key="index"
                                        >
                                            <span style="width: 80px;">{{ cardEvent.product_no }}</span>
                                            <span style="width: 45px;">{{ cardEvent.homecode }}</span>
                                            <span
                                                :title="cardEvent.province"
                                                style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
                                            >
                                                {{ cardEvent.event_type }}
                                            </span>
                                            <!-- <span>{{ cardEvent.occur_time }}</span> -->
                                        </li>
                                    </ul>
                                </vue-seamless-scroll>
                            </div>
                        </section>
                    </div>

                    <div class="centerbox">
                        <section class="middle-top fc">
                            <div class="stats fr ac jw">
                                <span>发卡量</span>
                                <span>644,489,174</span>
                            </div>
                            <el-row style="height:183px;">
                                <el-col :span="12" style="height:183px;">
                                    <zebra-echart :option="middleTopOption1" not-merge />
                                </el-col>
                                <el-col :span="12" style="height:183px;">
                                    <zebra-echart :option="middleTopOption2" not-merge />
                                </el-col>
                            </el-row>
                        </section>

                        <!-- 地图 -->
                        <section class="ghmap zd_tab">
                            <div style="width: 820px; height: 586px;">
                                <zebra-echart
                                    ref="middleMap"
                                    @click="goMapPage"
                                    :is-map="true"
                                    :option="mapOption"
                                    height="580px"
                                    notMerge
                                />
                            </div>
                        </section>

                        <section>
                            <div type="flex" class="gz_tab">
                                <a @click="changeTab(0)" :class="{ active: tabValue == 0 }" href="javascript:;">
                                    业务分布
                                </a>
                                <a @click="changeTab(1)" :class="{ active: tabValue == 1 }" href="javascript:;">
                                    异常上网访问
                                </a>
                                <a @click="changeTab(5)" :class="{ active: tabValue == 5 }" href="javascript:;">
                                    手机终端使用
                                </a>
                                <a @click="changeTab(2)" :class="{ active: tabValue == 2 }" href="javascript:;">
                                    异常语音
                                </a>
                                <a @click="changeTab(3)" :class="{ active: tabValue == 3 }" href="javascript:;">
                                    机卡分离
                                </a>
                                <a @click="changeTab(4)" :class="{ active: tabValue == 4 }" href="javascript:;">
                                    敏感区域漫游
                                </a>
                            </div>
                        </section>
                    </div>

                    <div class="rightbox">
                        <section style="margin-top: 0px; height: 249px;">
                            <h2 style="background: url(/image/cmiot-home/title6.png) 0 0 no-repeat; cursor: pointer;">
                                开通功能分类
                            </h2>
                            <el-row style="width:510px;height:206px;">
                                <el-col :span="12" style="height:206px;">
                                    <zebra-echart :option="rightTopOption1" not-merge />
                                </el-col>
                                <el-col :span="12" style="height:206px;">
                                    <zebra-echart :option="rightTopOption2" not-merge />
                                </el-col>
                            </el-row>
                        </section>

                        <section style="margin-top: 10px">
                            <h2 style="background: url(/image/cmiot-home/title6.png) 0 0 no-repeat; cursor: pointer;">
                                TOP 敏感区域漫游
                            </h2>
                            <div style="width: 510px; height: 257px;">
                                <zebra-echart ref="rightMiddleChart" :option="histogramOption2" not-merge />
                            </div>
                        </section>

                        <section style="margin-top: 10px">
                            <h2
                                class="tab_title"
                            >
                                <a @click="changeTab2(1)" :class="{ active: tabTitle == 1 }">
                                    TOP 异常访问
                                </a>
                                <a @click="changeTab2(2)" :class="{ active: tabTitle == 2 }" style="margin-left: 20px;">
                                    异常访问趋势
                                </a>
                            </h2>
                            <div style="width: 510px; height: 307px;">
                                <zebra-echart :option="rightBottomOption" not-merge />
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
    import mockUtils from '@/libs/mockUtils.js'
    import moment from 'moment'
    // 大屏页通用mixin
    import mixinCmiotHome from '@/pages/mixin/mixin-cmiot-home'
    // 时钟组件
    import clockComponent from '@/pages/cmiot-home/components/clock-component'
    // 通用echart组件
    import zebraEchart from '@/pages/cmiot-home/components/zebra-echart'
    import echarts from 'echarts/lib/echarts'
    import $ from 'jquery'
    import EchartMapComponent from "@/pages/cmiot-home/components/echartMapComponent"
    import axios from 'axios'
    import dicCommConfigMixin from '@/pages/mixin/dic-comm-config-mixin'
    import chartUtil from '@/libs/chartUtil.js'
    import commonUtil from '@/libs/commonUtil.js'

    export default {
        name: 'cmiot-home-situation',
        mixins: [ mixinCmiotHome, dicCommConfigMixin ],
        components: { EchartMapComponent, clockComponent, zebraEchart },

        data() {
            let that = this

            let middleTabTabs = [
                { number: 0, name: '发卡数' },
                { number: 1, name: '异常上网访问' },
                { number: 5, name: '异常语音' },
                { number: 2, name: '机卡分离' },
                { number: 3, name: '敏感区域漫游' },
                { number: 4, name: '手机终端使用' }
            ]
            let eventTypeMap = new Map()
            let middleTabChainMap = new Map()
            for (let i = 0; i < middleTabTabs.length; i++) {
                let middleTabTab = middleTabTabs[i]
                let number = middleTabTab.number
                eventTypeMap.set(number, middleTabTab.name)
                let nextIndex = i + 1
                nextIndex = nextIndex >= middleTabTabs.length ? 0 : nextIndex
                middleTabChainMap.set(number, middleTabTabs[nextIndex].number)
            }

            return {
                middleTabChainMap,

                tabTitle: 1,

                tabValue: 0,

                mapLineCache: new Map(),

                mapMax: 1000,

                // 【TOP5访问趋势】柱状图X轴标签斜度
                barXAxisAxisLabelRotate: 0,

                // 异常事件总数
                leftMiddle1: '3,881,497',

                // 异常上网访问
                leftMiddle2: '1,788,396',

                // 手机终端使用
                leftMiddle3: '158,051',

                // 其他
                leftMiddle4: '172,976,762',

                // 漫游地映射关系
                roamAreaMap: new Map(),

                // 地图数据
                mapValueMap: null,

                // 【近一月异常趋势】数据
                anormalTrendType: 'abuse',

                otherSelect: [],

                abuseSelect: [],

                divertSelect: [],

                // 中间折线图
                lineXAxisData: [],

                lineSeriesData: [],

                // 右上角折线图
                lineXAxisData2: [],

                lineSeriesData2: [],

                cardEventArray: [
                    { product_no: '106****938159', homecode: '宁夏', event_type: '敏感区域漫游' },
                    { product_no: '172****9034', homecode: '福建', event_type: '异常语音' },
                    { product_no: '106****629578', homecode: '湖南', event_type: '敏感区域漫游' },
                    { product_no: '106****741669', homecode: '北京', event_type: '手机终端使用' },
                    { product_no: '172****8663', homecode: '重庆', event_type: '异常上网访问' },
                    { product_no: '106****193778', homecode: '湖北', event_type: '异常语音' },
                    { product_no: '172****7696', homecode: '湖北', event_type: '机卡分离' },
                    { product_no: '172****5004', homecode: '浙江', event_type: '敏感区域漫游' },
                    { product_no: '106****701424', homecode: '广东', event_type: '敏感区域漫游' },
                    { product_no: '106****478978', homecode: '云南', event_type: '异常语音' },
                    { product_no: '106****750245', homecode: '云南', event_type: '机卡分离' },
                    { product_no: '172****7975', homecode: '云南', event_type: '异常上网访问' },
                    { product_no: '172****5918', homecode: '河北', event_type: '手机终端使用' },
                    { product_no: '106****858405', homecode: '浙江', event_type: '异常语音' },
                    { product_no: '172****8733', homecode: '广东', event_type: '敏感区域漫游' },
                    { product_no: '106****829786', homecode: '福建', event_type: '手机终端使用' },
                    { product_no: '172****2846', homecode: '福建', event_type: '异常语音' },
                    { product_no: '172****5746', homecode: '北京', event_type: '机卡分离' },
                    { product_no: '106****485717', homecode: '河北', event_type: '异常上网访问' },
                    { product_no: '106****299148', homecode: '浙江', event_type: '异常上网访问' },
                    { product_no: '106****825001', homecode: '江西', event_type: '手机终端使用' },
                    { product_no: '106****930639', homecode: '湖北', event_type: '敏感区域漫游' },
                    { product_no: '172****3423', homecode: '广东', event_type: '敏感区域漫游' },
                    { product_no: '172****9698', homecode: '湖北', event_type: '异常语音' },
                    { product_no: '172****1755', homecode: '浙江', event_type: '异常语音' },
                    { product_no: '172****8845', homecode: '湖南', event_type: '异常上网访问' },
                    { product_no: '106****224036', homecode: '广东', event_type: '异常语音' },
                    { product_no: '106****551582', homecode: '江西', event_type: '敏感区域漫游' },
                    { product_no: '106****501171', homecode: '江西', event_type: '异常上网访问' },
                    { product_no: '106****595910', homecode: '湖北', event_type: '机卡分离' },
                    { product_no: '172****2528', homecode: '河北', event_type: '敏感区域漫游' },
                    { product_no: '172****7656', homecode: '湖南', event_type: '异常上网访问' },
                    { product_no: '106****665654', homecode: '广东', event_type: '异常上网访问' },
                    { product_no: '172****2568', homecode: '湖北', event_type: '异常上网访问' },
                    { product_no: '172****2496', homecode: '福建', event_type: '机卡分离' },
                    { product_no: '106****729811', homecode: '江西', event_type: '手机终端使用' },
                    { product_no: '172****3667', homecode: '河北', event_type: '异常上网访问' },
                    { product_no: '172****2953', homecode: '广东', event_type: '异常上网访问' },
                    { product_no: '172****5108', homecode: '福建', event_type: '敏感区域漫游' },
                    { product_no: '172****9801', homecode: '湖北', event_type: '敏感区域漫游' }
                ],

                provinceMap: that.getProvinceMap(),

                eventTypeMap
            }
        },

        computed: {
            rightTopOption1() {
                return chartUtil.getPieOption({
                    legend: { left: 'center', bottom: 10 },
                    color: [ '#03a9f4', '#fbc31a', '#ff430f' ],
                    series: [{
                        radius: [ '0%', '53%' ],
                        center: [ '50%', '42%' ],
                        data: [
                            { name: '定向语音', value: 8000000 },
                            { name: '非定向语音', value: 14000000 }
                        ]
                    }]
                })
            },

            rightTopOption2() {
                return chartUtil.getPieOption({
                    legend: { left: 'center', bottom: 10 },
                    color: [ '#03a9f4', '#fbc31a', '#ff430f' ],
                    series: [{
                        radius: [ '0%', '53%' ],
                        center: [ '50%', '42%' ],
                        data: [
                            { name: '定向流量', value: 100000000 },
                            { name: '非定向流量', value: 540000000 }
                        ]
                    }]
                })
            },

            mapOption() {
                let that = this
                return that.getMapOption(that.mapPointData, {
                    show: false,
                    min: that.mapMin,
                    max: that.mapMax
                })
            },

            middleTopOption1() {
                return chartUtil.getRingPieOption([
                    { name: '个人用户', value: 39912193, color: '#21adff' },
                    { name: '单位用户', value: 604576981, color: '#ffc019' }
                ])
            },

            middleTopOption2() {
                return chartUtil.getRingPieOption([
                    { name: '11位卡用户', value: 109563160, color: '#21adff' },
			        { name: '13位卡用户', value: 534926014, color: '#ffc019' }
                ])
            },

            rightBottomOption() {
                let that = this
                switch (that.tabTitle) {
                    case 1: // 【TOP 异常访问】
                        return chartUtil.getBarOption([
                            {
                                stack: '数量',
                                color: '#accd62',
                                seriesName: '手机终端访问',
                                seriesData: [
                                    { name: 'QQ', value: 118849 },
                                    { name: '微信', value: 107176 },
                                    { name: '支付宝', value: 68495 },
                                    { name: '淘宝', value: 52734 },
                                    { name: '腾讯视频', value: 16429 }
                                ]
                            }, {
                                stack: '数量',
                                color: '#00a1ee',
                                seriesName: '其它终端访问',
                                seriesData: [
                                    { name: 'QQ', value: 59425 },
                                    { name: '微信', value: 35726 },
                                    { name: '支付宝', value: 13699 },
                                    { name: '淘宝', value: 26368 },
                                    { name: '腾讯视频', value: 10953 }
                                ]
                            }
                        ], { height: '248px', top: '15%' })
                    case 2: // 【异常增长趋势】
                        return {
                            tooltip: { trigger: 'axis' },
                            backgroundColor: 'transparent',
                            grid: {
                                top: '25px',
                                bottom: '10px',
                                left: '20px',
                                right: '30px',
                                height: '270px',
                                containLabel: true
                            },
                            xAxis: {
                                show: true,
                                type: 'category',
                                boundaryGap: false,
                                data: ["21","22","23","02","03","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
                                splitLine: { show: false },
                                axisLine: { show: true, lineStyle: { color: '#4a9dd6' } },
                                axisTick: { show: false },
                                axisLabel: { textStyle: { color: '#abf0ff', fontSize: 12 } }
                            },
                            yAxis: {
                                show: true,
                                type: 'value',
                                splitLine: { show: false },
                                axisLine: { show: true, lineStyle: { color: '#4a9dd6' } },
                                axisTick: { show: false },
                                axisLabel: { textStyle: { color: '#abf0ff', fontSize: 12 } }
                            },
                            series: [{
                                name: '',
                                type: 'line',
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 8,
                                color: [ '#3adcff' ],
                                pointer: { show: true },
                                itemStyle: { normal: { lineStyle: { color: '#3adcff' } } },
                                data: [57530,58315,46849,35622,33879,36577,35893,35283,36634,39072,46911,126554,103903,74107,97829,28274,48364,32875,31354,32004,63840,36385,27940,77173]
                            }]
                        }
                }
            },

            // 【TOP5 行业应用】
            histogramOption1() {
                let that = this
                return that.getHistogramOption({
                    grid: { height: '170px' },
                    xAxis: { axisLabel: { rotate: 0 } },
                    histogramSeriesData: [
                        { name: '车联网', value: 92999788 },
                        { name: '云平台', value: 58841862 },
                        { name: '共享行业', value: 54974927 },
                        { name: '智能表计', value: 52525868 },
                        { name: '连接服务', value: 46532118 }
                    ]
                })
            },

            // 【TOP 敏感区域漫游】
            histogramOption2() {
                let that = this
                return that.getHistogramOption({
                    grid: { height: '212px' },
                    xAxis: { axisLabel: { rotate: 0 } },
                    histogramSeriesData: [
                        { name: '新疆', value: 10601449 },
                        { name: '云南', value: 10478081 },
                        { name: '福建龙岩', value: 10126557 },
                        { name: '湖北孝感', value: 8029201 },
                        { name: '四川德阳', value: 4481916 }
                    ]
                })
            },

            // 右上角【T】折线图
            option09() {
                let that = this

                return {
                    tooltip: { trigger: 'axis' },
                    backgroundColor: 'transparent',
                    grid: {
                        top: '25px',
                        bottom: '10px',
                        left: '30px',
                        right: '40px',
                        height: '220px',
                        containLabel: true
                    },
                    xAxis: {
                        show: true,
                        type: 'category',
                        boundaryGap: false,
                        data: that.lineXAxisData2,
                        splitLine: { show: false },
                        axisLine: { show: true, lineStyle: { color: '#4a9dd6' } },
                        axisTick: { show: false },
                        axisLabel: { textStyle: { color: '#abf0ff', fontSize: 12 } }
                    },
                    yAxis: {
                        show: true,
                        type: 'value',
                        splitLine: { show: false },
                        axisLine: { show: true, lineStyle: { color: '#4a9dd6' } },
                        axisTick: { show: false },
                        axisLabel: { textStyle: { color: '#abf0ff', fontSize: 12 } }
                    },
                    series: [{
                        name: '',
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 8,
                        color: [ '#3adcff' ],
                        pointer: { show: true },
                        itemStyle: { normal: { lineStyle: { color: '#3adcff' } } },
                        data: that.lineSeriesData2
                    }]
                }
            },

            // 中间的折线图
            option08() {
                let that = this

                return {
                    tooltip: { trigger: 'axis' },
                    backgroundColor: 'transparent',
                    grid: {
                        top: '25px',
                        bottom: '10px',
                        left: '30px',
                        right: '40px',
                        height: '255px',
                        containLabel: true
                    },
                    xAxis: {
                        show: true,
                        type: 'category',
                        boundaryGap: false,
                        data: that.lineXAxisData,
                        splitLine: { show: false },
                        axisLine: { show: true, lineStyle: { color: '#4a9dd6' } },
                        axisTick: { show: false },
                        axisLabel: { textStyle: { color: '#abf0ff', fontSize: 12 } }
                    },
                    yAxis: {
                        show: true,
                        type: 'value',
                        splitLine: { show: false },
                        axisLine: { show: true, lineStyle: { color: '#4a9dd6' } },
                        axisTick: { show: false },
                        axisLabel: { textStyle: { color: '#abf0ff', fontSize: 12 } }
                    },
                    series: [{
                        name: '',
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 8,
                        color: [ '#3adcff' ],
                        pointer: { show: true },
                        itemStyle: { normal: { lineStyle: { color: '#3adcff' } } },
                        data: that.lineSeriesData
                    }]
                }
            }
        },

        methods: {
            goToCardDetailPage(uri) {
                this.goToPage('http://icc.tsgz.cn/' + uri)
            },

            // 【物联网卡异常事件】跳转
            goCardEventPage(row) {
                this.goToCardDetailPage('mid_index#/securityIOT/overall?event_type=all')
            },

            // 中间的Tab
            changeTab(tabValue) {
                let that = this
                that.tabValue = tabValue
                let mapLineCache = that.mapLineCache
                if (mapLineCache.has(tabValue)) {
                    let info = mapLineCache.get(tabValue)
                    if (info.map) {
                        that.mapValueMap = info.map.mapValueMap
                        that.mapPointData = info.map.mapPointData
                        that.mapMin = info.map.mapMin
                        that.mapMax = info.map.mapMax
                    }
                    if (info.line) {
                        that.lineXAxisData = info.line.lineXAxisData
                        that.lineSeriesData = info.line.lineSeriesData
                    }
                }
                // that.getMapData(tabValue)
                // that.getLineData(tabValue)
            },

            // 右下角的Tab
            changeTab2(tabValue) {
                let that = this
                that.tabTitle = tabValue
            },

            // 获取Map数据，需要解决异步问题：用户多次点击tab切换，异步数据返回时要判断当前的tab位置，that.tabValue == tabValue
            getMapData(tabValue) {
                let that = this
                let module = 'abnomal_application_map_day'
                let matchCondition = {
                    province: '!=全国'
                }
                let selectField = 'province, SUM(shopping_count) shopping_count, SUM(video_count) video_count, SUM(social_count) social_count, SUM(financial_count) financial_count'
                if (tabValue > 1) {
                    module = 'abnormal_event_number_statistics_day'
                    matchCondition = {
                        event_type: tabValue,
                        province: '!=全国'
                    }
                    selectField = 'province, SUM(number) number'
                }

                that.$faxios.post(that.commonGroupUrl, {
                    module, selectField,
                    groupCriteria: 'province',
                    intervalCondition: {
                        day: [ moment().subtract(7, 'days').format('YYYYMMDD'), moment().format('YYYYMMDD') ]
                    },
                    matchCondition
                }).then(res => {
                    if (res.code == 200) {
                        let resultData = res.body.resultData
                        if (resultData && resultData.length > 0) {
                            let mapValueMap = new Map()
                            let mapPointData = []
                            let mapMin = 1000
                            let mapMax = 0
                            for (let i = 0; i < resultData.length; i++) {
                                let row = resultData[i]
                                let province = row.province // 省份
                                if (!mapValueMap.has(province)) { // 防止数据中有重复的省份
                                    let name = tabValue > 1 ? that.provinceMap.get(province) : province
                                    let mapValue = tabValue > 1 ? that.fixNumber(row.number)
                                        : (row.shopping_count + row.video_count + row.social_count + row.financial_count)
                                    if (mapValue > mapMax) {
                                        mapMax = mapValue
                                    } else if (mapValue < mapMin) {
                                        mapMin = mapValue
                                    }
                                    mapValueMap.set(name, row)
                                    mapPointData.push({ name, value: mapValue })
                                }
                            }
                            let secondMax = 0
                            for (let i = 0; i < mapPointData.length; i++) {
                                let value = mapPointData[i].value
                                if (value > secondMax && value != mapMax) {
                                    secondMax = value
                                }
                            }
                            if (that.tabValue == tabValue) {
                                let value
                                if (that.mapLineCache.has(tabValue)) {
                                    value = that.mapLineCache.get(tabValue)
                                    value.map = { mapValueMap, mapPointData, mapMin, mapMax: secondMax }
                                } else {
                                    value = { map: { mapValueMap, mapPointData, mapMin, mapMax: secondMax } }
                                }
                                that.mapLineCache.set(tabValue, value)
                                that.mapValueMap = mapValueMap
                                that.mapPointData = mapPointData
                                that.mapMin = mapMin
                                that.mapMax = secondMax
                            }
                        }
                    } else {
                        console.log('getMapData() >>> res', res)
                    }
                })
            },

            // 获取折线图数据，需要解决异步问题：用户多次点击tab切换，异步数据返回时要判断当前的tab位置
            getLineData(tabValue) {
                let that = this
                that.$faxios.post(that.commonListUrl, {
                    module: 'abnormal_event_number_statistics_day',
                    sortCriteria: { day: 'desc' },
                    matchCondition: {
                        event_type: tabValue,
                        province: '全国'
                    },
                    maxResult: 10
                }).then(res => {
                    if (res.code == 200) {
                        let dataMap = new Map()
                        let resultData = res.body.resultData
                        if (resultData && resultData.length > 0) {
                            for (let i = 0; i < resultData.length; i++) {
                                let row = resultData[i]
                                dataMap.set(row.day + '', row.number)
                            }
                            let lineXAxisData = []
                            let lineSeriesData = []
                            let length = 7
                            let maxGap = 3650
                            let gap = moment().diff(moment(resultData[0].day, 'YYYYMMDD'), 'day')
                            let range = gap > maxGap ? maxGap : gap
                            for (let i = 0; i < length; i++) {
                                let dateTime = moment().subtract(length - i - 1 + range, 'days')
                                let dateKey = dateTime.format('YYYYMMDD')
                                lineXAxisData.push(dateTime.format('YYYY-MM-DD'))
                                if (dataMap.has(dateKey)) {
                                    lineSeriesData.push(dataMap.get(dateKey))
                                } else {
                                    lineSeriesData.push(0)
                                }
                            }
                            if (that.tabValue == tabValue) {
                                let value
                                if (that.mapLineCache.has(tabValue)) {
                                    value = that.mapLineCache.get(tabValue)
                                    value.line = { lineXAxisData, lineSeriesData }
                                } else {
                                    value = { line: { lineXAxisData, lineSeriesData } }
                                }
                                that.mapLineCache.set(tabValue, value)
                                that.lineXAxisData = lineXAxisData
                                that.lineSeriesData = lineSeriesData
                            }
                        }
                    } else {
                        console.log('getLineData() >>> res', res)
                    }
                })
            },

            // 获取右上角折线图数据
            getLineData2() {
                let that = this
                that.$faxios.post(that.commonGroupUrl, {
                    module: 'top5_abnormal_application_day',
                    groupCriteria: 'event_time',
                    sortCriteria: { event_time: 'desc' },
                    selectField: 'event_time, SUM(number) number',
                    maxResult: 24
                }).then(res => {
                    if (res.code == 200) {
                        let dataMap = new Map()
                        let resultData = res.body.resultData
                        let lineXAxisData2 = []
                        let lineSeriesData2 = []
                        if (resultData && resultData.length > 0) {
                            let dataLength = resultData.length
                            for (let i = 0; i < dataLength; i++) {
                                let row = resultData[dataLength - i - 1]
                                let hour = row.event_time ? moment(row.event_time).format('HH') : null
                                if (hour) {
                                    lineXAxisData2.push(hour)
                                    lineSeriesData2.push(row.number)
                                }
                            }
                        }
                        that.lineXAxisData2 = lineXAxisData2
                        that.lineSeriesData2 = lineSeriesData2
                    } else {
                        console.log('getLineData() >>> res', res)
                    }
                })
            },

            // 地图鼠标显示内容
            mapTooltipFormatter(params) {
                let that = this
                let mapValueMap = that.mapValueMap
                let province = params.name
                if (!mapValueMap) {
                    return province
                }

                let tabValue = that.tabValue
                if (tabValue == 1) {
                    let shopping_count = 0 // 购物类
                    let video_count = 0 // 视频类
                    let social_count = 0 // 社交类
                    let financial_count = 0 // 金融类
                    if (mapValueMap.has(province)) {
                        let row = mapValueMap.get(province)
                        shopping_count = row.shopping_count
                        video_count = row.video_count
                        social_count = row.social_count
                        financial_count = row.financial_count
                    }
                    return province + '<br/>总计: ' + (shopping_count + video_count + social_count
                        + financial_count) + '<br/>购物类: ' + shopping_count + '<br/>视频类: ' + video_count
                        + '<br/>社交类: ' + social_count + '<br/>金融类: ' + financial_count
                } else if (tabValue == 0) {
                    let card = 0 // 卡量
                    let activate = 0 // 激活量
                    let day_active = 0 // 日活跃量
                    if (mapValueMap.has(province)) {
                        let row = mapValueMap.get(province)
                        card = row.card
                        activate = row.activate
                        day_active = row.day_active
                    }
                    return province + '<br/>卡量: ' + card + '<br/>激活量: ' + activate + '<br/>日活跃量: ' + day_active
                }

                return province + '<br/>' + that.eventTypeMap.get(tabValue) + ': '
                    + (mapValueMap.has(province) ? that.fixNumber((mapValueMap.get(province)).number) : 0)
            },

            fixNumber(number) {
                return number ? number : 0
            },

            // 初始化【TOP异常访问应用】条形图
            initAbnormalApplication() {
                let that = this
                that.$faxios.post(that.commonListUrl, {
                    module: 'top5_abnormal_application_day',
                    sortCriteria: { day: 'desc' },
                    maxResult: 1
                }).then(res => {
                    if (res.code == 200) {
                        let resultData = res.body.resultData
                        if (resultData && resultData.length > 0) {
                            let latestDay = moment(resultData[0].day, 'YYYYMMDD')
                            that.$faxios.post(that.commonGroupUrl, {
                                module: 'top5_abnormal_application_day',
                                selectField: 'app_name, SUM(number) AS number',
                                groupCriteria: 'app_name',
                                intervalCondition: {
                                    day: [ latestDay.subtract(7, 'days').format('YYYYMMDD'), resultData[0].day ]
                                },
                                sortCriteria: { number: 'desc' },
                                maxResult: 5
                            }).then(res2 => {
                                if (res2.code == 200) {
                                    let resultData2 = res2.body.resultData
                                    if (resultData2 && resultData2.length > 0) {
                                        let barSeriesData = []
                                        for (let i = 0; i < resultData2.length; i++) {
                                            let row = resultData2[i]
                                            barSeriesData.push({
                                                name: row.app_name,
                                                value: row.number
                                            })
                                        }
                                        that.barSeriesData = barSeriesData
                                    }
                                } else {
                                    console.log('res2', res2)
                                }
                                echarts.init(document.getElementById('g_echarts01')).setOption(Object.assign({},
                                    chartUtil.getBarOption([{ seriesName: that.barSeriesName, seriesData: that.barSeriesData }])),
                                    true)
                            })
                        } else {
                            console.log('initAbnormalApplication() >>> res', res)
                        }
                    } else {
                        console.log('initAbnormalApplication() >>> res', res)
                    }
                })
            },

            // 初始化【TOP敏感地区漫游】柱状图
            initsensitiveRoamingArea() {
                let that = this
                that.$faxios.post(that.commonListUrl, {
                    module: 'abnormal_event_number_statistics_year',
                    sortCriteria: { year: 'desc' },
                    matchCondition: { province: '!=全国', event_type: 4 },
                    maxResult: 1
                }).then(res => {
                    if (res.code == 200) {
                        let resultData = res.body.resultData
                        if (resultData && resultData.length > 0) {
                            that.$faxios.post(that.commonListUrl, {
                                module: 'abnormal_event_number_statistics_year',
                                sortCriteria: { number: 'desc' },
                                matchCondition: {
                                    province: '!=全国',
                                    event_type: 4,
                                    year: resultData[0].year
                                },
                                maxResult: 5
                            }).then(res2 => {
                                if (res2.code == 200) {
                                    let resultData2 = res2.body.resultData
                                    if (resultData2 && resultData2.length > 0) {
                                        let histogramSeriesData = []
                                        for (let i = 0; i < resultData2.length; i++) {
                                            let row = resultData2[i]
                                            histogramSeriesData.push({
                                                name: that.provinceMap.get(row.province),
                                                value: row.number
                                            })
                                        }
                                        that.histogramSeriesData = histogramSeriesData
                                    }
                                } else {
                                    console.log('res2', res2)
                                }
                                echarts.init(document.getElementById('g_echarts11'))
                                    .setOption(Object.assign({}, that.histogramOption), true)
                            })
                        } else {
                            console.log('initsensitiveRoamingArea() >>> res', res)
                        }
                    } else {
                        console.log('initsensitiveRoamingArea() >>> res', res)
                    }
                })
            },

            // 地图URL
            goMapPage() {},

            // 物联网卡异常事件，暂时弃用，根据客户需求暂时使用initWLWKErrorEvent
            initWLWKErrorEvent2() {
                let that = this
                that.$faxios.post(that.commonListUrl, {
                    module: 'abnomal_event_summary',
                    sortCriteria: { occur_time: 'desc' },
                    maxResult: 1
                }).then(res => {
                    if (res.code == 200) {
                        let resultData = res.body.resultData
                        // 上边先得到最新的occur_time，后边的查询都限制为这个occur_time的记录
                        // 先group查出有哪些事件类型
                        // 然后分别查出20条各个事件类型的事件记录
                        // 然后再把不同类型的事件混合成20条记录用于展示
                        // 这里搞这么麻烦，是因为：
                        //      1.客户数据的事件时间没有精确到秒
                        //      2.客户要求不同类型的事件要交替出现
                        //      3.数据量大，一次查出在前端拼装js会崩
                        if (resultData && resultData.length > 0) {
                            let occurTime = resultData[0].occur_time
                            that.$faxios.post(that.commonGroupUrl, {
                                module: 'abnomal_event_summary',
                                groupCriteria: 'event_type',
                                matchCondition: { occur_time: occurTime }
                            }).then(res2 => {
                                if (res2.code == 200) {
                                    resultData = res2.body.resultData
                                    if (resultData && resultData.length > 0) {
                                        axios.all(that.getPost(resultData, occurTime)).then(axios.spread(function() {
                                            if (arguments && arguments.length > 0) {
                                                let eventTypeMap = new Map()
                                                let eventTypes = []
                                                let resultDataLength = 0

                                                for (let i = 0; i < arguments.length; i++) {
                                                    let tempRes = arguments[i]
                                                    if (tempRes.code == 200) {
                                                        resultData = tempRes.body.resultData
                                                        if (resultData && resultData.length > 0) {
                                                            resultDataLength += resultData.length
                                                            for (let j = 0; j < resultData.length; j++) {
                                                                let row = resultData[j]
                                                                let eventType = row.event_type
                                                                let eventData = {
                                                                    product_no: row.product_no,
                                                                    homecode: row.homecode,
                                                                    event_type: eventType,
                                                                    occur_time: moment(row.occur_time, 'YYYYMMDD').format('YYYY-MM-DD')
                                                                }
                                                                if (eventTypeMap.has(eventType)) {
                                                                    eventTypeMap.get(eventType).push(eventData)
                                                                } else {
                                                                    let eventDatas = []
                                                                    eventDatas.push(eventData)
                                                                    eventTypeMap.set(eventType, eventDatas)
                                                                    eventTypes.push(eventType)
                                                                }
                                                            }
                                                        }
                                                    }
                                                }

                                                let cardEventArray = []
                                                for (let i = 0; i < (resultDataLength < 20 ? resultDataLength : 20); i++) {
                                                    let eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
                                                    let eventDatas = eventTypeMap.get(eventType)
                                                    if (eventDatas && eventDatas.length > 0) {
                                                        let e = eventDatas.pop()
                                                        cardEventArray.push(e)
                                                        eventTypeMap.set(eventType, eventDatas)
                                                    } else {
                                                        i--
                                                    }
                                                }
                                                that.cardEventArray = cardEventArray
                                            }
                                        }))
                                    }
                                }
                            })
                        } else {
                            console.log('initWLWKErrorEvent() >>> res', res)
                        }
                    } else {
                        console.log('initWLWKErrorEvent() >>> res', res)
                    }
                })
            },

            // 物联网卡异常事件
            initWLWKErrorEvent() {
                let that = this
                let result = []
                result.push(that.$faxios.post(that.commonListUrl, {
                    module: 'abnomal_event_summary',
                    sortCriteria: { occur_time: 'desc' },
                    matchCondition: { event_type: '机卡分离' },
                    maxResult: 20
                }))
                result.push(that.$faxios.post(that.commonListUrl, {
                    module: 'abnomal_event_summary',
                    sortCriteria: { occur_time: 'desc' },
                    matchCondition: { event_type: '异常语音' },
                    maxResult: 20
                }))
                result.push(that.$faxios.post(that.commonListUrl, {
                    module: 'abnomal_event_summary',
                    sortCriteria: { occur_time: 'desc' },
                    matchCondition: { event_type: '敏感区域漫游' },
                    maxResult: 20
                }))
                // 上边先得到最新的occur_time，后边的查询都限制为这个occur_time的记录
                // 先group查出有哪些事件类型
                // 然后分别查出20条各个事件类型的事件记录
                // 然后再把不同类型的事件混合成20条记录用于展示
                // 这里搞这么麻烦，是因为：
                //      1.客户数据的事件时间没有精确到秒
                //      2.客户要求不同类型的事件要交替出现
                //      3.数据量大，一次查出在前端拼装js会崩
                axios.all(result).then(axios.spread(function() {
                    if (arguments && arguments.length > 0) {
                        let eventTypeMap = new Map()
                        let eventTypes = []
                        let resultDataLength = 0

                        for (let i = 0; i < arguments.length; i++) {
                            let tempRes = arguments[i]
                            if (tempRes.code == 200) {
                                let resultData = tempRes.body.resultData
                                if (resultData && resultData.length > 0) {
                                    resultDataLength += resultData.length
                                    for (let j = 0; j < resultData.length; j++) {
                                        let row = resultData[j]
                                        let eventType = row.event_type
                                        let eventData = {
                                            product_no: row.product_no,
                                            homecode: row.homecode,
                                            event_type: eventType,
                                            occur_time: moment(row.occur_time, 'YYYYMMDD').format('YYYY-MM-DD')
                                        }
                                        if (eventTypeMap.has(eventType)) {
                                            eventTypeMap.get(eventType).push(eventData)
                                        } else {
                                            let eventDatas = []
                                            eventDatas.push(eventData)
                                            eventTypeMap.set(eventType, eventDatas)
                                            eventTypes.push(eventType)
                                        }
                                    }
                                }
                            }
                        }

                        let cardEventArray = []
                        for (let i = 0; i < (resultDataLength < 20 ? resultDataLength : 20); i++) {
                            let eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
                            let eventDatas = eventTypeMap.get(eventType)
                            if (eventDatas && eventDatas.length > 0) {
                                let e = eventDatas.pop()
                                cardEventArray.push(e)
                                eventTypeMap.set(eventType, eventDatas)
                            } else {
                                i--
                            }
                        }
                        that.cardEventArray = cardEventArray
                    }
                }))
            },

            getPost(resultData, occurTime) {
                let that = this
                let result = []
                for (let i = 0; i < resultData.length; i++) {
                    result.push(that.$faxios.post(that.commonListUrl, {
                        module: 'abnomal_event_summary',
                        matchCondition: { occur_time: occurTime, event_type: resultData[i].event_type },
                        maxResult: 20
                    }))
                }
                return result
            },

            // 获取【异常事件累计总量（年度）】
            getAbnormalEventNumberStatisticsYear() {
                // TODO
            },

            // 初始化
            init() {
                let that = this

                // 初始化【TOP敏感地区漫游】柱状图
                // that.initsensitiveRoamingArea()

                // 初始化【TOP异常访问应用】条形图
                that.initAbnormalApplication()

                // 获取【异常事件累计总量（年度）】
                // that.getAbnormalEventNumberStatisticsYear()

                // 根据tab初始化地图和折线图的数据
                that.changeTab(that.tabValue)

                // 获取右上角折线图数据
                that.getLineData2()

                // that.initWLWKErrorEvent()
            },

            getProvinceMap() {
                let provinceMap = new Map()
                provinceMap.set('991', '新疆')
                provinceMap.set('001', '政企公司')
                provinceMap.set('311', '河北')
                provinceMap.set('471', '内蒙古')
                provinceMap.set('280', '四川')
                provinceMap.set('971', '青海')
                provinceMap.set('210', '上海')
                provinceMap.set('290', '陕西')
                provinceMap.set('731', '湖南')
                provinceMap.set('250', '江苏')
                provinceMap.set('371', '河南')
                provinceMap.set('931', '甘肃')
                provinceMap.set('591', '福建')
                provinceMap.set('100', '北京')
                provinceMap.set('002', '物联网公司')
                provinceMap.set('240', '辽宁')
                provinceMap.set('431', '吉林')
                provinceMap.set('351', '山西')
                provinceMap.set('551', '安徽')
                provinceMap.set('771', '广西')
                provinceMap.set('230', '重庆')
                provinceMap.set('270', '湖北')
                provinceMap.set('898', '海南')
                provinceMap.set('451', '黑龙江')
                provinceMap.set('200', '广东')
                provinceMap.set('871', '云南')
                provinceMap.set('951', '宁夏')
                provinceMap.set('220', '天津')
                provinceMap.set('571', '浙江')
                provinceMap.set('000', '全网')
                provinceMap.set('791', '江西')
                provinceMap.set('851', '贵州')
                provinceMap.set('531', '山东')
                provinceMap.set('891', '西藏')
                return provinceMap
            },

            getNewMap(map) {
                let old = map.mapValueMap
                let mapValueMap = new Map()
                for (let i = 0; i < old.length; i++) {
                    let row = old[i]
                    mapValueMap.set(row[0], row[1])
                }
                map.mapValueMap = mapValueMap
                return map
            },

            getNewMap2(resultData) {
                let that = this
                let mapValueMap = new Map()
                let mapPointData = []
                let mapMin = 1000
                let mapMax = 0
                for (let i = 0; i < resultData.length; i++) {
                    let row = resultData[i]
                    let province = row.province // 省份
                    if (!mapValueMap.has(province)) {
                        let name = that.provinceMap.get(province)
                        let mapValue = that.fixNumber(row.number)
                        if (mapValue > mapMax) {
                            mapMax = mapValue
                        } else if (mapValue < mapMin) {
                            mapMin = mapValue
                        }
                        mapValueMap.set(name, row)
                        mapPointData.push({ name, value: mapValue })
                    }
                }
                let secondMax = 0
                for (let i = 0; i < mapPointData.length; i++) {
                    let value = mapPointData[i].value
                    if (value > secondMax && value != mapMax) {
                        secondMax = value
                    }
                }
                return { mapValueMap, mapPointData, mapMin, mapMax: secondMax }
            },

            getNewMap3(resultData) {
                let that = this
                let mapValueMap = new Map()
                let mapPointData = []
                let mapMin = 1000
                let mapMax = 0
                for (let i = 0; i < resultData.length; i++) {
                    let row = resultData[i]
                    let name = row.name
                    let mapValue = that.fixNumber(row.card)
                    if (mapValue > mapMax) {
                        mapMax = mapValue
                    } else if (mapValue < mapMin) {
                        mapMin = mapValue
                    }
                    mapValueMap.set(name, row)
                    mapPointData.push({ name, value: mapValue })
                }
                let secondMax = 0
                for (let i = 0; i < mapPointData.length; i++) {
                    let value = mapPointData[i].value
                    if (value > secondMax && value != mapMax) {
                        secondMax = value
                    }
                }
                return { mapValueMap, mapPointData, mapMin, mapMax: secondMax }
            }
        },

        mounted() {
            let that = this

            // 中间地图下方Tab切换
            let timer1 = window.setInterval(function() {
                that.changeTab(that.middleTabChainMap.get(that.tabValue))
            }, 5000)
            // 右下方Tab切换
            let timer2 = window.setInterval(function() {
                that.changeTab2(that.tabTitle == 1 ? 2 : 1)
            }, 5000)
            // 页面销毁时停止定时器任务，销毁方法紧跟定时器定义方法，方便维护
            that.$once('hook:beforeDestroy', () => {
                if (timer1) {
                    clearInterval(timer1)
                }
                if (timer2) {
                    clearInterval(timer2)
                }
            })

            that.init()

            // 设置漫游地映射关系，后面需要通过绿盟接口数据来获取
            that.roamAreaMap.set('浙江', [ '江苏', '四川', '陕西' ])
            that.roamAreaMap.set('北京', [ '河北', '内蒙古', '青海' ])
            that.roamAreaMap.set('江苏', [ '重庆', '云南', '广西' ])
            that.roamAreaMap.set('广东', [ '新疆', '黑龙江' ])
            that.roamAreaMap.set('河南', [ '广东', '台湾' ])
            that.roamAreaMap.set('新疆', [ '江苏', '四川', '陕西' ])
            that.roamAreaMap.set('云南', [ '河北', '内蒙古', '青海' ])
            that.roamAreaMap.set('福建龙岩', [ '重庆', '云南', '广西' ])
            that.roamAreaMap.set('湖北孝感', [ '新疆', '黑龙江' ])
            that.roamAreaMap.set('四川德阳', [ '广东', '台湾' ])

            that.$nextTick(function () {
                that.init()
                that.$refs.rightMiddleChart.echartInstance.on('mouseover', (params) => {
                    that.$refs.middleMap.echartInstance.dispatchAction({
                        type: 'highlight',
                        name: that.roamAreaMap.get(params.name.replace('省', '').replace('市', ''))
                    })
                })
                that.$refs.rightMiddleChart.echartInstance.on('mouseout', (params) => {
                    that.$refs.middleMap.echartInstance.dispatchAction({
                        type: 'downplay'
                    })
                })
            })

            // 临时写死的地图数据
            // 业务分布
            let temp = [{province:'571',number:76390231},{province:'100',number:78375918},{province:'250',number:89813729},{province:'200',number:124891043},{province:'371',number:46684913},{province:'311',number:11899183},{province:'351',number:7226538},{province:'531',number:36967932},{province:'591',number:13811137},{province:'290',number:22677427},{province:'551',number:13481829},{province:'471',number:4958617},{province:'771',number:8228492},{province:'240',number:6405382},{province:'230',number:6431328},{province:'731',number:3767582},{province:'451',number:3003392},{province:'851',number:2649982},{province:'280',number:10813961},{province:'791',number:7226513},{province:'270',number:1778309},{province:'210',number:53964937},{province:'871',number:2842348},{province:'991',number:1740921},{province:'220',number:2730381},{province:'951',number:395674},{province:'431',number:3725937},{province:'971',number:263506},{province:'931',number:823427},{province:'898',number:431182},{province:'891',number:87423}]
            temp = [{name:"上海",card:49858101,activate:38915849,day_active:10004206},{name:"云南",card:2723794,activate:2547078,day_active:1116602},{name:"北京",card:72582468,activate:46233942,day_active:19729723},{name:"吉林",card:4047959,activate:2567125,day_active:1033674},{name:"四川",card:21739973,activate:11966616,day_active:4643166},{name:"天津",card:2917307,activate:2150815,day_active:1438115},{name:"安徽",card:14378360,activate:8862094,day_active:2954330},{name:"山东",card:35796155,activate:18582151,day_active:9074109},{name:"山西",card:12706027,activate:8894571,day_active:2918133},{name:"广东",card:128206354,activate:66089006,day_active:17460789},{name:"广西",card:10046076,activate:2446405,day_active:908791},{name:"新疆",card:1833925,activate:1447729,day_active:776160},{name:"江苏",card:80820678,activate:59733288,day_active:25479334},{name:"江西",card:6907621,activate:4174176,day_active:902079},{name:"河北",card:11857141,activate:10027436,day_active:3988694},{name:"河南",card:42071569,activate:31966973,day_active:12104226},{name:"浙江",card:70506773,activate:50131408,day_active:11115444},{name:"湖北",card:1930570,activate:1160487,day_active:681856},{name:"湖南",card:3990277,activate:2654435,day_active:1272661},{name:"福建",card:13868396,activate:9941423,day_active:1142210},{name:"贵州",card:2408079,activate:1972754,day_active:1012135},{name:"辽宁",card:6620385,activate:3777677,day_active:1778625},{name:"重庆",card:6782335,activate:3940095,day_active:1205848},{name:"陕西",card:24065820,activate:13339831,day_active:3211780},{name:"黑龙江",card:2859141,activate:2384117,day_active:278390},{name:"内蒙古",card:4974070,activate:4389772,day_active:924357},{name:"青海",card:240515,activate:205283,day_active:102290},{name:"西藏",card:98575,activate:75941,day_active:30290},{name:"甘肃",card:839922,activate:697616,day_active:469116},{name:"海南",card:434518,activate:394713,day_active:141128},{name:"宁夏",card:418131,activate:347484,day_active:208109}]
            that.mapLineCache.set(0, {
                map: that.getNewMap3(temp)
            })

            // 异常上网访问
            that.mapLineCache.set(1, {
                map: that.getNewMap({"mapValueMap":[["上海",{"shopping_count":21121,"province":"上海","video_count":4042,"social_count":66026,"count":4,"financial_count":11368}],["云南",{"shopping_count":312,"province":"云南","video_count":27,"social_count":1810,"count":4,"financial_count":167}],["内蒙古",{"shopping_count":4475,"province":"内蒙古","video_count":1621,"social_count":19993,"count":4,"financial_count":3341}],["北京",{"shopping_count":3707,"province":"北京","video_count":589,"social_count":64067,"count":4,"financial_count":1446}],["吉林",{"shopping_count":779,"province":"吉林","video_count":104,"social_count":3779,"count":4,"financial_count":404}],["四川",{"shopping_count":69666,"province":"四川","video_count":22405,"social_count":291389,"count":4,"financial_count":54999}],["天津",{"shopping_count":3775,"province":"天津","video_count":1157,"social_count":12995,"count":4,"financial_count":3258}],["宁夏",{"shopping_count":25,"province":"宁夏","video_count":1,"social_count":425,"count":4,"financial_count":12}],["安徽",{"shopping_count":7630,"province":"安徽","video_count":954,"social_count":41785,"count":4,"financial_count":3336}],["山东",{"shopping_count":14106,"province":"山东","video_count":4773,"social_count":53472,"count":4,"financial_count":10153}],["山西",{"shopping_count":19519,"province":"山西","video_count":4532,"social_count":72932,"count":4,"financial_count":22121}],["广东",{"shopping_count":21594,"province":"广东","video_count":8133,"social_count":288725,"count":4,"financial_count":15214}],["广西",{"shopping_count":148,"province":"广西","video_count":38,"social_count":2159,"count":4,"financial_count":79}],["新疆",{"shopping_count":208,"province":"新疆","video_count":152,"social_count":553,"count":4,"financial_count":27}],["江苏",{"shopping_count":63842,"province":"江苏","video_count":18837,"social_count":280841,"count":4,"financial_count":102949}],["江西",{"shopping_count":226,"province":"江西","video_count":55,"social_count":5000,"count":4,"financial_count":116}],["河北",{"shopping_count":17009,"province":"河北","video_count":4955,"social_count":47049,"count":4,"financial_count":8673}],["河南",{"shopping_count":3817,"province":"河南","video_count":201,"social_count":13552,"count":4,"financial_count":2346}],["浙江",{"shopping_count":2479,"province":"浙江","video_count":383,"social_count":13803,"count":4,"financial_count":1434}],["海南",{"shopping_count":351,"province":"海南","video_count":95,"social_count":2605,"count":4,"financial_count":224}],["湖北",{"shopping_count":260,"province":"湖北","video_count":31,"social_count":2414,"count":4,"financial_count":109}],["湖南",{"shopping_count":23428,"province":"湖南","video_count":5987,"social_count":99410,"count":4,"financial_count":18991}],["物联网公司",{"shopping_count":0,"province":"物联网公司","video_count":0,"social_count":1,"count":1,"financial_count":0}],["甘肃",{"shopping_count":100,"province":"甘肃","video_count":21,"social_count":954,"count":4,"financial_count":75}],["福建",{"shopping_count":623,"province":"福建","video_count":175,"social_count":4656,"count":4,"financial_count":407}],["西藏",{"shopping_count":12,"province":"西藏","video_count":1,"social_count":62,"count":4,"financial_count":5}],["贵州",{"shopping_count":23654,"province":"贵州","video_count":6918,"social_count":95560,"count":4,"financial_count":19854}],["辽宁",{"shopping_count":499,"province":"辽宁","video_count":39,"social_count":3710,"count":4,"financial_count":191}],["重庆",{"shopping_count":1233,"province":"重庆","video_count":193,"social_count":13803,"count":4,"financial_count":779}],["陕西",{"shopping_count":1633,"province":"陕西","video_count":236,"social_count":8072,"count":4,"financial_count":793}],["青海",{"shopping_count":949,"province":"青海","video_count":255,"social_count":4547,"count":4,"financial_count":710}],["黑龙江",{"shopping_count":190,"province":"黑龙江","video_count":45,"social_count":1474,"count":4,"financial_count":108}]],"mapPointData":[{"name":"上海","value":102557},{"name":"云南","value":2316},{"name":"内蒙古","value":29430},{"name":"北京","value":69809},{"name":"吉林","value":5066},{"name":"四川","value":438459},{"name":"天津","value":21185},{"name":"宁夏","value":463},{"name":"安徽","value":53705},{"name":"山东","value":82504},{"name":"山西","value":119104},{"name":"广东","value":333666},{"name":"广西","value":2424},{"name":"新疆","value":940},{"name":"江苏","value":466469},{"name":"江西","value":5397},{"name":"河北","value":77686},{"name":"河南","value":19916},{"name":"浙江","value":18099},{"name":"海南","value":3275},{"name":"湖北","value":2814},{"name":"湖南","value":147816},{"name":"物联网公司","value":1},{"name":"甘肃","value":1150},{"name":"福建","value":5861},{"name":"西藏","value":80},{"name":"贵州","value":145986},{"name":"辽宁","value":4439},{"name":"重庆","value":16008},{"name":"陕西","value":10734},{"name":"青海","value":6461},{"name":"黑龙江","value":1817}],"mapMin":1,"mapMax":438459})
            })

            // 异常语音
            that.mapLineCache.set(2, {
                map: that.getNewMap({"mapValueMap":[["广东",{"number":22624,"province":"200","count":6}],["天津",{"number":3,"province":"220","count":3}],["辽宁",{"number":414,"province":"240","count":5}],["江苏",{"number":2,"province":"250","count":2}],["四川",{"number":7,"province":"280","count":5}],["河北",{"number":1,"province":"311","count":1}],["河南",{"number":1,"province":"371","count":1}],["内蒙古",{"number":142,"province":"471","count":5}],["山东",{"number":67,"province":"531","count":5}],["福建",{"number":80,"province":"591","count":6}],["江西",{"number":71,"province":"791","count":5}],["云南",{"number":73,"province":"871","count":5}],["甘肃",{"number":12,"province":"931","count":5}]],"mapPointData":[{"name":"广东","value":22624},{"name":"天津","value":3},{"name":"辽宁","value":414},{"name":"江苏","value":2},{"name":"四川","value":7},{"name":"河北","value":1},{"name":"河南","value":1},{"name":"内蒙古","value":142},{"name":"山东","value":67},{"name":"福建","value":80},{"name":"江西","value":71},{"name":"云南","value":73},{"name":"甘肃","value":12}],"mapMin":1,"mapMax":414})
            })

            // 机卡分离
            that.mapLineCache.set(3, {
                map: that.getNewMap({"mapValueMap":[["北京",{"number":7181,"province":"100","count":6}],["广东",{"number":45967,"province":"200","count":6}],["上海",{"number":4843,"province":"210","count":6}],["天津",{"number":1605,"province":"220","count":6}],["重庆",{"number":1386,"province":"230","count":6}],["辽宁",{"number":8173,"province":"240","count":6}],["江苏",{"number":24677,"province":"250","count":6}],["湖北",{"number":1020,"province":"270","count":6}],["四川",{"number":17748,"province":"280","count":6}],["陕西",{"number":9034,"province":"290","count":6}],["河北",{"number":5009,"province":"311","count":6}],["山西",{"number":14159,"province":"351","count":6}],["河南",{"number":6670,"province":"371","count":6}],["吉林",{"number":538,"province":"431","count":6}],["黑龙江",{"number":675,"province":"451","count":6}],["内蒙古",{"number":16455,"province":"471","count":6}],["山东",{"number":6256,"province":"531","count":6}],["安徽",{"number":10487,"province":"551","count":6}],["浙江",{"number":8010,"province":"571","count":6}],["福建",{"number":3655,"province":"591","count":6}],["湖南",{"number":9191,"province":"731","count":6}],["广西",{"number":5744,"province":"771","count":6}],["江西",{"number":3288,"province":"791","count":6}],["贵州",{"number":4146,"province":"851","count":6}],["云南",{"number":2189,"province":"871","count":6}],["西藏",{"number":94,"province":"891","count":5}],["海南",{"number":203,"province":"898","count":6}],["甘肃",{"number":693,"province":"931","count":6}],["宁夏",{"number":203,"province":"951","count":6}],["青海",{"number":608,"province":"971","count":6}],["新疆",{"number":1335,"province":"991","count":6}]],"mapPointData":[{"name":"北京","value":7181},{"name":"广东","value":45967},{"name":"上海","value":4843},{"name":"天津","value":1605},{"name":"重庆","value":1386},{"name":"辽宁","value":8173},{"name":"江苏","value":24677},{"name":"湖北","value":1020},{"name":"四川","value":17748},{"name":"陕西","value":9034},{"name":"河北","value":5009},{"name":"山西","value":14159},{"name":"河南","value":6670},{"name":"吉林","value":538},{"name":"黑龙江","value":675},{"name":"内蒙古","value":16455},{"name":"山东","value":6256},{"name":"安徽","value":10487},{"name":"浙江","value":8010},{"name":"福建","value":3655},{"name":"湖南","value":9191},{"name":"广西","value":5744},{"name":"江西","value":3288},{"name":"贵州","value":4146},{"name":"云南","value":2189},{"name":"西藏","value":94},{"name":"海南","value":203},{"name":"甘肃","value":693},{"name":"宁夏","value":203},{"name":"青海","value":608},{"name":"新疆","value":1335}],"mapMin":94,"mapMax":24677})
            })

            // 敏感地区漫游
            that.mapLineCache.set(4, {
                map: that.getNewMap({"mapValueMap":[["北京",{"number":2256191,"province":"100","count":6}],["广东",{"number":2238965,"province":"200","count":6}],["上海",{"number":1594348,"province":"210","count":6}],["天津",{"number":51407,"province":"220","count":6}],["重庆",{"number":88456,"province":"230","count":6}],["辽宁",{"number":126410,"province":"240","count":6}],["江苏",{"number":3442291,"province":"250","count":6}],["湖北",{"number":128163,"province":"270","count":6}],["四川",{"number":520471,"province":"280","count":6}],["陕西",{"number":584487,"province":"290","count":6}],["河北",{"number":162361,"province":"311","count":6}],["山西",{"number":463372,"province":"351","count":6}],["河南",{"number":924739,"province":"371","count":6}],["吉林",{"number":25690,"province":"431","count":6}],["黑龙江",{"number":3275,"province":"451","count":6}],["内蒙古",{"number":85481,"province":"471","count":6}],["山东",{"number":2273524,"province":"531","count":6}],["安徽",{"number":419270,"province":"551","count":6}],["浙江",{"number":1087499,"province":"571","count":6}],["福建",{"number":85143,"province":"591","count":6}],["湖南",{"number":113140,"province":"731","count":6}],["广西",{"number":70445,"province":"771","count":6}],["江西",{"number":86905,"province":"791","count":6}],["贵州",{"number":49485,"province":"851","count":6}],["云南",{"number":84499,"province":"871","count":6}],["西藏",{"number":3,"province":"891","count":3}],["海南",{"number":1590,"province":"898","count":6}],["甘肃",{"number":2532,"province":"931","count":6}],["宁夏",{"number":963,"province":"951","count":6}],["青海",{"number":19119,"province":"971","count":6}],["新疆",{"number":245,"province":"991","count":6}]],"mapPointData":[{"name":"北京","value":2256191},{"name":"广东","value":2238965},{"name":"上海","value":1594348},{"name":"天津","value":51407},{"name":"重庆","value":88456},{"name":"辽宁","value":126410},{"name":"江苏","value":3442291},{"name":"湖北","value":128163},{"name":"四川","value":520471},{"name":"陕西","value":584487},{"name":"河北","value":162361},{"name":"山西","value":463372},{"name":"河南","value":924739},{"name":"吉林","value":25690},{"name":"黑龙江","value":3275},{"name":"内蒙古","value":85481},{"name":"山东","value":2273524},{"name":"安徽","value":419270},{"name":"浙江","value":1087499},{"name":"福建","value":85143},{"name":"湖南","value":113140},{"name":"广西","value":70445},{"name":"江西","value":86905},{"name":"贵州","value":49485},{"name":"云南","value":84499},{"name":"西藏","value":3},{"name":"海南","value":1590},{"name":"甘肃","value":2532},{"name":"宁夏","value":963},{"name":"青海","value":19119},{"name":"新疆","value":245}],"mapMin":3,"mapMax":2273524})
            })

            // 手机终端使用
            that.mapLineCache.set(5, {
                map: that.getNewMap2([{province:'571',number:2591465},{province:'100',number:2993737},{province:'250',number:4050623},{province:'200',number:4014601},{province:'371',number:3201368},{province:'311',number:405762},{province:'351',number:303515},{province:'531',number:554519},{province:'591',number:798284},{province:'290',number:1809659},{province:'551',number:566237},{province:'471',number:321318},{province:'771',number:308883},{province:'240',number:368950},{province:'230',number:231528},{province:'731',number:301407},{province:'451',number:94607},{province:'851',number:214198},{province:'280',number:162209},{province:'791',number:50586},{province:'270',number:106699},{province:'210',number:563097},{province:'871',number:52105},{province:'991',number:46308},{province:'220',number:31399},{province:'951',number:16618},{province:'431',number:81584},{province:'971',number:15020},{province:'931',number:24703},{province:'898',number:6726},{province:'891',number:4983}])
            })
        }
    }
</script>

<style scoped>
.middle-top {
    background: linear-gradient(rgba(5,51,112,0.5), rgba(40,115,171,0.5)) !important;
    height: 249px;
}

/* middle-top */
.middle-top {
    width: 100%;
    /*height: 200px;*/
    box-sizing: border-box;
}
.middle-top .stats {
    width: 558px;
    height: 58px;
    padding: 0 36px 0 28px;
    margin: 0 auto;
    box-sizing: border-box;
    background: url(/image/cmiot-home/stats.png) 0 0 no-repeat;
}
.middle-top .stats span {
    display: inline-block;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #9cebfe;
}
.middle-top .stats>span:first-child {
    width: 185px;
    text-align: center;
}
.middle-top .stats>span:nth-child(2) {
    width: 302px;
    text-align: center;
    font-size: 30px;
}
.middle-top .charts_box {
    height: 170px;
}

.tab_title {
    background: url(/image/cmiot-home/title6.png) 0 0 no-repeat; cursor: pointer;
}

.tab_title a {
    color: #598eb5
}

.tab_title a.active {
    color: #aceaff
}

.total-number {
    color: #9dd9ff;
    font-size: 38px;
    font-weight: bold;
    margin-left: 60px;
    line-height: 90px;
}

.title {
    font-size: 21px;
    line-height: 37px;
    color: #aceaff;
}

.number {
    font-size: 23px;
    color: #9dd9ff;
    font-weight: bold;
}

.gz_tab {
    margin-bottom: 10px;
    height: auto !important;
    box-sizing: border-box;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: space-around;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    padding: 0 7px !important;
}

.gz_tab a {
    display: inline-block;
    width: auto !important;
    height: 31px;
    line-height: 31px;
    text-align: center;
    font-size: 16px !important;
    font-weight: bold;
    padding: 0 15px;
}

.gz_tab .active {
    height: 34px !important;
    line-height: 34px !important;
    background: url(/image/cmiot-home/choose2.png) center/100% 100% no-repeat !important;
}

.tsgz-nraqts-datetime .el-range-input{
    background: #07397d;
    color: #07b0fd;
    border: 1px solid #07b0fd;
}

.tsgz-nraqts-datetime i.el-input__icon.el-range__icon.el-icon-time {
    line-height: 21px;
    color: #07b0fd;
}

.theme-dark-blue .tsgz-nraqts-datetime  .el-range-separator{
    line-height: 21px;
    color: #07b0fd;
}
.theme-dark-blue .tsgz-nraqts-datetime  .el-range-input{
    color: #07b0fd;
}
</style>

<style scoped>
.fr {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
}

.fc {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
}

.jw {
    justify-content: space-between;
}

.ac {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
</style>

<style lang="scss" scoped>
    @import "@/assets/cmiot-home/css/init.scss";
    @import "@/assets/cmiot-home/css/index.scss";

    .editDialogContainer .el-input-number {
        width: 400px;
    }

    .seamless-warp {
        height: 230px;
        overflow: hidden;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        backface-visibility: hidden;
        /* -webkit-perspective: 1000;
         -moz-perspective: 1000;
         -ms-perspective: 1000;
         perspective: 1000;*/
    }
    .seamless-warp ul li {
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-around;
        text-align: center;
        color: #bdfaff;
        border-bottom: 1px solid #2592e1;
        font-size: 14px;
        border-image: linear-gradient(to right, rgba(255,255,255,0), rgba(32,129,205,1), rgba(255,255,255,0)) 30 60 90;
    }

    .seamless-warp ul li span:first-child {
        width: 120px;
    }
    .seamless-warp ul li span:nth-child(2) {
        width: 90px;
    }
    .seamless-warp ul li span:nth-child(3) {
        width: 130px;
    }
    .seamless-warp ul li span:nth-child(4) {
        width: 100px;
    }
    .seamless-warp ul li span:nth-child(5) {
        width: 100px;
    }

    .nraqts-container::-webkit-scrollbar{
        width: 7px;
    }

    .gz_charts div {
        height: 315px;
    }

    .selectBox{
        padding: 10px 20px 9px 20px;
        color: #07b0fd;
        position: relative;
    }
    .selectBox select{
        background: #07397d;
        color: #07b0fd;
        border: 1px solid #07b0fd;
        border-radius: 4px;
        width: 135px;
        height: 32px;
        margin-left: 40px;
        padding-left: 10px;
    }

    /* 地图 */
    .echart-map {
        width: 700px;
        position: absolute;
        left: 0px;
        top: 10px;
    }

    .wrapper{
        overflow: hidden;
        height: 397px;
    }
    .ultab2{
        height: 218px;
        overflow: hidden;
    }

    .theme-dark-blue .nraqts-datepanel {
        background: #07397d;
        color: #07b0fd;

    }
</style>
