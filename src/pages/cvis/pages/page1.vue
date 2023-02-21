<template>
  <d2-container>
    <search-form :formItems="formItems" @submit="handleSearch"></search-form>
    <el-table :data="list">
      <el-table-column label="序号" type="index" />
      <el-table-column show-overflow-tooltip v-for="(label, prop) of tableItems" :key="prop"
        :label="label" :prop="prop">
        <template slot-scope="scope">
          <span v-if="label == '明细'">
            <el-button size="mini" type="text" @click="$refs.balanceQuery.init(scope.row)">查看收支明细
            </el-button>
          </span>
          <span v-else-if="label == '提现状态'">
            {{ scope.row.status | auditStatusFilter }}
          </span>
          <span v-else>{{ scope.row[prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
import { getCommonList } from '@/api'
import SearchForm from './searchForm.vue'

const tableItemsObj = {
  page1: {
    // target: '安全日志类型',
    // deviceName: '事件级别',
    // deviceClass: '告警级别',
    // risk: '攻击类型',
    // osName: '开始时间',
    // portBanner: '结束时间',
    // shareInfo: '攻击源MAC地址',
    // protocol: '攻击源IP',
    // port: '攻击源端口',
    // serv: '攻击源城市',
    // protocol: '被攻击MAC地址',
    // isp: '被攻击IP',
    // description: '被攻击端口',
    // poc: '被攻击城市',
    // cve: '事件数据',
    // insertTime: '事件消息'

    catAttackType: '攻击类型',
    currentTime: '时间',
    destAddress: '目标地址',
    destGeoCity: '目标城市',
    destMacAddress: '目标mac地址',
    destPort: '目标端口',
    startTime: '开始时间',
    endTime: '结束时间',
    eventCount: '攻击次数',
    message: '事件消息',
    name: '事件名称',
    severity: '事件级别',
    srcAddress: '源地址',
    srcGeoCity: '源城市',
    srcMacAddress: '源mac地址',
    srcPort: '源端口',
    thresholdRange: '告警级别'
  }
}
export default {
  name: 'page1',
  components: {
    SearchForm
  },
  computed: {
    tableItems () {
      return tableItemsObj[this.$route.name] || {}
    }
  },
  data () {
    return {
      list0: [],
      list: [],
      formItems: [
        {
          label: '攻击类型',
          prop: 'target',
          type: 'input'
        },
        {
          label: '端口',
          prop: 'port',
          type: 'input'
        }
      ]
    }
  },
  mounted () {
    getCommonList({ module: 'tsgz5_dp' }).then(
      (res) => (this.list = res.resultData)
    )
  },
  methods: {
    handleSearch (e) {
      console.log(e)
      if (!e.port && !e.target) return (this.list = this.list0)

      this.list = this.list0.filter(
        (item) => item.port == e.port || item.target == e.target
      )
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
</style>