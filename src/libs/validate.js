import axios from 'axios'
/**
 * Element-UI组件Form表单的异步校验自定义规则
 * @type {{}}
 */
let validate = {}
let regValidate = (value,callback,reg,message) => {
    if(reg.test(value)){
        callback()
    }else{
        callback(new Error(message));
    }
}
validate.validateSite = (rule, value, callback) => {
    regValidate(value,callback,/^((https|http|ftp|rtsp|mms)?:\/\/)?(([0-9a-z_!~\*'\(\)\.&=\+\$%-]+:)?[0-9a-z_!~\*'\(\)\.&=\+\$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~\*'\(\)-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(\.[a-z]{2})?(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~\*'\(\)\.;\?:@&=\+\$,%#-]+)+\/?)$/
        ,'域名格式错误')
}
validate.validateEmail = (rule, value, callback) => {
    regValidate(value,callback,/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
        ,'邮箱格式错误')
}
validate.validateAppSum = (rule, value, callback) => {
    regValidate(value,callback,/^[0-9]{1,20}$/,'数量格式错误')
}
validate.validateMobilePhone = (rule, value, callback) => {
    regValidate(value,callback,/^1(3|4|5|7|8)\d{9}$/,'手机号码格式错误')
}
validate.validateTelephone = (rule, value, callback) => {
    regValidate(value,callback,/^(0\d{2,3}-?)?\d{5}(\d{2,3})?$/,'座机号码格式错误')
}
validate.validateLoginName = (rule, value, callback) => {
    regValidate(value,callback,/^(?![0-9]*$)[a-zA-Z0-9_.@]{8,30}$/,'登录账号格式错误')
}
validate.validateZipCode = (rule, value, callback) => {
    regValidate(value,callback,/^\d{6}$/,'邮政编码格式错误')
}
validate.validatePassword = (rule, value, callback) => {
    regValidate(value,callback,/^((?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,18})?$/,'密码需包含字母、数字、特殊字符')
}

validate.remoteLoginName = (rule, value, callback) => {
    axios.get('/api/register/checkLoginNameOnly', {params:
        {
            loginName: value
        }
    }).then(res => {
        if(res.code == 200 && res.body == 'true'){
            callback(new Error('登录账号已注册'));
        }else{
            callback()
        }
    }).catch(function (error) {
        console.log(error);
    }).then(() => {
        //this.loading = false
    });
}
validate.remoteEmail = (rule, value, callback) => {
    axios.get('/api/register/checkEmailOnly', {params:
            {
                email	: value
            }
    }).then(res => {
        if(res.code == 200 && res.body == 'true'){
            callback(new Error('邮箱已存在'));
        }else{
            callback()
        }
    }).catch(function (error) {
        console.log(error);
    }).then(() => {
        //this.loading = false
    });
}
validate.remoteRecordsAddress = (rule, value, callback) => {
    axios.get('/api/register/checkCenterExist', {params:
            {
                recordsAddress: value
            }
    }).then(res => {
        if(res.code == 200 && res.body == 'false'){
            callback(new Error('该省市还没有建立分中心,请重新选择分中心'));
        }else{
            callback()
        }
    }).catch(function (error) {
        console.log(error);
    }).then(() => {
        //this.loading = false
    });
}
validate.remoteCompanyName = (rule, value, callback) => {
    axios.get('/api/register/checkCompanyNameOnly', {params:
            {
                companyName: value
            }
    }).then(res => {
        if(res.code == 200 && res.body == 'true'){
            callback(new Error('应用商店名称已存在'));
        }else{
            callback()
        }
    }).catch(function (error) {
        console.log(error);
    }).then(() => {
        //this.loading = false
    });
}
validate.validateAppNumber = (rule, value, callback) => {
    axios({
        method: 'post',
        url: '/api/appstore/process/number',
        params: {number:value},
        //data: formData
    }).then(res => {
        //this.$axios.post('/api/appstore/process/number', {params:{number:this.form.number}}).then(res => {
        if(res.code != 200){
            callback(new Error(res.message));
        }else{
            callback()
        }
    }).catch(function (error) {
        console.log(error);
    })
}

/**
 * Element-UI组件Form表单的异步校验自定义规则
 */
export default validate