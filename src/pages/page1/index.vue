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
        deviceName: '设备名称',
        deviceClass: '设备类型',
        mac: 'MAC地址',
        osName: '操作系统',
        portBanner: '端口banner信息',
        serv: '服务',
        protocol: '协议',
        product: '产品(组件)',
        productVersion: '产品版本',
        isp: '服务端',
        port: '端口',
        label: '标签',
        title: '标题',
        country: '国家',
        province: '省份',
        city: '市'
      }
    }
  },
  mounted () {
    api.getMockJson().then((res) => {
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