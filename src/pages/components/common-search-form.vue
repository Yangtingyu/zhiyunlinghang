<template>
    <el-row v-show="isShowSearchForm">
        <el-col :span="24">
            <div class="common_form_wrapper">
                <el-form :model="formData" ref="searchForm" label-width="auto" size="mini" class="search-form">
                    <el-row type="flex" style="flex-wrap: wrap">
                        <el-col
                            v-for="(formItem, index) in formItems"
                            :key="index"
                            :xs="24"
                            :sm="12"
                            :md="8"
                            :lg="8"
                            :xl="6"
                        >
                            <el-form-item v-if="formItem === '时间区间'" label="时间区间" prop="dateSelectRange">
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

                            <el-form-item v-else-if="formItem === '开始时间'" label="开始时间" prop="beginTime">
                                <el-date-picker
                                    type="datetime"
                                    v-model="formData.beginTime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :picker-options="beginPickerOptions"
                                    placeholder="选择日期"
                                    @change="beginTimeChange"
                                    :clearable="false"
                                />
                            </el-form-item>

                            <el-form-item v-else-if="formItem === '结束时间'" label="结束时间" prop="endTime">
                                <el-date-picker
                                    type="datetime"
                                    v-model="formData.endTime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :picker-options="endPickerOptions"
                                    placeholder="选择日期"
                                    @change="endTimeChange"
                                    :clearable="false"
                                />
                            </el-form-item>

                            <el-form-item
                                v-else-if="formItem === '事件类型' || formItem === '工单类型'"
                                :label="formItem"
                                prop="eventType"
                            >
                                <el-select
                                    type="select"
                                    v-model="formData.eventType"
                                    @change="eventTypeChange"
                                    clearable
                                >
                                    <el-option
                                        v-for="(i, index) in eventTypeOptions"
                                        :key="index"
                                        :label="i.label"
                                        :value="i.value"
                                    />
                                </el-select>
                            </el-form-item>

                            <el-form-item v-else-if="formItem === '事件大类'" label="事件大类" prop="mainClass">
                                <el-select
                                    type="select"
                                    no-data-text="请先选择事件类型"
                                    v-model="formData.mainClass"
                                    @change="mainClassChange"
                                    clearable
                                >
                                    <el-option
                                        v-for="(i, index) in mainclassOptions"
                                        :key="index"
                                        :label="i.label"
                                        :value="i.label"
                                    />
                                </el-select>
                            </el-form-item>

                            <el-form-item v-else-if="formItem === '事件小类'" label="事件小类" prop="subClass">
                                <el-select
                                    type="select"
                                    no-data-text="请先选择事件大类"
                                    v-model="formData.subClass"
                                    clearable
                                >
                                    <el-option
                                        v-for="(i, index) in subClassOptions"
                                        :key="index"
                                        :label="i.label"
                                        :value="i.label"
                                    />
                                </el-select>
                            </el-form-item>

                            <el-form-item v-else-if="formItem === '告警级别'" label="告警级别" prop="priority">
                                <el-select type="select" v-model="formData.priority" clearable>
                                    <el-option
                                        v-for="(i, index) in alertLevelOptions"
                                        :key="index"
                                        :label="i.label"
                                        :value="i.value"
                                    />
                                </el-select>
                            </el-form-item>

                            <el-form-item v-else-if="formItem === '数据来源'" label="数据来源" prop="dataSource">
                                <el-select type="select" v-model="formData.dataSource" clearable>
                                    <el-option
                                        v-for="(i, index) in dataSourceOptions"
                                        :key="index"
                                        :label="i.label"
                                        :value="i.value"
                                    />
                                </el-select>
                            </el-form-item>

                            <el-form-item v-else-if="formItem === '登录人'" label="登录人" prop="userName">
                                <el-select type="select" v-model="formData.userName" clearable>
                                    <el-option
                                        v-for="(i, index) in userNameOptions"
                                        :key="index"
                                        :label="i.label"
                                        :value="i.value"
                                    />
                                </el-select>
                            </el-form-item>

                            <el-form-item v-else-if="formItem === '操作人'" label="操作人" prop="userName">
                                <el-select type="select" v-model="formData.userName" clearable>
                                    <el-option
                                        v-for="(i, index) in userNameOptions"
                                        :key="index"
                                        :label="i.label"
                                        :value="i.value"
                                    />
                                </el-select>
                            </el-form-item>

                            <el-form-item
                                v-else-if="formItem === '源IP所属国家'"
                                label="源IP所属国家"
                                prop="sIpCountry"
                            >
                                <el-select type="select" v-model="formData.sIpCountry" clearable filterable>
                                    <el-option
                                        v-for="(i, index) in countryOptions"
                                        :key="index"
                                        :label="i.label"
                                        :value="i.value"
                                    />
                                </el-select>
                            </el-form-item>

                            <el-form-item
                                v-else-if="formItem === '目的IP所属国家'"
                                label="目的IP所属国家"
                                prop="dIpCountry"
                            >
                                <el-select type="select" v-model="formData.dIpCountry" clearable filterable>
                                    <el-option
                                        v-for="(i, index) in countryOptions"
                                        :key="index"
                                        :label="i.label"
                                        :value="i.value"
                                    />
                                </el-select>
                            </el-form-item>

                            <el-form-item
                                v-else-if="formItem === '源IP所属省份'"
                                label="源IP所属省份"
                                prop="sIpProvince"
                            >
                                <el-select type="select" v-model="formData.sIpProvince" clearable filterable>
                                    <el-option
                                        v-for="(i, index) in provinceOptions"
                                        :key="index"
                                        :label="i.label"
                                        :value="i.value"
                                    />
                                </el-select>
                            </el-form-item>

                            <el-form-item
                                v-else-if="formItem === '目的IP所属省份'"
                                label="目的IP所属省份"
                                prop="dIpProvince"
                            >
                                <el-select type="select" v-model="formData.dIpProvince" clearable filterable>
                                    <el-option
                                        v-for="(i, index) in provinceOptions"
                                        :key="index"
                                        :label="i.label"
                                        :value="i.value"
                                    />
                                </el-select>
                            </el-form-item>

                            <el-form-item
                                v-else-if="formItem === '源IP业务平台'"
                                label="源IP业务平台"
                                prop="sIpBusinessPlatfrom"
                            >
                                <el-select type="select" v-model="formData.sIpBusinessPlatfrom" clearable>
                                    <el-option
                                        v-for="(i, index) in businessPlatfromOptions"
                                        :key="index"
                                        :label="i.label"
                                        :value="i.value"
                                    />
                                </el-select>
                            </el-form-item>

                            <el-form-item
                                v-else-if="formItem === '目的IP业务平台'"
                                label="目的IP业务平台"
                                prop="dIpBusinessPlatfrom"
                            >
                                <el-select type="select" v-model="formData.dIpBusinessPlatfrom" clearable>
                                    <el-option
                                        v-for="(i, index) in businessPlatfromOptions"
                                        :key="index"
                                        :label="i.label"
                                        :value="i.value"
                                    />
                                </el-select>
                            </el-form-item>

                            <el-form-item
                                v-else-if="typeof formItem === 'object' && formItem.label && formItem.prop && formItem.type == 'select'"
                                :label="formItem.label"
                                :prop="'additionalItems.' + index + '.value'"
                            >
                                <el-select type="select" v-model="formData.additionalItems[index].value" clearable>
                                    <el-option
                                        v-for="(option, index) in formItem.options"
                                        :key="index"
                                        :label="option.label"
                                        :value="option.value"
                                    />
                                </el-select>
                            </el-form-item>

                            <el-form-item
                                v-else-if="typeof formItem === 'object' && formItem.label && formItem.prop"
                                :label="formItem.label"
                                :prop="'additionalItems.' + index + '.value'"
                            >
                                <el-input v-model="formData.additionalItems[index].value" clearable />
                            </el-form-item>
                        </el-col>

                        <el-col
                            :xs="24"
                            :sm="12"
                            :md="formButtonWidth"
                            :lg="formButtonWidth"
                            :xl="6"
                            style="float:right;flex-grow:1;"
                        >
                            <el-form-item>
                                <component
                                    v-for="(btn, index) in formButtonArray"
                                    :key="index"
                                    :is="btn.componentType === 'switch' ? 'el-switch' : 'el-button'"
                                    @change="onChange(btn)"
                                    @click="onClick(btn)"
                                    :style="btn.style"
                                    :active-text="btn.activeText"
                                    v-model="buttonData[btn.prop]"
                                    :type="btn.type"
                                    :loading="btn.loading"
                                    :icon="btn.icon"
                                    :class="{ btnCls: btn.componentType !== 'switch' }"
                                >
                                    {{ btn.text }}
                                </component>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-col>

        <!-- 导入窗口 -->
        <el-dialog title="导入" :visible.sync="isShowImportExcelDialog" width="500px" center>
            <div class="editDialogContainer" style="text-align: center">
                <el-upload
                    ref="upload"
                    class="upload-demo"
                    :action="uploadXlsDataApi"
                    :limit="1"
                    :multiple="false"
                    accept=".xls"
                    :on-success="uploadSuccess"
                    :data="uploadData"
                >
                    <el-button size="small" type="primary" @click="downloadTemp()">下载模板</el-button>
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip"></div>
                </el-upload>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShowImportExcelDialog = false">取 消</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
    import store from '@/store'
    import moment from 'moment'

    export default {
        name: 'common-search-form',

        props: {
            module: {
                type: String,
                default: ''
            },

            formItems: {
                type: Array,
                default: function() {
                    return []
                }
            },

            formButtons: {
                type: Array,
                default: function() {
                    return []
                }
            },

            codeType: {
                type: String,
                default: ''
            },

            tableName: {
                type: String,
                default: ''
            },

            uploadData: {
                type: Object,
                default: function() {
                    return {}
                }
            },

            initButtonData: {
                type: Object,
                default: function() {
                    return {}
                }
            },

            defaultRange: {
                type: String,
                default: '一周'
            }
        },

        data() {
            let that = this

            let beginTime = moment().subtract(1, 'weeks').format('YYYY-MM-DD HH:mm:ss')
            let dateSelectRange = that.defaultRange
            if (dateSelectRange == '一天') {
                beginTime = moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
            } else if (dateSelectRange == '一月') {
                beginTime = moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss')
            } else {
                beginTime = moment().subtract(1, 'weeks').format('YYYY-MM-DD HH:mm:ss')
            }

            let formButtonWidth = 8
            let formButtons = that.formButtons
            if (formButtons && formButtons.length >= 4) {
                formButtonWidth = 12
            }

            return {
                formButtonWidth,

                moduleName: that.module,

                isShowSearchForm: false,

                tableDataApi: '/service/monitoring-query/dataanalysiscommon/list',

                chartDataApi: '/service/monitoring-query/dataanalysiscommon/pointchart',

                // 下载上传Excel模板
                downloadTmpDataApi: '/service/monitoring-query/dataanalysiscommon/downloadtemplate',

                uploadXlsDataApi: '/service/monitoring-query/dataanalysiscommon/uploadExcel',

                formData: {
                    dateSelectRange,
                    beginTime,
                    endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                    eventType: '',
                    mainClass: '',
                    subClass: '',
                    priority: '',
                    dataSource: '',
                    sIpCountry: '',
                    dIpCountry: '',
                    sIpProvince: '',
                    dIpProvince: '',
                    sIpBusinessPlatfrom: '',
                    dIpBusinessPlatfrom: '',
                    userName: '',
                    additionalItems: []
                },

                // 按钮的值，例如switch按钮绑定的变量
                buttonData: that.initButtonData, // 这里放个prop是因为switch按钮在没有初始化的键时，在用户没有鼠标点击按钮之前就用程序去为buttonData加上对应的键，会让switch按钮失效

                // 表单按钮数组
                formButtonArray: [],

                eventTypeOptions: [],

                // key为eventType名称，value为mainClass的选项Array，用来在选择eventType时获取对应的mainClass
                eventTypeMainClassMap: new Map(),

                mainclassOptions: [],

                // key为mainClass名称，value为subClass的选项Array，用来在选择mainClass时获取对应的subClass
                mainClassSubClassMap: new Map(),

                subClassOptions: [],

                // 告警级别
                alertLevelOptions: [],

                // 数据来源
                dataSourceOptions: [],

                // IP业务平台
                businessPlatfromOptions: [],

                // 国家
                countryOptions: [],

                // 省份
                provinceOptions: [],

                // 登录人
                userNameOptions: [],

                // 导入弹框
                isShowImportExcelDialog: false
            }
        },

        computed: {
            beginPickerOptions() {
                let that = this
                return {
                    disabledDate(time) {
                        return time.getTime() > moment(that.formData.endTime, 'YYYY-MM-DD HH:mm:ss').valueOf()
                    },
                    shortcuts: [
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
                }
            },

            endPickerOptions() {
                let that = this
                let beginTimeStamp = moment(that.formData.beginTime, 'YYYY-MM-DD HH:mm:ss').subtract(1, 'days').valueOf()
                return {
                    disabledDate(time) {
                        let tempTime = time.getTime()
                        return tempTime > Date.now() || tempTime < beginTimeStamp
                    },
                    shortcuts: [
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
                }
            }
        },

        methods: {
            getFormData() {
                let that = this
                let newFormData = { ...that.formData }
                that.formData.additionalItems.forEach(e => {
                    let prop = e.prop
                    if (prop) {
                        newFormData[prop] = e.value
                    }
                })
                newFormData.buttonData = that.buttonData
                return newFormData
            },

            onChange(btn) {
                let that = this
                if (btn.componentType === 'switch') {
                    that.$emit('change', that.buttonData, btn)
                }
            },

            setButtonData(key, value) {
                this.buttonData[key] = value
            },

            onClick(btn) {
                let that = this
                if (btn.componentType !== 'switch') {
                    btn.method()
                }
            },

            // 下载导入Excel模板
            downloadTemp() {
                let that = this
                let aLink = document.createElement('a')
                aLink.style.display = 'none'
                aLink.href = that.downloadTmpDataApi + "?module=" + that.moduleName
                document.body.appendChild(aLink)
                aLink.click()
            },

            // 导入Excel成功回调方法
            uploadSuccess(response, file, fileList) {
                let that = this
                that.isShowImportExcelDialog = false
                if (response.code == 200) {
                    let msg = '导入成功'
                    if (response.body && response.body.exceptionSize > 0) {
                        let eData = ''
                        if (response.body.exceptionData) {
                            (response.body.exceptionData).forEach(e => {
                                eData += JSON.stringify(e) + '<br/>'
                            })
                        }
                        msg = '失败' + response.body.exceptionSize + '条;' + ' <br/> ' + '失败数据:' + eData
                    }
                    that.$message({
                        type: 'success',
                        dangerouslyUseHTMLString: true,
                        message: msg
                    })
                    that.$emit('import-excel-success')
                } else {
                    that.$message({
                        type:'error',
                        message: response.message
                    })
                }
                that.$refs.upload.clearFiles()
            },

            rangeSelectChange(val) {
                let that = this
                if (val == '一天') {
                    that.formData.beginTime = moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
                    that.formData.endTime = moment().format('YYYY-MM-DD HH:mm:ss')
                } else if (val == '一周') {
                    that.formData.beginTime = moment().subtract(1, 'weeks').format('YYYY-MM-DD HH:mm:ss')
                    that.formData.endTime =  moment().format('YYYY-MM-DD HH:mm:ss')
                } else if (val == '一月') {
                    that.formData.beginTime = moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss')
                    that.formData.endTime = moment().format('YYYY-MM-DD HH:mm:ss')
                }
            },

            beginTimeChange() {
                let that = this
                that.formData.dateSelectRange = ''
                let endTime = that.formData.endTime
                let beginTimeStamp = moment(that.formData.beginTime, 'YYYY-MM-DD HH:mm:ss').valueOf()
                let endTimeStamp = moment(endTime, 'YYYY-MM-DD HH:mm:ss').valueOf()
                if (beginTimeStamp > endTimeStamp) {
                    that.formData.beginTime = endTime
                }
            },

            endTimeChange() {
                let that = this
                that.formData.dateSelectRange = ''
                let beginTime = that.formData.beginTime
                let beginTimeStamp = moment(beginTime, 'YYYY-MM-DD HH:mm:ss').valueOf()
                let endTimeStamp = moment(that.formData.endTime, 'YYYY-MM-DD HH:mm:ss').valueOf()
                if (beginTimeStamp > endTimeStamp) {
                    that.formData.endTime = beginTime
                }
                that.beginPickerOptions =  Object.assign({}, that.beginPickerOptions, {
                    disabledDate: time => {
                        return time.getTime() > endTimeStamp
                    }
                })
            },

            /**
             * 【事件类型】select表单选项的change事件回调
             * 
             * @param {String} eventType 
             */
            eventTypeChange(eventType) {
                let that = this
                that.mainclassOptions = []
                if (that.formData) {
                    that.formData.mainClass = ''
                    that.formData.subClass = ''
                }
                if (!eventType) {
                    return
                }
                let mainclassArrayCache = that.eventTypeMainClassMap.get(eventType)
                if (mainclassArrayCache) {
                    that.mainclassOptions = mainclassArrayCache
                }
            },

            /**
             * 【事件大类】select表单选项的change事件回调
             * 
             * @param {String} mainClass 
             */
            mainClassChange(mainClass) {
                let that = this
                that.subClassOptions = []
                if (that.formData) {
                    that.formData.subClass = ''
                }
                if (!mainClass) {
                    return
                }
                let subClassArrayCache = that.mainClassSubClassMap.get(mainClass)
                if (subClassArrayCache) {
                    that.subClassOptions = subClassArrayCache
                }
            },

            // 从码表中获取数据类型，把对应的事件大类、事件小类也查出来，并且建立起正确的关联关系
            getEventType() {
                let that = this
                let codeType = that.codeType
                let tableName = that.tableName
                that.eventTypeOptions = []
                if (codeType == 'dlp_code' || codeType == 'ids_code' || codeType == 'waf_code') {
                    let matchCondition = { is_deleted: 0 }
                    if (codeType == 'waf_code') {
                        matchCondition.tag = tableName
                    }
                    that.$faxios.post(that.chartDataApi, {
                        module: codeType,
                        matchCondition,
                        groupCriteria: 'event_type,mainclass,subclass'
                    }).then(res => {
                        if (res.code == 200) {
                            let resultData = res.body.resultData
                            if (resultData && resultData.length > 0) {
                                let eventTypeSet = new Set()
                                let eventTypeMainClassSetMap = new Map()
                                let mainClassSubClassSetMap = new Map()
                                resultData.forEach(row => {
                                    let eventType = row.event_type
                                    if (eventType) {
                                        eventTypeSet.add(eventType)
                                        let mainClass = row.mainclass
                                        if (mainClass) {
                                            that.setKeySetMap(eventTypeMainClassSetMap, eventType, mainClass)
                                            let subClass = row.subclass
                                            if (subClass) {
                                                that.setKeySetMap(mainClassSubClassSetMap, mainClass, subClass)
                                            }
                                        }
                                    }
                                })
                                // 组装成可直接使用的形式
                                for (let item of eventTypeSet) {
                                    that.eventTypeOptions.push({ label: item, value: item })
                                }
                                let eventTypeMainClassMap = new Map()
                                eventTypeMainClassSetMap.forEach((mainClassSet, eventType) => {
                                    let mainclassOptions = []
                                    for (let mainClass of mainClassSet) {
                                        mainclassOptions.push({ label: mainClass, value: mainClass })
                                    }
                                    eventTypeMainClassMap.set(eventType, mainclassOptions)
                                })
                                that.eventTypeMainClassMap = eventTypeMainClassMap
                                let mainClassSubClassMap = new Map()
                                mainClassSubClassSetMap.forEach((subClassSet, mainClass) => {
                                    let subClassOptions = []
                                    for (let subClass of subClassSet) {
                                        subClassOptions.push({ label: that.fixEventTypeName(subClass), value: subClass })
                                    }
                                    mainClassSubClassMap.set(mainClass, subClassOptions)
                                })
                                that.mainClassSubClassMap = mainClassSubClassMap
                            }
                        } else {
                            that.$alert(res.message)
                        }
                    })
                } else {
                    that.$faxios.post(that.chartDataApi, {
                        module: 'event_type',
                        matchCondition: { is_deleted: 0 },
                        groupCriteria: 'event_type,mainclass'
                    }).then(res => {
                        if (res.code == 200) {
                            let resultData = res.body.resultData
                            if (resultData && resultData.length > 0) {
                                let eventTypeSet = new Set()
                                resultData.forEach(row => {
                                    let eventType = row.event_type
                                    if (eventType) {
                                        eventTypeSet.add(eventType)
                                        let mainclassArrayCache = that.eventTypeMainClassMap.get(eventType)
                                        let mainclass = row.mainclass
                                        let temp = { label: that.fixEventTypeName(mainclass), value: mainclass }
                                        if (mainclassArrayCache) {
                                            mainclassArrayCache.push(temp)
                                            that.eventTypeMainClassMap.set(eventType, mainclassArrayCache)
                                        } else {
                                            that.eventTypeMainClassMap.set(eventType, [ temp ])
                                        }
                                    }
                                })
                                // 组装成可直接使用的形式
                                for (let item of eventTypeSet) {
                                    that.eventTypeOptions.push({ label: that.fixEventTypeName(item), value: item })
                                }
                                
                                // 查询并组装mainClass数据
                                that.$faxios.post(that.chartDataApi, {
                                    module: 'event_type',
                                    matchCondition: { is_deleted: 0 },
                                    groupCriteria: 'mainclass,subclass'
                                }).then(res => {
                                    if (res.code == 200) {
                                        let resultData = res.body.resultData
                                        if (resultData && resultData.length > 0) {
                                            let mainclassSet = new Set()
                                            resultData.forEach(row => {
                                                let mainclass = row.mainclass
                                                if (mainclass) {
                                                    mainclassSet.add(mainclass)
                                                    let subclassArrayCache = that.mainClassSubClassMap.get(mainclass)
                                                    let subclass = row.subclass
                                                    let temp = { label: that.fixEventTypeName(subclass), value: subclass }
                                                    if (subclassArrayCache) {
                                                        subclassArrayCache.push(temp)
                                                        that.mainClassSubClassMap.set(mainclass, subclassArrayCache)
                                                    } else {
                                                        that.mainClassSubClassMap.set(mainclass, [ temp ])
                                                    }
                                                }
                                            })
                                        }
                                    } else {
                                        that.$alert(res.message)
                                    }
                                })
                            }
                        } else {
                            that.$alert(res.message)
                        }
                    })
                }
            },

            /**
             * 设置一个Map的key-value值
             * 值为一个Set，如果key已存在则在对应的Set中增加setValue，否则新建一个Set来添加该值
             * 
             * @param {Map} map 
             * @param {String} key 
             * @param {Set} setValue 
             */
            setKeySetMap(map, key, setValue) {
                if (map.has(key)) {
                    map.get(key).add(setValue)
                } else {
                    let tempSet = new Set()
                    tempSet.add(setValue)
                    map.set(key, tempSet)
                }
            },

            /**
             * 把value为Set的Map转变为value为select表单选项的option数组
             * 需要依据codeMap把code转换为对应值
             * 
             * @param {Map} setMap 
             * @param {Map} codeMap 
             */
            changeSetMapToSelectOptionMapByCodeMap(setMap, codeMap) {
                let that = this
                let selectOptionMap = new Map()
                setMap.forEach((set, code) => {
                    let selectOptions = []
                    for (let element of set) {
                        selectOptions.push({ label: that.fixEventTypeName(element), value: element })
                    }
                    selectOptionMap.set(codeMap.get(code), selectOptions)
                })
                return selectOptionMap
            },

            /**
             * 处理事件类型名称，转换为用户友好的文字
             * 
             * @param {String} eventTypeName 
             */
            fixEventTypeName(eventTypeName) {
                if (!eventTypeName) {
                    return ''
                }
                if (eventTypeName == '23为SYN_FLOOD事件类型') {
                    return 'SYN_FLOOD事件'
                }
                if (eventTypeName == '24为ACK_FLOOD事件类型') {
                    return 'ACK_FLOOD事件'
                }
                if (eventTypeName == '25为HTTP_FLOOD事件类型') {
                    return 'HTTP_FLOOD事件'
                }
                if (eventTypeName == '36为Collaboration_Event事件类型') {
                    return 'Collaboration事件'
                }
                if (eventTypeName == '42为Slow_Dos事件类型') {
                    return 'Slow_Dos事件'
                }
                if (eventTypeName == 'http访问控制事件') {
                    return 'HTTP访问控制事件'
                }
                if (eventTypeName == 'Webshell页面访问') {
                    return 'WebShell页面访问'
                }
                if (eventTypeName == 'web插件漏洞攻击') {
                    return 'Web插件漏洞攻击'
                }
                if (eventTypeName == 'web服务器漏洞攻击') {
                    return 'Web服务器漏洞攻击'
                }
                if (eventTypeName == 'Webshell样本上传') {
                    return 'WebShell样本上传'
                }
                return eventTypeName
            },

            /**
             * 获取【告警级别】select数据
             */
            getAlertLevel() {
                let that = this
                that.$faxios.post(that.tableDataApi, {
                    module: 'dicCommConfig',
                    matchCondition: { pcode: 'eventlog_alertlevel' }
                }).then(res => {
                    if (res.code == 200) {
                        let resultData = res.body.resultData
                        if (resultData && resultData.length > 0) {
                            that.alertLevelOptions = resultData.map((e, i) => {
                                return { label: e.name, value: e.val }
                            })
                        }
                    }
                }).catch(res => {
                    console.log(res)
                })
            },

            /**
             * 获取【数据来源】select数据
             */
            getDataSource() {
                let that = this
                that.$faxios.post(that.tableDataApi, {
                    module: 'dicCommConfig',
                    matchCondition: { pcode: 'eventlog_datasource' }
                }).then(res => {
                    if (res.code == 200) {
                        let resultData = res.body.resultData
                        if (resultData && resultData.length > 0) {
                            that.dataSourceOptions = resultData.map((e, i) => {
                                return { label: e.name, value: e.val }
                            })
                        }
                    }
                }).catch(res => {
                    console.log(res)
                })
            },
            
            /**
             * 获取【源IP所属国家】、【目的IP所属国家】select数据
             */
            getCountry() {
                let that = this
                that.$faxios.post(that.tableDataApi, {
                    module: 'dicCommConfig',
                    matchCondition: { type: 1 },
                    sortCriteria: { sort: 'asc' }
                }).then(res => {
                    if (res.code == 200) {
                        let resultData = res.body.resultData
                        if (resultData && resultData.length > 0) {
                            that.countryOptions = resultData.map((e, i) => {
                                return { label: e.name, value: e.val, code: e.code, pcode: e.pcode }
                            })
                        }
                    }
                }).catch(res => {
                    console.log(res)
                })
            },

            /**
             * 获取【源IP所属省份】、【目的IP所属省份】select数据
             */
            getProvince() {
                let that = this
                that.$faxios.post(that.tableDataApi, {
                    module: 'dicCommConfig',
                    matchCondition: { type: 2 },
                    sortCriteria: { sort: 'asc' }
                }).then(res => {
                    if (res.code == 200) {
                        let resultData = res.body.resultData
                        if (resultData && resultData.length > 0) {
                            that.provinceOptions = resultData.map((e, i) => {
                                return { label: e.name, value: e.val, code: e.code, pcode: e.pcode }
                            })
                        }
                    }
                }).catch(res => {
                    console.log(res)
                })
            },

            /**
             * 获取【IP业务平台】select数据
             */
            getBusinessPlatfrom() {
                let that = this
                that.$faxios.post(that.chartDataApi, {
                    module: 'info_plat_ip',
                    groupCriteria: 'business_platfrom',
                    matchCondition: { is_deleted: '0' }
                }).then(res => {
                    if (res.code == 200) {
                        let resultData = res.body.resultData
                        if (resultData && resultData.length > 0) {
                            that.businessPlatfromOptions = resultData.map((e, i) => {
                                let businessPlatfrom = e.business_platfrom
                                return { label: businessPlatfrom, value: businessPlatfrom }
                            })
                        }
                    } else {
                        that.$alert(res.message)
                    }
                })
            },

            /**
             * 获取【登录人】select数据
             */
            getUserName() {
                let that = this
                that.$faxios.post(that.tableDataApi, {
                    module: 'sys_security_user',
                    startPosition: 0,
                    maxResult: 1000
                }).then(res => {
                    if (res.code == 200) {
                        let resultData = res.body.resultData
                        if (resultData && resultData.length > 0) {
                            resultData.forEach(e => {
                                let userName = e.user_name
                                that.userNameOptions.push({
                                    label: userName,
                                    value: userName
                                })
                            })
                        }
                    } else {
                        console.log(res)
                    }
                }).catch(function (error) {
                    console.log(error)
                })
            },

            callFun(funName, parameters) {
                if (funName) {
                    if (parameters) {
                        this[funName](...parameters)
                    } else {
                        this[funName]()
                    }
                }
            },

            setModuleName(moduleName) {
                this.moduleName = moduleName
            }
        },

        created() {
            let that = this
            that.formItems.forEach(e => {
                if (typeof e === 'object' && e.label && e.prop) {
                    that.formData.additionalItems.push({
                        label: e.label,
                        prop: e.prop,
                        value: ''
                    })
                } else {
                    that.formData.additionalItems.push({})
                }
            })

            that.formButtons.forEach(e => {
                if (typeof e === 'object' && e.prop && e.componentType === 'switch') {
                    that.formData.additionalItems.push({
                        prop: e.prop,
                        value: false
                    })
                } else {
                    that.formData.additionalItems.push({})
                }
            })

            that.isShowSearchForm = true
        },

        mounted() {
            let that = this
            // 下面这些标识是防止重复获取的
            let eventType = true
            let alertLevel = true
            let businessPlatfrom = true
            let userName = true
            let country = true
            let province = true
            let dataSource = true
            that.formItems.forEach(e => {
                if ((e === '事件类型' || e === '工单类型') && eventType) {
                    that.getEventType()
                    eventType = false
                } else if (e === '告警级别' && alertLevel) {
                    that.getAlertLevel()
                    alertLevel = false
                } else if ((e === '源IP业务平台' || e === '目的IP业务平台') && businessPlatfrom) {
                    that.getBusinessPlatfrom()
                    businessPlatfrom = false
                } else if (e === '登录人' && userName) {
                    that.getUserName()
                    userName = false
                } else if (e === '操作人' && userName) {
                    that.getUserName()
                    userName = false
                } else if ((e === '源IP所属国家' || e === '目的IP所属国家') && province) {
                    that.getCountry()
                    country = false
                } else if ((e === '源IP所属省份' || e === '目的IP所属省份') && province) {
                    that.getProvince()
                    province = false
                } else if (e === '数据来源' && dataSource) {
                    that.getDataSource()
                    dataSource = false
                }
            })

            let newFormButtonArray = []
            let formButtons = that.formButtons
            if (formButtons && formButtons.length >= 1) {
                formButtons.forEach(e => {
                    if (e === '查询') {
                        newFormButtonArray.push({
                            type: 'primary',
                            text: '查询',
                            loading: false,
                            icon: 'el-icon-search',
                            method: function() {
                                that.$emit('query')
                            }
                        })
                    } else if (e === '重置') {
                        newFormButtonArray.push({
                            type: 'primary',
                            text: '重置',
                            icon: 'el-icon-setting',
                            method: function() {
                                that.$refs['searchForm'].resetFields()
                            }
                        })
                    } else if (e === '导入Excel' && that.$_has(that.$route.path + ':import-excel')) {
                        newFormButtonArray.push({
                            type: 'primary',
                            text: '导入Excel',
                            icon: 'el-icon-upload',
                            loading: false,
                            method: function() {
                                that.isShowImportExcelDialog = true
                            }
                        })
                    } else if (e === '导出Excel' && that.$_has(that.$route.path + ':export-excel')) {
                        newFormButtonArray.push({
                            type: 'primary',
                            text: '导出Excel',
                            icon: 'el-icon-download',
                            loading: false,
                            method: function() {
                                let index = -1
                                let formButtonArray = that.formButtonArray
                                if (formButtonArray && formButtonArray.length > 0) {
                                    for (let i = 0; i < formButtonArray.length; i++) {
                                        let text = formButtonArray[i].text
                                        if (text === '导出Excel') {
                                            index = i
                                            break
                                        }
                                    }
                                }
                                that.$emit('export-excel', index < 0 ? {} : that.formButtonArray[index])
                            }
                        })
                    } else if (typeof e === 'object') {
                        newFormButtonArray.push(e)
                    }
                })
            }
            that.formButtonArray = newFormButtonArray
        }
    }
</script>

<style>
.common_form_wrapper {
    margin: 0 10px 10px 10px;
    border: 1px solid #EBECF6;
    padding: 10px 0 0 10px;
    border-radius: 4px;
}
</style>
