<template>
  <div class="g_tableBox_seamless_scroll" :class="[theme]">
    <div class="clw_tab">
      <h4 class="g_tableTile">
        <table cellspacing="0" style="table-layout: auto;">
          <tr class="table_h">
            <td v-for="(item,index) in fieldInfo" :key="index" :style="`width:${item.width}px;`">
              {{item.name}}
            </td>
            <!--<td style="width:115px;">物联网卡号</td>
            &lt;!&ndash;<td style="width:135px;">平台名称</td>&ndash;&gt;
            <td style="width:135px;">平台域名</td>
            <td style="width:115px;">终端型号</td>
            <td style="width:115px;">事件名称</td>
            <td style="width: 120px;">地市</td>-->
          </tr>
        </table>
      </h4>
      <vue-seamless-scroll
          :data="data"
          class="seamless-warp"
          :class-option="seamlessScrollOption"
          :style="{height: height.replace(/[^0-9]/ig,'')-50 + 'px'}"
      >
        <ul>
          <li v-for="(dataItem,index) in data" :key="index" class="g_tableFirst">
                    <span v-for="(fieldItem, fieldIndex) in fieldInfo"
                          @click="clickData(dataItem[fieldItem.field])"
                          :key="fieldIndex"
                          :style="`width:${fieldItem.width}px;`"
                          :title="dataItem[fieldItem.field]"
                          :class="fieldItem.name==clickName?'clickName':''"
                    >{{dataItem[fieldItem.field]}}</span>
          </li>
          <!--<li v-for="(item, index) in dataList" :key="index">
              &lt;!&ndash;v-show="index < 5"&ndash;&gt;
              <span style="width:180px;" :title="item.starttime">{{item.value0}}</span>
              <span style="width:115px;" :title="item.phone">{{ item.value1 }}</span>
              <span style="width:135px;" :title="item.url_domain">{{ item.value3 }}</span>
              <span style="width:115px;" :title="item.brand">{{ item.value4 }}</span>
              <span style="width:115px;" :title="item.rule_class_name">{{item.value5 }}</span>
              <span style="width: 120px;" :title="item.rac_name">{{ item.value6 }}</span>
          </li>-->
        </ul>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  name: "zebra-seamless-scroll-component",
  components: {
    vueSeamlessScroll
  },
  props: {
    height: {
      type: String,
      default: "217px"
    },
    option: {
      type: Object
    },
    enableNumberCol: {
        type: Boolean,
        default: false
    },
    theme: {
      type: String,
      default: "green"
    },

    clickName: {
      type: String,
      default: ""
    },
    /**
     * 字段定义
     */
    fieldInfo: {
      type: Array,
      default: function () {
        return [
          {
            name: '行业',
            field: 'hangye',
            width: 80
          },
          {
            name: '总数',
            field: 'total',
            width: 90
          }
        ]
      }
    },
    data: {
      type: Array,
      default: function () {
        return  [
          {
            "value6": "常德",
            "value5": "Web攻击",
            "value2": "",
            "value1": "1064690664561",
            "createTime": 1578392756443,
            "sqlKey": "caiot_vehicle_attack_rolling",
            "appId": 0,
            "value3": "120.25.230.12",
            "alias": "湖南省车联网专题-安全事件实时播报",
            "value0": "1578390476212",
            "updateTime": 1578392756443,
            "id": 3671
          },
          {
            "value6": "常德",
            "value5": "Web攻击",
            "value2": "",
            "value1": "1064690664561",
            "createTime": 1578392756443,
            "sqlKey": "caiot_vehicle_attack_rolling",
            "appId": 0,
            "value3": "120.25.230.12",
            "alias": "湖南省车联网专题-安全事件实时播报",
            "value0": "1578390093280",
            "updateTime": 1578392756443,
            "id": 3672
          },
          {
            "value6": "永州",
            "value5": "Web攻击",
            "value2": "",
            "value1": "1064646016410",
            "createTime": 1578392756443,
            "sqlKey": "caiot_vehicle_attack_rolling",
            "appId": 0,
            "value3": "www.dorylist.com",
            "alias": "湖南省车联网专题-安全事件实时播报",
            "value0": "1578389607207",
            "updateTime": 1578392756443,
            "id": 3673
          },
          {
            "value6": "永州",
            "value5": "Web攻击",
            "value2": "",
            "value1": "1064646016410",
            "createTime": 1578392756443,
            "sqlKey": "caiot_vehicle_attack_rolling",
            "appId": 0,
            "value3": "www.dorylist.com",
            "alias": "湖南省车联网专题-安全事件实时播报",
            "value0": "1578389606776",
            "updateTime": 1578392756443,
            "id": 3674
          },
          {
            "value6": "永州",
            "value5": "Web攻击",
            "value2": "",
            "value1": "1064646016410",
            "createTime": 1578392756443,
            "sqlKey": "caiot_vehicle_attack_rolling",
            "appId": 0,
            "value3": "www.dorylist.com",
            "alias": "湖南省车联网专题-安全事件实时播报",
            "value0": "1578389530502",
            "updateTime": 1578392756443,
            "id": 3675
          }
        ]
      }
    }
  },
  computed: {
    seamlessScrollOption () {
      let singleHeight = 36
      let totalHeight = this.height.replace(/[^0-9]/ig,'')-50
      let limitMoveNum = totalHeight / singleHeight
      console.log('当前无缝滚动的开启滚动数据量（即表格多大数目时刚好占满容器）：', limitMoveNum)
      return {
        ...{
          singleHeight: singleHeight,
          waitTime: 2500,
          limitMoveNum: limitMoveNum // 开启无缝滚动的数据量，默认值5
        },
        ...this.option
      }
    }
  },
  methods:{
    clickData(e){
      this.$emit('clickData',e)
    }
  }
}
</script>

<style lang="scss" scoped>
$fontColor: #a8e2ea;
$headerBgColor: #053c4b87;

ul,li {
  margin: 0;
  padding: 0;
}

/* 无缝滚动样式 */
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
   .clickName{
     cursor:pointer;
      &:hover{
      color: #c0f5fc;
    }
   }
}
.seamless-warp ul li {
  height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: space-around;
  text-align: center;
  color: $fontColor;
  border-bottom: 1px solid #2592e1;
  font-size: 14px;
  border-image: linear-gradient(to right, rgba(255, 255, 255, 0), #3c647e, rgba(255, 255, 255, 0)) 30 60 90
}
// 朴素版
.g_tableBox_seamless_scroll.plain .seamless-warp ul li {
  color: whitesmoke;
}

.seamless-warp ul li span{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}


.clw_tab {
  margin-top: 0px;
}

.clw_tab .g_tableTile {
  height: 35px;
}

.clw_tab .g_tableCon {
  height: 272px;
  margin-top: 5px;
}

.clw_tab table tr,
.clw_tab .g_tableCon table tr {
  height: 35px;
}

.clw_tab .g_tableCon table tr {
  background-color: rgba(28,170,252,0.3) !important;
}

.clw_tab .g_tableCon table tr td {
  border: none;
}


.g_tableBox_seamless_scroll {
  position: relative;
  left: 0px;
  top: 0px;
  width: 900px;
  z-index: 1;
}

.g_tableBox_seamless_scroll .g_tableTile {
  box-sizing: border-box;
  border-bottom: 1px solid #149cc6;
  font-weight: bold;
  font-size: 14px;
  color: rgb(189, 250, 255);
  height: 44px;
  line-height: 44px;
  margin: 0;
}
// 朴素版
.g_tableBox_seamless_scroll.plain .g_tableTile{
  border-bottom: 1px solid rgba(20, 156, 198, 0.34);
}

.g_tableBox_seamless_scroll .g_tableTile td,
.g_tableBox_seamless_scroll .g_tableCon td {
  text-align: center;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  color: $fontColor;
  background: $headerBgColor;
}
// 蓝色
.g_tableBox_seamless_scroll.blue .g_tableTile td,
.g_tableBox_seamless_scroll.blue .g_tableCon td {
  background: #23478478;
}
// 朴素版
.g_tableBox_seamless_scroll.plain .g_tableTile td,
.g_tableBox_seamless_scroll.plain .g_tableCon td {
  background: transparent;
  color: whitesmoke;
}


.g_tableBox_seamless_scroll .g_tableCon {
  height: 194px;
  font-size: 14px;
  overflow: hidden;
}

.g_tableBox_seamless_scroll .g_tableTile table,
.g_tableBox_seamless_scroll .g_tableCon table {
  width: 100%;
  table-layout: fixed;
  font-size: 14px;
}

.g_tableBox_seamless_scroll .g_tableCon table tr {
  height: 35px;
  line-height: 35px;
}
.g_tableBox_seamless_scroll .g_tableCon table tr:nth-child(odd){
  background-color: rgba(7, 82, 138, .4);
}
.g_tableBox_seamless_scroll .g_tableCon table td:nth-child(1) {
  text-align: center;
}

.g_tableCircle {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  display: inline-block;
}

.g_tableFirst {
  color: #1fadff;
}

.g_tableFirst .g_tableCircle {
  background: #1fadff;
}

.g_tableSecond {
  color: #0efff1;
}

.g_tableSecond .g_tableCircle {
  background: #0efff1;
}

.g_tableThird {
  color: #dfe22e;
}

.g_tableThird .g_tableCircle {
  background: #dfe22e;
}

.g_tableForth {
  color: #f98115;
}

.g_tableForth .g_tableCircle {
  background: #f98115;
}

</style>
