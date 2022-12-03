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
import api from '@/api/mock'
import SearchForm from './searchForm.vue'
export default {
  name: 'page1',
  components: {
    SearchForm
  },
  data () {
    return {
      list0: [],
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
    api.getMockJson(3).then((res) => {
      this.list0 = res.data.body.resultData
      this.list = res.data.body.resultData
    })
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