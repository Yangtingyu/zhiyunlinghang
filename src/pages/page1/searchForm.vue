<template>
  <div style="padding:20px">
    <el-row type="flex" align="middle">
      <el-col :span="24">
        <el-form :model="formData" :label-width="labelWidth" ref="searchForm" size="mini"
          class="common-form">
          <el-row>
            <el-col v-for="(formItem, index) in formItems" :key="index" :xs="24" :sm="12" :md="8"
              :lg="8" :xl="6">
              <el-form-item v-if="formItem.type === 'input'" :label="formItem.label"
                :prop="formItem.prop">
                <el-input v-model="formData[formItem.prop]" clearable />
              </el-form-item>
              <el-form-item v-if="formItem.type == 'select'" :label="formItem.label"
                :prop="formItem.prop">
                <el-select v-model="formData[formItem.prop]" placeholder="请选择" clearable filterable>
                  <el-option v-for="option in formItem.options" :key="option.value"
                    :label="option.label" :value="option.value" />
                </el-select>
              </el-form-item>
              <el-form-item v-if="formItem.type == 'datepicker'" :label="formItem.label"
                :prop="formItem.prop">
                <el-date-picker v-model="formData.comment_date_str" value-format="yyyy-MM"
                  format="yyyy-MM" type="month">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="4" style="text-align:right">
        <el-button @click="handleSearch" size="mini" type="primary">搜索</el-button>
        <el-button @click="handleFormReset" size="mini" type="warning">重置</el-button>
        <slot />
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  props: {
    formItems: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      formData: {
        target: null,
        port: null
      },
      labelWidth: '100px'
    }
  },
  methods: {
    handleSearch () {
      this.$emit('submit', this.formData)
    },
    handleFormReset () {
      this.$refs['searchForm'].resetFields()
      this.handleSearch()
    }
  }
}
</script>

<style>
</style>