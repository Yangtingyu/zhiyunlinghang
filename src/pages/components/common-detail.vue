<template>
    <el-dialog title="详情" :visible.sync="visible" :width="detailWidth" center>
        <div class="editDialogContainer">
            <el-row>
                <el-form :model="detailData" :inline="true" :label-width="labelWidth">
                    <el-form-item
                        v-for="(column, index) in _columns"
                        :key="index"
                        :label="column.label + ':'"
                        :prop="column.prop"
                        :style="{ 'margin-bottom': 0, 'border-bottom': '1px dotted' }"
                    >
                        <el-input
                            v-if="isTextarea(column, detailData[column.prop])"
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 10}"
                            v-model="detailData[column.prop]"
                            :style="{ width: '485px' }"
                        />
                        <div v-else :style="{ width: '485px' }">
                            {{ getValue(column, detailData) }}
                        </div>
                    </el-form-item>
                </el-form>
            </el-row>
            <slot></slot>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'common-table',

        props: {
            formatters: {
                type: Object,
                default: function() {
                    return {}
                }
            },

            columns: {
                type: Array,
                default: function() {
                    return []
                }
            },

            detailWidth: {
                type: String,
                default: '750px'
            },
            
            labelWidth: {
                type: String,
                default: '200px'
            },

            placeholder: {
                type: String,
                default: '计算中...'
            }
        },
        
        data() {
            return {
                visible: false,
                detailData: {},
                additionalColumns: []
            }
        },

        methods: {
            getValue(column, detailData) {
                let formatter = column.formatter
                let originalValue = detailData[column.prop]
                if (formatter) {
                    return formatter(detailData, originalValue)
                }
                let frontFormatterName = column.frontFormatterName
                if (frontFormatterName) {
                    let formatters = this.formatters
                    if (!formatters) {
                        return originalValue
                    }
                    let formatter = formatters[frontFormatterName]
                    if (!formatter) {
                        return originalValue
                    }
                    return formatter(originalValue, column)
                }
                return originalValue
            },

            /**
             * 打开详情弹框
             * 
             * @param {Object} detailData 详情数据
             * @param {Boolean} isGetPrivateField 是否为不同数据源的事件获取对应的专有字段数据
             * @param {Array} additionalColumns 额外的详情项目
             */
            openDetail(detailData, isGetPrivateField, additionalColumns) {
                let that = this
                that.detailData = { ...detailData }
                that.additionalColumns = []
                if (additionalColumns && additionalColumns.length > 0) {
                    that.additionalColumns = [].concat(additionalColumns)
                }
                if (isGetPrivateField) {
                    let detailModule = that.addDetailColumn()
                    that.visible = true
                    let param = {
                        module: detailModule,
                        matchCondition: { id: detailData.id }
                    }
                    let eventdate = detailData.eventdate
                    if (eventdate) {
                        param.intervalCondition = {
                            eventdate: [ eventdate, eventdate ]
                        }
                    }
                    that.$faxios.post('/service/monitoring-query/dataanalysiscommon/list', param).then(res => {
                        if (res.code == 200 && res.body && res.body.resultData && res.body.resultData.length > 0) {
                            let privateFieldData = res.body.resultData[0]
                            let tempData = { ...that.detailData }
                            for (let key in privateFieldData) {
                                if (!tempData[key] || tempData[key] == that.placeholder) {
                                    tempData[key] = privateFieldData[key] ? privateFieldData[key] : ''
                                }
                            }
                            that.detailData = tempData
                        } else {
                            console.log('else >>> res', res)
                        }
                    }).catch(res => {
                        console.log('catch >>> res', res)
                    }).then(() => {
                        that.clearPlaceholder()
                    })
                } else {
                    that.visible = true
                }
            },

            // 清除占位符
            clearPlaceholder() {
                let that = this
                let tempData = { ...that.detailData }
                for (let key in tempData) {
                    if (tempData[key] == that.placeholder) {
                        tempData[key] = ''
                    }
                }
                that.detailData = tempData
            },

            /**
             * 1.根据数据来源添加详情弹框中的显示项
             * 2.把添加项的值填上占位符“计算中...”
             * 3.返回查找对应数据要用到的module
             */
            addDetailColumn() {
                let that = this
                let datasource = that.detailData.datasource
                let detailModule = ''
                switch (datasource) {
                    case '流量安全设备':
                        detailModule = 'jinjing'
                        that.setDataForDetail('reportid', '规则id')
                        that.setDataForDetail('name', '规则描述')
                        that.setDataForDetail('dataHex', '数据包内容')
                        break
                    case 'WAF安全设备':
                        detailModule = 'waf_log_websec'
                        that.setDataForDetail('method', 'HTTP请求方法', function(value) {
                            if (value == '2') {
                                return 'GET'
                            }
                            if (value == '4') {
                                return 'HEAD'
                            }
                            if (value == '8') {
                                return 'POST'
                            }
                            if (value == '16') {
                                return 'PUT'
                            }
                            if (value == '32') {
                                return 'DELETE'
                            }
                            if (value == '64') {
                                return 'MKCOL'
                            }
                            if (value == '128') {
                                return 'COPY'
                            }
                            if (value == '256') {
                                return 'MOVE'
                            }
                            if (value == '512') {
                                return 'OPTIONS'
                            }
                            if (value == '1024') {
                                return 'PROPFIND'
                            }
                            if (value == '2048') {
                                return 'PROPPATCH'
                            }
                            if (value == '4096') {
                                return 'LOCK'
                            }
                            if (value == '8192') {
                                return 'UNLOCK'
                            }
                            if (value == '16384') {
                                return 'TRACE'
                            }
                            if (value == '32768') {
                                return 'SEARCH'
                            }
                            if (value == '65536') {
                                return 'CONNECT'
                            }
                            if (value == '131072') {
                                return 'PATCH'
                            }
                            if (value == '262144') {
                                return 'VERSION_CONTROL'
                            }
                            if (value == '524288') {
                                return 'CHECKOUT'
                            }
                            if (value == '1048576') {
                                return 'UNCHECKOUT'
                            }
                            if (value == '2097152') {
                                return 'CHECKIN'
                            }
                            if (value == '4194304') {
                                return 'UPSTRING'
                            }
                            if (value == '8388608') {
                                return 'LABEL'
                            }
                            if (value == '16777216') {
                                return 'REPORT'
                            }
                            if (value == '33554432') {
                                return 'MKWORKSPACE'
                            }
                            if (value == '67108864') {
                                return 'MKACTIVITY'
                            }
                            if (value == '134217728') {
                                return 'BASELINE_CONTROL'
                            }
                            if (value == '268435456') {
                                return 'MERGE'
                            }
                            return 'UNKNOWN'
                        })
                        that.setDataForDetail('domain', '域名字段')
                        that.setDataForDetail('uri', 'URL路径字段')
                        that.setDataForDetail('event_type', '告警类型')
                        that.setDataForDetail('policy_id', '触发告警的策略ID')
                        that.setDataForDetail('rule_id', '触发告警的规则ID')
                        that.setDataForDetail('action', '策略动作', function(value) {
                            if (value == 'Other' || value == 'Forward') {
                                return '放过'
                            }
                            if (value == 'Block') {
                                return '阻断'
                            }
                            if (value == 'Accept') {
                                return '接受'
                            }
                            if (value == 'Redirect') {
                                return '重定向'
                            }
                            if (value == 'Pretend') {
                                return '伪装'
                            }
                            if (value == 'Set') {
                                return '设定'
                            }
                            if (value == 'Clear') {
                                return '清除'
                            }
                            if (value == 'Replace') {
                                return '替换'
                            }
                            return ''
                        })
                        that.setDataForDetail('block', '是否启用ip封禁', function(value) {
                            if (value == 'No') {
                                return '不启用'
                            }
                            if (value == 'Yes') {
                                return '启用'
                            }
                            return ''
                        })
                        that.setDataForDetail('http', 'HTTP请求或响应信息')
                        that.setDataForDetail('alertinfo', '告警补充描述')
                        that.setDataForDetail('proxy_info', 'HTTP X-forward-for部分')
                        that.setDataForDetail('charaters', '攻击字符')
                        that.setDataForDetail('count_num', '匹配次数')
                        that.setDataForDetail('protocol_type', 'Web访问协议类型')
                        that.setDataForDetail('wci', '浏览器识别')
                        that.setDataForDetail('wsi', 'WAF会话识别')
                        that.setDataForDetail('country', '客户端IP归属')
                        that.setDataForDetail('correlation_id', '访问日志与安全日志关联ID')
                        that.setDataForDetail('site_name', '站点名称')
                        that.setDataForDetail('vsite_name', '虚拟站点名称')
                        that.setDataForDetail('tag', '日志信息头')
                        break
                    case 'DDOS攻击日志':
                        detailModule = 'waf_log_ddos'
                        that.setDataForDetail('action', '动作')
                        that.setDataForDetail('tag', '日志信息头')
                        break
                    case '防篡改日志':
                        detailModule = 'waf_log_deface'
                        that.setDataForDetail('url', '篡改网址')
                        that.setDataForDetail('reason', '篡改原因')
                        that.setDataForDetail('tag', '日志信息头')
                        break
                    case 'IDS安全设备':
                        detailModule = 'idc_ips_intrusion_prevention'
                        that.setDataForDetail('breaking_sighn', '是否阻断', function(value) {
                            if (value == '1') {
                                return '阻断'
                            }
                            return '未阻断'
                        })
                        that.setDataForDetail('user', '用户')
                        that.setDataForDetail('proto', '协议信息')
                        that.setDataForDetail('attack', '攻击类型', function(value) {
                            if (value == '16') {
                                return '拒绝服务类攻击'
                            }
                            if (value == '32') {
                                return '获取权限类攻击'
                            }
                            if (value == '48') {
                                return '信息收集类攻击'
                            }
                            if (value == '64') {
                                return '可疑网络活动类'
                            }
                            if (value == '80') {
                                return '网络监控类功能'
                            }
                            return ''
                        })
                        that.setDataForDetail('os', '操作系统')
                        that.setDataForDetail('service', '服务类型', function(value) {
                            if (value == '1048576') {
                                return 'WWW'
                            }
                            if (value == '2097152') {
                                return 'CGI'
                            }
                            if (value == '3145728') {
                                return 'FTP'
                            }
                            if (value == '4194304') {
                                return 'TELNET'
                            }
                            if (value == '5242880') {
                                return 'POP'
                            }
                            if (value == '6291456') {
                                return 'NETBIOS'
                            }
                            if (value == '7340032') {
                                return 'SSH'
                            }
                            if (value == '8388608') {
                                return 'SMTP'
                            }
                            if (value == '9437184') {
                                return 'IMAP'
                            }
                            if (value == '10485760') {
                                return 'DNS'
                            }
                            if (value == '11534336') {
                                return 'TFTP'
                            }
                            if (value == '12582912') {
                                return 'Finger'
                            }
                            if (value == '13631488') {
                                return 'Kerberos'
                            }
                            if (value == '14680064') {
                                return 'LinuxConf'
                            }
                            if (value == '15728640') {
                                return 'LDAP'
                            }
                            if (value == '16777216') {
                                return 'SunRPC'
                            }
                            if (value == '18874368') {
                                return 'RSH'
                            }
                            if (value == '19922944') {
                                return 'RLogin'
                            }
                            if (value == '20971520') {
                                return 'SQL'
                            }
                            if (value == '22020096') {
                                return 'LPD'
                            }
                            if (value == '23068672') {
                                return 'IRC'
                            }
                            if (value == '24117248') {
                                return 'IdentD'
                            }
                            if (value == '25165824') {
                                return 'RSync'
                            }
                            if (value == '26214400') {
                                return 'SNMP'
                            }
                            if (value == '27262976') {
                                return 'Radius'
                            }
                            if (value == '28311552') {
                                return 'Samba'
                            }
                            if (value == '29360128') {
                                return 'CVS'
                            }
                            if (value == '30408704') {
                                return 'DHCP'
                            }
                            if (value == '31457280') {
                                return 'News'
                            }
                            if (value == '32505856') {
                                return 'Misc'
                            }
                            return ''
                        })
                        that.setDataForDetail('pop', '流行程度', function(value) {
                            if (value == '12') {
                                return '高'
                            }
                            if (value == '8') {
                                return '中'
                            }
                            if (value == '4') {
                                return '低'
                            }
                            return ''
                        })
                        that.setDataForDetail('event_id', '事件id')
                        that.setDataForDetail('event_desc', '事件描述')
                        that.setDataForDetail('event_type', '事件类型')
                        break
                    case '数据安全设备':
                        detailModule = 'dataleakageinfo'
                        that.setDataForDetail('data_type', '日志类型', function(value) {
                            if (value == '8') {
                                return '邮件日志'
                            }
                            if (value == '9') {
                                return 'HTTP/HTTPS日志'
                            }
                            if (value == '10') {
                                return 'FTP日志'
                            }
                            if (value == '11') {
                                return 'Web邮件日志'
                            }
                            if (value == '12') {
                                return '文件共享日志'
                            }
                            if (value == '13') {
                                return '即时通讯日志'
                            }
                            return ''
                        })
                        that.setDataForDetail('uuid', '样本uuid文件名')
                        that.setDataForDetail('filename', '响应动作')
                        that.setDataForDetail('result', '样本原始文件名')
                        that.setDataForDetail('protocoltype', '协议类型')
                        that.setDataForDetail('gatewaytype', '网关类型')
                        that.setDataForDetail('keyword', '涉密特征')
                        that.setDataForDetail('occurtime', '上报时间')
                        that.setDataForDetail('gateway_ip', '网关引擎ip')
                        break
                }
                return detailModule
            },

            setDataForDetail(prop, label, formatter) {
                let that = this
                let column = { prop, label }
                if (formatter) {
                    column.formatter = formatter
                }
                that.additionalColumns.push(column)
                if (that.detailData && !that.detailData[prop]) {
                    that.detailData[prop] = that.placeholder
                }
            },

            /**
             * 根据值的字节长度来决定是否使用textarea来展示
             */
            isTextarea(column, value) {
                if (!value) {
                    return false
                }
                value = column.formatter ? column.formatter(value) : value
                return this.getByteLength(value) > 500
            },

            getByteLength(str) {
                let bytesCount = 0
                for (let i = 0; i < str.length; i++) {   
                    let c = str.charAt(i)   
                    if (/^[\u0000-\u00ff]$/.test(c)) {
                        if (/^[A-Z]$/.test(c)) {
                            bytesCount += 1.3
                        } else {
                            bytesCount += 1
                        }
                    } else {
                        bytesCount += 2
                    }
                }
                return bytesCount
            }
        },

        computed: {
            _columns: function() {
                let that = this
                let initColumns = [].concat(that.columns)
                return initColumns.concat(that.additionalColumns)
            }
        }
    }
</script>

<style scoped>

</style>
