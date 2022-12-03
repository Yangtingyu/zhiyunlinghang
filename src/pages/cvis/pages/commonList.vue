<template>
  <div>
    <search-form :formItems="formItems" @submit="handleSearch"></search-form>

    <el-row style="padding:20px">
      <el-col :span="12">
        <span class="demonstration">查询时间: </span>
        <el-date-picker size="mini" v-model="value1" type="datetimerange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-col>
      <el-col :span="12" style="text-align:right">
        <el-button type="primary" size="small" plain icon="el-icon-aim">会话关注</el-button>
        <el-button type="primary" size="small" plain>事件标注</el-button>
        <el-button type="primary" size="small" plain>导出CSV</el-button>
        <el-button type="primary" size="small" plain>勾选导出PCAP</el-button>
        <el-button type="primary" size="small" plain>全部导出PCAP</el-button>
        <el-button type="primary" size="small" plain icon="el-icon-setting">自定义列</el-button>
        <el-button type="primary" size="small" plain>创建任务</el-button>
      </el-col>
    </el-row>

    <el-table :data="list" style="width:100%" size="mini" stripe>
      <el-table-column label="序号" type="index" />
      <el-table-column show-overflow-tooltip v-for="(label, prop) of tableItems" :key="prop"
        :label="label.split('|')[0]" :prop="prop" :width="label.split('|')[1]+'px' || 'auto'">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from '@/api/mock'
import SearchForm from './searchForm.vue'
const typeArr = [
  '敏感数据明文存储或传输 ',
  '未授权调用数据共享接口 ',
  '数据泄露',
  '数据完整性非法篡改 ',
  '数据操作行为基线偏离',
  '敏感数据未纳入金库管控',
  '数据共享接口未经备案',
  '数据所在资产脆弱性事件',
  '其他'
]
export default {
  props: {
    typeName: {
      type: String,
      default: 'data'
    }
  },
  components: {
    SearchForm
  },
  data () {
    return {
      value1: '',
      list0: [],
      list: [],
      formItems: [
        {
          label: '链路',
          prop: 'route',
          type: 'select',
          options: [
            {
              label: '物理链路1',
              value: 1
            },
            {
              label: '物理链路2',
              value: 2
            },
            {
              label: '物理链路3',
              value: 3
            },
            {
              label: '物理链路4',
              value: 4
            }
          ]
        },
        {
          label: '日志类型',
          prop: 'logType',
          type: 'select',
          options: [
            {
              label: '安全事件',
              value: 1
            },
            {
              label: '威胁拦截日志',
              value: 2
            }
          ]
        }
      ],
      tableItems: {
        startdate: '发生时间|288',
        rule_id: '规则ID|138',
        rule_desc: '规则描述|208',
        rule_class: '规则大类|208',
        rule_subclass: '规则小类|100',
        warn_level: '危害等级|100',
        attack_status: '攻击状态|100',
        sip: '源IP地址|100',
        sport: '源端口|60',
        dip: '目的IP地址|100',
        dport: '目的端口|100',
        url: 'url|200',
        ctrl: '控制端|80',
        ul_throughput: '上行流量|100',
        dl_throughput: '下行流量|100',
        ul_packets: '上行数据包|100',
        dl_packets: '下行数据包|100',
        useragent: 'UA|60',
        device_name: '设备名称|80',
        black_ip: '是否黑IP|120',
        black_ip_desc: '黑IP描述|120',
        black_domain: '黑域名|160',
        black_domain_desc: '黑域名描述|200',
        json_exports: '规则中json导出字段|200',
        l4_proto: '4层协议类型|100',
        local_protocol_type: '本地协议类型|100',
        ip_address_type: 'IP地址类型|100',
        rcode: '返回状态码|60',
        sip_asset: '源IP内网资产|60',
        dip_asset: '目的IP内网资产|100',
        id: 'id|120',
        db_name: '数据库名|100'
        // ctrl_original: '',
        // black_domain_original: 0,
        // l4_proto_original: 6,
        // rule_class_original: '23',
        // local_protocol_type_original: 913,
        // black_ip_original: 0,
        // dip_asset_original: 0,
        // rule_subclass_original: '102',
        // ip_address_type_original: 0,
        // sip_asset_original: 1,
        // attack_status_original: 1,
        // warn_level_original: 1
      }
    }
  },
  mounted () {
    const { typeName } = this
    api.getMockJson('event').then((res) => {
      this.list0 = res.data.body.resultData
      this.list =
        typeName == 'event'
          ? this.list0
          : this.list0.map((item) => {
            const index = Math.floor(Math.random() * typeArr.length)
            return {
              ...item,
              rule_class:
                  typeName === 'data' ? typeArr[index] : item.rule_class,
              rule_subclass: typeName === 'data' ? item.rule_subclass : 'N/A'
            }
          })
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