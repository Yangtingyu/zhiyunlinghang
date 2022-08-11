<template>
    <el-col>
        <el-row type="flex" justify="space-around" :gutter="10">
            <el-form :model="formData" ref="searchForm" label-width="70px" size="mini" class="search-form">
                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <el-form-item label="时间区间" prop="dateSelectRange" class="time-element">
                        <el-select
                            v-model="formData.dateSelectRange"
                            @change="rangeSelectChange"
                            placeholder="请选择时间区间"
                            clearable
                        >
                            <el-option label="自定义" value="" />
                            <el-option label="一天" value="一天" />
                            <el-option label="一周" value="一周" />
                            <el-option label="一月" value="一月" />
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <el-form-item label="开始" prop="beginTime" class="time-element">
                        <el-date-picker
                            v-model="formData.beginTime"
                            value-format="yyyy-MM-dd"
                            :picker-options="beginPickerOptions"
                            placeholder="选择日期"
                            @change="beginTimeChange"
                            :clearable="false"
                        />
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <el-form-item label="结束" prop="endTime" class="time-element">
                        <el-date-picker
                            v-model="formData.endTime"
                            value-format="yyyy-MM-dd"
                            :picker-options="endPickerOptions"
                            placeholder="选择日期"
                            @change="endTimeChange"
                            :clearable="false"
                        />
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>

        <el-row>
            <ve-line
                :data="chartData"
                :loading="lineChartLoading"
                :data-empty="lineChartEmpty"
                :extend="extend"
                :height="height"
            />
        </el-row>
    </el-col>
</template>

<script>
    import 'v-charts/lib/style.css'
    import moment from 'moment'

    export default {
        name: 'common-search-form',

        props: {
            classifyField: {
                type: String,
                default: 'event_remark'
            },

            intervalConditionField: {
                type: String,
                default: 'eventdate'
            },

            intervalConditionFormatBegin: {
                type: String,
                default: 'YYYYMMDD'
            },

            intervalConditionFormatEnd: {
                type: String,
                default: 'YYYYMMDD'
            },

            columns: {
                type: Array,
                default: function() {
                    return []
                }
            },

            getChartParams: {
                type: Function
            },

            getDataMap: {
                type: Function
            },

            extend: {
                type: Object,
                default: function() {
                    return {
                        grid: { top: "15%", bottom: "1%" },
                        xAxis: { axisLabel: { rotate: 10 } },
                        yAxis: { minInterval: 1 },
                        legend: { type: 'scroll' }
                    }
                }
            },

            height: {
                type: String,
                default: '160px'
            },

            notInitChartData: {
                type: Boolean,
                default: false
            },

            notGroup: {
                type: Boolean,
                default: false
            },

            countFieldName: {
                type: String,
                default: 'count'
            },

            chartIntervalFormat: {
                type: String,
                default: 'YYYYMMDD'
            },

            columnField: {
                type: String,
                default: ''
            }
        },

        data() {
            let that = this

            let shortcuts = [
                {
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }
            ]

            return {
                formData: {
                    dateSelectRange: '一月',
                    beginTime: moment().subtract(1, 'months').format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD')
                },

                beginPickerOptions: {
                    disabledDate(time) {
                        let flag = true
                        if (time.getTime() <= Date.now()) {
                            flag=false
                        }
                        return flag
                    },
                    shortcuts,
                },

                endPickerOptions: {
                    disabledDate(time) {
                        let flag = true
                        if (time.getTime() <= Date.now() && time.getTime() >= (Date.now() - 7 * 24 * 3600 * 1000)) {
                            flag = false
                        }
                        return flag
                    },
                    shortcuts
                },

                chartData: {
                    columns: [],
                    rows: []
                },

                lineChartLoading: false,

                lineChartEmpty: true,

                chartDataApi: '/service/monitoring-query/dataanalysiscommon/pointchart',

                listDataApi: '/service/monitoring-query/dataanalysiscommon/list'
            }
        },

        methods: {
            rangeSelectChange(val) {
                let that = this
                if (val == '一天') {
                    that.formData.beginTime = moment().format('YYYY-MM-DD')
                    that.formData.endTime = moment().format('YYYY-MM-DD')
                } else if (val == '一周') {
                    that.formData.beginTime = moment().subtract(1, 'weeks').format('YYYY-MM-DD')
                    that.formData.endTime =  moment().format('YYYY-MM-DD')
                } else if (val == '一月') {
                    that.formData.beginTime = moment().subtract(1, 'months').format('YYYY-MM-DD')
                    that.formData.endTime = moment().format('YYYY-MM-DD')
                }
                that.getChartData()
                that.$emit('time-change', {
                    beginTime: moment(that.formData.beginTime, 'YYYY-MM-DD').format('YYYYMMDD'),
                    endTime: moment(that.formData.endTime, 'YYYY-MM-DD').format('YYYYMMDD')
                })
            },

            beginTimeChange() {
                let that = this
                that.formData.dateSelectRange = ''
                that.endPickerOptions = Object.assign({}, that.endPickerOptions, {
                    disabledDate: time => {
                        let tstamp = moment(that.formData.beginTime, 'YYYY-MM-DD').valueOf()
                        let tempTime = time.getTime()
                        return tempTime < tstamp || tempTime > Date.now()
                    }
                })
                that.getChartData()
                that.$emit('time-change', {
                    beginTime: moment(that.formData.beginTime, 'YYYY-MM-DD').format('YYYYMMDD'),
                    endTime: moment(that.formData.endTime, 'YYYY-MM-DD').format('YYYYMMDD')
                })
            },

            endTimeChange() {
                let that = this
                that.formData.dateSelectRange = ''
                that.beginPickerOptions =  Object.assign({}, that.beginPickerOptions, {
                    disabledDate: time => {
                        let tstamp = moment(that.formData.endTime, 'YYYY-MM-DD').valueOf()
                        return time.getTime() > tstamp
                    }
                })
                that.getChartData()
                that.$emit('time-change', {
                    beginTime: moment(that.formData.beginTime, 'YYYY-MM-DD').format('YYYYMMDD'),
                    endTime: moment(that.formData.endTime, 'YYYY-MM-DD').format('YYYYMMDD')
                })
            },

            getChartData() {
                let that = this
                that.chartData.rows = []
                that.lineChartEmpty = true
                let getChartParams = that.getChartParams
                let param = getChartParams ? getChartParams() : {}
                if (param.intervalCondition) {
                    delete param.intervalCondition
                }
                if (param.chartInterval) {
                    delete param.chartInterval
                }
                let beginTime = that.formData.beginTime
                let endTime = that.formData.endTime
                let intervalConditionFormatBegin = that.intervalConditionFormatBegin
                let intervalConditionFormatEnd = that.intervalConditionFormatEnd
                param.intervalCondition = {}
                param.intervalCondition[that.intervalConditionField] = [
                    beginTime ? moment(beginTime, 'YYYY-MM-DD').format(intervalConditionFormatBegin) : 0,
                    endTime ? moment(endTime, 'YYYY-MM-DD').format(intervalConditionFormatEnd) : 0
                ]
                let chartIntervalFormat = that.chartIntervalFormat
                param.chartInterval = [
                    moment(beginTime, 'YYYY-MM-DD').format(chartIntervalFormat),
                    moment(endTime, 'YYYY-MM-DD').format(chartIntervalFormat)
                ]

                that.lineChartLoading = true
                let countFieldName = that.countFieldName
                let notGroup = that.notGroup
                that.$faxios.post(notGroup ? that.listDataApi : that.chartDataApi, param).then(res => {
                    if (res.code == 200) {
                        let resultData = res.body ? res.body.resultData : null
                        if (resultData && resultData.length > 0) {
                            // 后面的splice()方法会改变原数组，所以必须先拷贝出来
                            let copyColumns = [].concat(that.columns)
                            let columnField = that.columnField
                            if (columnField) {
                                let temp = []
                                let tempSet = new Set()
                                for (let i = 0; i < resultData.length; i++) {
                                    let columnName = resultData[i][columnField]
                                    if (columnName && !tempSet.has(columnName)) {
                                        tempSet.add(columnName)
                                        copyColumns.push(columnName)
                                    }
                                }
                                that.chartData.columns = [].concat(copyColumns)
                            }
                            let dataMap = null
                            let getDataMap = that.getDataMap
                            let groupCriteria = param.groupCriteria
                            let columnsLength =  copyColumns.length
                            if (getDataMap) {
                                dataMap = getDataMap(resultData)
                            } else if (notGroup) {
                                let timeFieldName = 'eventdate'
                                if (columnsLength == 2) {
                                    // 不是分组查询（如调度表）
                                    let temp = {}
                                    for (let i = 0; i < resultData.length; i++) {
                                        let row = resultData[i]
                                        temp[row[timeFieldName] + ''] = row[countFieldName]
                                    }
                                    dataMap = new Map()
                                    dataMap.set(copyColumns[1], temp)
                                } else {
                                    let classifyField = that.classifyField
                                    let tempMap = new Map()
                                    for (let i = 0; i < resultData.length; i++) {
                                        let row = resultData[i]
                                        let tempClassifyName = row[classifyField]
                                        let tempValue = tempMap.get(tempClassifyName)
                                        if (tempValue) {
                                            tempValue.push(row)
                                            tempMap.set(tempClassifyName, tempValue)
                                        } else {
                                            let tempArray = []
                                            tempArray.push(row)
                                            tempMap.set(tempClassifyName, tempArray)
                                        }
                                    }

                                    dataMap = new Map()
                                    for (let i = 0; i < copyColumns.length; i++) {
                                        if (i >= 1) {
                                            let classifyName = copyColumns[i]
                                            let temp = {}
                                            let rows = tempMap.get(classifyName)
                                            if (rows && rows.length > 0) {
                                                for (let j = 0; j < rows.length; j++) {
                                                    let tempRow = rows[j]
                                                    temp[tempRow[timeFieldName] + ''] = tempRow[countFieldName]
                                                }
                                            }
                                            dataMap.set(classifyName, temp)
                                        }
                                    }
                                }
                            } else if (groupCriteria) {
                                let groupCriteriaArray = groupCriteria.split(',')
                                let groupCriteriaArrayLength = groupCriteriaArray.length
                                if (groupCriteriaArrayLength == 1 && columnsLength == 2) {
                                    let temp = {}
                                    let timeFieldName = groupCriteriaArray[0]
                                    for (let i = 0; i < resultData.length; i++) {
                                        let row = resultData[i]
                                        temp[row[timeFieldName] + ''] = row[countFieldName]
                                    }
                                    dataMap = new Map()
                                    dataMap.set(copyColumns[1], temp)
                                } else if (groupCriteriaArrayLength == 2 && columnsLength > 1) {
                                    let tempMap = new Map()
                                    let timeFieldName = groupCriteriaArray[0]
                                    let classFieldName = groupCriteriaArray[1]
                                    for (let i = 0; i < resultData.length; i++) {
                                        let row = resultData[i]
                                        let date = row ? (row[timeFieldName] + '') : '';
                                        let className = row ? row[classFieldName] : ''
                                        if (className && date) {
                                            let count = row[countFieldName] ? row[countFieldName] : 0
                                            if (tempMap.has(className)) {
                                                let temp = tempMap.get(className)
                                                temp[date] = count
                                                tempMap.set(className, temp)
                                            } else {
                                                let temp = {}
                                                temp[date] = count
                                                tempMap.set(className, temp)
                                            }
                                        }
                                    }
                                    dataMap = new Map()
                                    let tempColumns = copyColumns.splice(1)
                                    for (let i = 0; i < tempColumns.length; i++) {
                                        let className = tempColumns[i]
                                        if (tempMap.has(className)) {
                                            dataMap.set(className, tempMap.get(className))
                                        } else {
                                            dataMap.set(className, {})
                                        }
                                    }
                                } else {
                                    console.log('折线图分组条件超过2个但未指定解析解析方法getDataMap()')
                                }
                            } else {
                                console.log('notGroup为false且没有分组条件，或columnsLength长度小于2')
                            }
                            let interval = param.chartInterval
                            if (interval) {
                                that.chartData.rows = that.genLineChartData(dataMap, interval[0], interval[1])
                                if (that.chartData.rows && that.chartData.rows.length > 0) {
                                    that.lineChartEmpty = false
                                }
                            } else {
                                console.log('查询条件中没有chartInterval')
                            }
                        }
                    } else {
                        that.$alert(res.message)
                    }
                    that.lineChartLoading = false
                })
            },

            // 折线图数据拼接，将多条折线的数据拼接成ve-line组件的data
            genLineChartData(dataMap, beginTimeString, endTimeString, timeFormat) {
                if (!dataMap) {
                    return []
                }
                if (!timeFormat) {
                    timeFormat = 'YYYY-MM-DD HH:mm:ss'
                }
                let chartData = []
                let beginTime = moment(beginTimeString, timeFormat).valueOf()
                let endTime = moment(endTimeString, timeFormat).valueOf()
                for (let i = beginTime; i <= endTime; i = (moment(i).add(1, 'days').valueOf())) {
                    let row = {}
                    let momentTime = moment(i)
                    row['日期'] = momentTime.format('YYYY-MM-DD')
                    let timeKey = momentTime.format('YYYYMMDD')
                    dataMap.forEach((value, key) => {
                        let count = value[timeKey]
                        row[key] = count ? count : 0
                    })
                    chartData.push(row)
                }
                return chartData
            },

            getTime() {
                let that = this
                return {
                    beginTime: moment(that.formData.beginTime, 'YYYY-MM-DD').format('YYYYMMDD'),
                    endTime: moment(that.formData.endTime, 'YYYY-MM-DD').format('YYYYMMDD')
                }
            }
        },

        mounted() {
            let that = this
            let initColumns = that.columns
            if (initColumns) {
                that.chartData.columns = initColumns
            }
            if (!that.notInitChartData) {
                that.getChartData()
            }
        }
    }
</script>

<style>
.theme-dark-blue .el-card__header span {
    font-size: 14px !important;
}

.theme-dark-blue .el-card__header {
    padding: 12px !important;
}

.theme-dark-blue .el-card__body {
    padding: 10px !important;
}
.search-form .time-element .el-input {
    width: 130px;
}
.theme-dark-blue .time-element .el-date-editor.el-input {
    width: 130px;
}
</style>
