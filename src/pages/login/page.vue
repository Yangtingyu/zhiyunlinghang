<template>
  <div v-show="showLogin" class="login-page" :class="[theme]">
    <!-- <div class="layer bg" id="login" /> -->
    <div class="layer flex-center">
      <!-- logo部分 -->
      <div class="logo-group">
        <!--<img src="./image/logo-sc.png" alt="logo">-->
        <span class="login-title">{{ loginTitle }}</span>
      </div>

      <!-- 表单部分 -->
      <div class="form-group">
        <el-card>
          <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin"
            :show-message="false" :status-icon="false">
            <el-form-item prop="username">
              <el-input type="text" v-model="formLogin.username" placeholder="用户名">
                <i slot="prepend" class="fa fa-user-o"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="formLogin.password" placeholder="密码"
                @keyup.enter.native="submit">
                <i slot="prepend" class="fa fa-lock"></i>
              </el-input>
            </el-form-item>
            <el-form-item v-if="isShowCode" prop="code">
              <el-input type="text" v-model="formLogin.code" placeholder="验证码"
                @keyup.enter.native="submit">
                <template slot="prepend"><i class="fa fa-shield"></i></template>
                <template slot="append">
                  <img class="login-code" :src="loginCodeUrl" @click="changeLoginCode"
                    style="cursor: pointer">
                </template>
              </el-input>
            </el-form-item>
            <div class="remember-info">
              <el-checkbox v-model="formLogin.isShowRemember">记住登录信息</el-checkbox>
            </div>
            <el-button @click="submit" type="primary" class="button-login"
              :loading="disabledSubmit">
              登录
            </el-button>
            <!--<div style="float: right;">
                    <el-button type="text">注册用户</el-button>
                    </div>-->
          </el-form>
        </el-card>
      </div>
      <!-- 快速登录按钮 -->
      <!-- <el-button type="info" class="button-help" @click="dialogVisible = true">
                快速选择用户（测试功能）
            </el-button> -->
      <!-- <el-button
                type="info"
                v-if="environment=='development'"
                class="button-help"
                @click="dialogVisible = true"
            >快速选择用户（测试功能）</el-button> -->
    </div>

    <el-dialog title="快速选择用户" :visible.sync="dialogVisible" width="400px">
      <el-row :gutter="10" style="margin: -20px 0px -10px 0px;">
        <el-col v-for="(user, index) in users" :key="index" :span="8">
          <div class="user-btn" @click="handleUserBtnClick(user)">
            <d2-icon name="user-circle-o" />
            <span>{{ user.name }}</span>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="提示" center :visible.sync="autoLoginDialogVisible" width="400px">
      <div style="margin: -20px 0px;">
        检测到登录信息，<el-tag effect="plain" type="danger">{{autoLoginRemainingTime}}</el-tag> 秒后将尝试自动登陆。
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" icon="el-icon-delete" @click="clearRememberPasswordInfo">清除记录
        </el-button>
        <el-button size="mini" icon="el-icon-close" @click="cancelAutoLogin">取消登陆</el-button>
        <el-button size="mini" icon="el-icon-check" type="primary" @click="submit"
          :loading="disabledSubmit">立即登陆</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
// require('particles.js')
import config from './config/default'
import { mapActions, mapState } from 'vuex'
import RSAUtils from '@/libs/security.js'
import setting from '@/setting.js'
import util from '@/libs/util.js'
import router from '@/router'
import store from '@/store'
import { JSEncrypt } from 'jsencrypt'
import qs from 'qs'
import crypto from 'crypto'
import CryptoJS from 'crypto-js'

export default {
  props: {
    // 主题色
    theme: {
      type: String,
      default: 'green'
    }
  },
  data() {
    return {
      showLogin: false,

      // 快速选择用户
      dialogVisible: false,

      // 自动登陆提示窗口
      autoLoginDialogVisible: false,
      // 提示窗口剩余时间
      autoLoginRemainingTime: 3,
      // 自动登陆计时器
      autoLoginIntervalTimer: null,

      // 是否记忆密码
      isShowRemember: false,

      // 是否显示验证码
      isShowCode: false,

      loginCodeUrl: '', //登录验证码地址

      disabledSubmit: false, // 禁用登录按钮

      //loginTitle: process.env.VUE_APP_TITLE,
      // loginTitle: VUE_CONFIG.appTitle,

      environment: process.env.NODE_ENV,

      users: [
        {
          name: '管理员',
          username: 'admin',
          password: 'eversec123!@#'
        }
      ],

      // 表单
      formLogin: {
        username: '',
        password: '',
        code: '',
        isShowRemember: false
      },

      // 校验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'change' }]
      }
    }
  },

  mounted() {
    // 初始化例子插件
    //particlesJS('login', config)
    //初始化是否显示验证码区
    this.initIsShowCode(() => {
      // 尝试自动登陆
      this.browserAutoLogin()
    })
  },

  methods: {
    ...mapActions(['d2adminLogin']),
    /**
     * 通过浏览器记录的密码，尝试自动登陆
     * 注：必须是用户主动点击操作才能获取到填充的用户信息，直接刷新链接是不行的
     */
    browserAutoLogin() {
      let RememberPasswordInfo = localStorage.getItem('RememberPasswordInfo')
      if (RememberPasswordInfo) {
        console.log('检测到登陆保存的用户信息，自动填充并提示自动登陆')
        var bytes = CryptoJS.AES.decrypt(RememberPasswordInfo, 'zebra-project')
        var originalText = bytes.toString(CryptoJS.enc.Utf8)
        let RememberPasswordInfoObj
        try {
          RememberPasswordInfoObj = JSON.parse(originalText)
        } catch (e) {
          console.warn('解密失败！请重新登录！')
          return
        }
        this.formLogin.username = RememberPasswordInfoObj.username
        this.formLogin.password = RememberPasswordInfoObj.password
        // 再次登录，默认勾选记忆密码
        this.formLogin.isShowRemember = true

        // 未开启验证码 且 非主动退出 时，开启提示窗口并倒计时
        if (!this.isShowCode && !this.$route.params.isLogout) {
          // this.autoLoginDialogVisible = true
          this.$message({
            showClose: true,
            dangerouslyUseHTMLString: true,
            message: `检测到登录信息，<el-tag effect="plain" type="danger">${this.autoLoginRemainingTime}</el-tag> 秒后将尝试自动登陆。`,
            type: 'success'
          })
          this.autoLoginIntervalTimer = setInterval(() => {
            if (this.autoLoginRemainingTime > 0) {
              this.autoLoginRemainingTime--
            } else {
              clearInterval(this.autoLoginIntervalTimer)
              this.submit()
              this.autoLoginDialogVisible = false
            }
          }, 1000)
          this.$once('hook:beforeDestroy', () => {
            console.log('清理autoLoginIntervalTimer定时器...')
            clearInterval(this.autoLoginIntervalTimer)
          })
        }
      }
    },

    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick(user) {
      this.formLogin.username = user.username
      this.formLogin.password = user.password
      this.submit()
    },

    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 登录
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码

          // 获取RSA信息
          this.$axios
            .get('/service/sso/keyPair')
            .then((res) => {
              if (res.code == 200) {
                let publicKey = RSAUtils.getKeyPair(
                  res.body.exponent,
                  '',
                  res.body.modulus
                )
                let password = this.formLogin.password
                let encryptedPassword = RSAUtils.encryptedString(
                  publicKey,
                  password
                )
                this.d2adminLogin({
                  vm: this,
                  username: this.formLogin.username,
                  password: encryptedPassword,
                  mdpassword: crypto
                    .createHash('md5')
                    .update(password)
                    .digest('hex'),
                  code: this.formLogin.code
                })
              }
            })
            .catch(function (error) {
              // handle error
              console.log(error)
            })
            .then(function () {
              // always executed
            })
        } else {
          // 登录表单校验失败
          this.$message.error('表单校验失败')
        }
      })
    },

    initIsShowCode(callback) {
      this.$axios
        .get('/service/sso/code')
        .then((res) => {
          // 示例：{"code":200,"message":"成功","body":true,"timestamp":1542275174564}
          if (res.code == 200) {
            this.isShowCode = res.body
            if (this.isShowCode) {
              this.changeLoginCode()
            }
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
        .then(function () {
          // always executed
          if (callback) {
            callback()
          }
        })
    },

    changeLoginCode() {
      this.loginCodeUrl = '/service/sso/code/100/48/5/35/26?' + Math.random()
    },

    autoLogin(routerName) {
      let that = this
      that.$axios
        .get('/service/sso/keyPair')
        .then((res) => {
          if (res.code == 200) {
            let publicKey = RSAUtils.getKeyPair(
              res.body.exponent,
              '',
              res.body.modulus
            )
            let password = 'EverSec123!@#abc'
            let encryptedPassword = RSAUtils.encryptedString(
              publicKey,
              password
            )
            that.$axios
              .post('/service/sso/login', {
                userName: 'CMISIS',
                password: encryptedPassword,
                appKey: setting.systemInfo.key,
                code: ''
              })
              .then((res) => {
                if (res.code == 200) {
                  // 重新获取后台的字典数据
                  store.dispatch('initMyDictInfo')

                  let body = res.body
                  let user = body.user
                  util.cookies.set('uuid', user.id)
                  util.cookies.set('token', user.userName)
                  util.cookies.set(
                    'oauth',
                    crypto.createHash('md5').update(password).digest('hex')
                  )
                  // 存放按钮权限数据functions，用于auth-directive.js指令的按钮权限判断
                  sessionStorage.setItem(
                    'functions',
                    body.app ? JSON.stringify(body.app.functions) : []
                  )
                  // 设置 vuex 用户信息
                  store.commit('d2adminUserInfoSet', {
                    name: user.userName,
                    user: user,
                    functions: body.app ? body.app.functions : []
                  })

                  // 用户登录后从数据库加载一系列的设置
                  store.commit('d2adminLoginSuccessLoad')

                  router.push({ name: routerName })
                } else {
                  console.log('res', res)
                  that.showLogin = true
                }
              })
              .catch((error) => {
                console.log('error', error)
                that.showLogin = true
              })
          } else {
            console.log('res', res)
            that.showLogin = true
          }
        })
        .catch((error) => {
          console.log('error', error)
          that.showLogin = true
        })
    },
    /**
     * 取消自动登陆计时器
     */
    cancelAutoLogin() {
      if (this.autoLoginIntervalTimer) {
        console.log('手动录入，取消自动登陆定时器autoLoginIntervalTimer')
        clearInterval(this.autoLoginIntervalTimer)
      }
      this.autoLoginDialogVisible = false
    },
    /**
     * 清除记录的密码信息
     */
    clearRememberPasswordInfo() {
      localStorage.removeItem('RememberPasswordInfo')
      this.formLogin.isShowRemember = false
      this.autoLoginDialogVisible = false
      this.$message({
        message: '登录信息成功清空！',
        type: 'success'
      })
      console.log('用户主动清空密码存储')
    }
  },
  computed: {
    ...mapState({
      appFlag: (state) => state.d2admin.appFlag
    }),
    // 登录标题
    loginTitle() {
      return VUE_CONFIG.appConfigInfo[this.appFlag].appTitle
    }
  },

  created() {
    let that = this
    let autoLoginInfo = sessionStorage.getItem('autoLoginInfo')
    if (autoLoginInfo) {
      sessionStorage.removeItem('autoLoginInfo')
      let tempArray = autoLoginInfo.split('?')
      if (tempArray.length == 2) {
        // 验证 token 的有效性
        that.$faxios
          .post(
            '/service/monitoring-query/autologin/checktoken',
            qs.stringify({
              token: decodeURIComponent(tempArray[1])
            }),
            {
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }
          )
          .then((res) => {
            if (res.code == 200) {
              that.autoLogin(tempArray[0])
            } else {
              console.log('res', res)
              that.showLogin = true
            }
          })
          .catch((error) => {
            console.log('error', error)
            that.showLogin = true
          })
      } else {
        that.showLogin = true
      }
    } else {
      that.showLogin = true
    }
  }
}
</script>

<style lang="scss">
@import './style.scss';
</style>

<style lang="scss" scoped>
.login-page {
  // 快速登录按钮
  .button-help.el-button--info {
    color: #b1aeae;
    background-color: #07173b00;
    border-color: #90939966;
  }
  .remember-info {
    margin-bottom: 17px;
    /deep/ .el-checkbox__label {
      font-size: 12px;
    }
    /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #094562;
    }
    /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #0945629c;
      border-color: #0945629c;
    }
  }
}
// 蓝色主题定制
.login-page.blue {
  background-image: url(/image/cmiot-home-v3/img/bg.jpg);
  .form-group .button-login {
    width: 100%;
    background-color: #294a81;
    border-color: #294a81;
  }
  // 快速登录按钮
  .button-help.el-button--info {
    color: #b1aeae;
    background-color: #07173b00;
    border-color: #90939966;
  }
}
</style>
