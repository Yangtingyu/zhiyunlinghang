<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div :style="tableWrapperStyle" style="margin-left: 10px; margin-right: 10px;">
                    <el-table
                        v-if="showTable"
                        ref="tableData"
                        :data="tableData"
                        size="small"
                        stripe
                        border
                        v-loading="listLoading"
                        :height="tabelHeight"
                        :header-cell-style="headerCellStyle"
                        @selection-change="handleSelectionChange"
                        style="width: 100%; "
                    >
                        <el-table-column v-if="hasSelect" type="selection" width="35" />
                        <el-table-column fixed="left" label="序号" type="index" width="45" />
                        <el-table-column
                            v-for="(tableHeadInfo, index) in tableHeadDataVisible"
                            :key="index"
                            :prop="tableHeadInfo.prop"
                            :label="tableHeadInfo.label"
                            show-overflow-tooltip
                            :width="getWidth(tableHeadInfo.width, tableHeadInfo.label)"
                        >
                            <template slot-scope="scope">
                                <el-popover
                                    :placement="tableHeadInfo.placement ? tableHeadInfo.placement : 'top-start'"
                                    trigger="hover"
                                >
                                    <div class="table-popover">
                                        {{ tableHeadInfo.frontFormatterName
                                            ? formatValue(tableHeadInfo.frontFormatterName, scope.row, scope.column, scope.row[tableHeadInfo.prop]) : scope.row[tableHeadInfo.prop] }}
                                    </div>
                                    <span slot="reference">
                                        {{ tableHeadInfo.frontFormatterName
                                            ? formatValue(tableHeadInfo.frontFormatterName, scope.row, scope.column, scope.row[tableHeadInfo.prop]) : scope.row[tableHeadInfo.prop] }}
                                    </span>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column
                            v-if="tableButtons && tableButtons.length > 0"
                            fixed="right"
                            label="操作"
                            min-width="100"
                            :width="listButtonWidth"
                        >
                            <template slot-scope="scope">
                                <el-button
                                    v-for="(tableButton, index) in tableButtons"
                                    :key="index"
                                    @click="handleButtonClick(tableButton.method, scope.row)"
                                    :type="tableButton.type"
                                    :size="tableButton.size"
                                    :style="tableButton.style"
                                >
                                    {{ tableButton.text }}
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col :span="24" class="pagination-footer">
                <el-pagination
                    v-if="device==='mobile'"
                    background
                    layout="prev, pager, next"
                    :total="pagination.total"
                    @current-change="handleCurrentChange"
                    style="padding: 10px;"
                />
                <el-pagination
                    v-else
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagination.currentPage"
                    :page-sizes="[ 2, 20, 50, 100 ]"
                    :page-size="pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total"
                    style="padding: 10px;"
                />
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'common-table',

        props: {
            module: {
                type: String,
                default: ''
            },

            tableDataApi: {
                type: String,
                default: '/service/monitoring-query/dataanalysiscommon/list'
            },

            tableHead: {
                type: Array,
                default: function() {
                    return []
                }
            },

            tableButtons: {
                type: Array,
                default: function() {
                    return []
                }
            },

            formatters: {
                type: Object,
                default: function() {
                    return {}
                }
            },

            pageSize: {
                type: Number,
                default: 20
            },

            getTableParams: {
                type: Function
            },

            formatListData: {
                type: Function
            },

            tabelHeight: {
                type: Number,
                default: null
            },

            hasSelect: {
                type: Boolean,
                default: true
            },

            tableWrapperStyle: {
                type: Object,
                default: function() {
                    return { 'margin-left': '10px', 'margin-right': '10px' }
                }
            },

            headerCellStyle: {
                type: Object,
                default: function() {
                    return { background: '#1060a3', color: '#fff' }
                }
            },
            
            notInitTableData: {
                type: Boolean,
                default: false
            },

            notInitTableHead: {
                type: Boolean,
                default: false
            },
            
            notAutoWidth: {
                type: Boolean,
                default: false
            },

            isGet: {
                type: Boolean,
                default: false
            }
        },
        
        data() {
            let that = this
            let initTableHead = that.tableHead
            let initPageSize = that.pageSize

            return {
                moduleName: that.module,
                showTable: false,
                tableData: [],
                listLoading: false,
                tableHeadData: initTableHead,
                pagination: { currentPage: 1, pageSize: initPageSize, total: 0 }
            }
        },

        methods: {
            formatValue(frontFormatterName, row, column, value) {
                let formatters = this.formatters
                if (!formatters) {
                    return value
                }
                let formatter = formatters[frontFormatterName]
                if (!formatter) {
                    return value
                }
                return formatter(value, column, row)
            },

            // 选择复选框事件，直接抛出同名事件
            handleSelectionChange(val) {
                this.$emit('selection-change', val)
            },

            getWidth(width, str) {
                let that = this
                if (width) {
                    return width
                }
                if (that.notAutoWidth) {
                    return null
                }
                return that.calculateWidth(width, str)
            },

            calculateWidth(width, str) {
                let that = this
                if (!str) {
                    return 80
                }
                return that.getByteLength(str) * 6.2 + 30
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
            },

            getTableHeadData() {
                return this.tableHeadData
            },

            setTableData(newTableData) {
                this.tableData = newTableData
            },

            getTableData() {
                return this.tableData;
            },

            getPagination() {
                return this.pagination
            },

            setTableHead(tableHeadData) {
                that.tableHeadData = tableHeadData
            },

            getTableHeadInternal() {
                let that = this
                // 如果父组件已通过prop传入了表头初始值，则不去后端获取表头
                let tempTableHead = that.tableHead
                if ((tempTableHead && tempTableHead.length > 0) || !that.moduleName) {
                    that.showTable = true
                } else {
                    that.$faxios.post('/service/monitoring-query/dataanalysiscommon/list', {
                        module: 'init-table-head',
                        matchCondition: { moudle: that.moduleName },
                        startPosition: 0,
                        maxResult: 1
                    }).then(res => {
                        if (res.code == 200) {
                            let resultData = res.body.resultData
                            if (resultData && resultData.length > 0) {
                                let tableInfo = resultData[0].table_info
                                
                                if (tableInfo) {
                                    that.tableHeadData = JSON.parse(tableInfo)
                                    that.showTable = true
                                    // 抛出事件，让父组件可以获取表头信息
                                    that.$emit('after-get-table-head', that.tableHeadData)
                                }
                            }
                        }
                    })
                }
            },

            getListDataInternal() {
                let that = this
                that.listLoading = true
                let getTableParams = that.getTableParams
                let option = getTableParams ? getTableParams() : {}
                let pageSize = that.pagination.pageSize
                let param = {
                    module: that.moduleName,
                    startPosition: (that.pagination.currentPage - 1) * pageSize,
                    maxResult: pageSize,
                    ...option
                }
                let isGet = that.isGet
                if (!isGet && that.moduleName) {
                    param.module = that.moduleName
                }
                let promise = (isGet ? that.$axios.get(that.tableDataApi, { params: param })
                    : that.$faxios.post(that.tableDataApi, param))
                return promise.then(res => {
                    if (res.code == 200) {
                        let resultData = res.body.resultData
                        if ((!resultData || resultData.length < 1) && that.pagination.currentPage > 1) {
                            /**
                             * 页码大于1，并且表格数据返回0长度时，尝试获取前一页数据
                             * 修复场景：删除非第一页的最后一条数据后，无法跳转有效数据页
                             */
                            that.pagination.currentPage -= 1
                            that.getListDataInternal()
                        } else {
                            let tableData = resultData ? resultData : []
                            let formatListData = that.formatListData
                            let newTableData = formatListData ? formatListData(tableData) : tableData
                            that.setTableData(newTableData)
                            that.pagination.total = res.body.totalRecord
                            // 抛出事件，让父组件可以监听列表查询成功事件
                            that.$emit('get-table-data-success', newTableData)
                        }
                    } else {
                        that.tableData = []
                    }
                }).catch(function (error) {
                    console.log(error)
                }).then(() => {
                    that.listLoading = false
                })
            },

            getTableDataByPage(page) {
                let that = this
                if (!that.listLoading) {
                    that.pagination.currentPage = page
                    return that.getListDataInternal()
                }
            },

            getTableHeadAndDataByPage(page) {
                let that = this
                // 如果父组件已通过prop传入了表头初始值，则不去后端获取表头
                let tempTableHead = that.tableHead
                if ((tempTableHead && tempTableHead.length > 0) || !that.moduleName) {
                    that.showTable = true
                } else {
                    that.$faxios.post(that.tableDataApi, {
                        module: 'init-table-head',
                        matchCondition: { moudle: that.moduleName },
                        startPosition: 0,
                        maxResult: 1
                    }).then(res => {
                        if (res.code == 200) {
                            let resultData = res.body.resultData
                            if (resultData && resultData.length > 0) {
                                let tableInfo = resultData[0].table_info
                                
                                if (tableInfo) {
                                    that.tableHeadData = JSON.parse(tableInfo)
                                    that.showTable = true
                                    // 抛出事件，让父组件可以获取表头信息
                                    that.$emit('after-get-table-head', that.tableHeadData)
                                    if (!that.listLoading) {
                                        that.pagination.currentPage = page
                                        that.getListDataInternal()
                                    }
                                }
                            }
                        }
                    })
                }
            },

            format(frontFormatterName, row, column, value) {
                this.$emit(frontFormatterName, row, column, value)
            },

            handleButtonClick(method, row) {
                if (!method) {
                    return
                }
                method(row)
            },

            handleSizeChange(val) {
                let that = this
                that.pagination.pageSize = val
                that.getListDataInternal()
            },

            handleCurrentChange(val) {
                let that = this
                that.pagination.currentPage = val
                that.getListDataInternal()
            },

            setModuleName(moduleName) {
                this.moduleName = moduleName
            }
        },

        computed: {
            ...mapState({
                device: state => state.d2admin.device
            }),

            listButtonWidth() {
                let tableButtonLength = this.tableButtons.length
                return tableButtonLength * 60
            },

            tableHeadDataVisible() {
                return this.tableHeadData.filter((col) => {
                    return !(col.hide);
                })
            }
        },

        mounted() {
            let that = this
            if (!that.notInitTableHead) {
                that.getTableHeadInternal()
            }
            if (!that.notInitTableData) {
                that.getListDataInternal()
            }
        }
    }
</script>

<style>
.theme-dark-blue .el-table-column--selection .cell {
    padding-right: 10px !important;
}
</style>
