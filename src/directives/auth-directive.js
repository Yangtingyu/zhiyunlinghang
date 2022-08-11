import Vue from 'vue'

/** 权限指令 **/
Vue.directive('has', {
    bind: function (el, binding) {
        if (!Vue.prototype.$_has(binding.value)) {
            // el.parentNode.removeChild(el)
            el.style.display = 'none'
        }
    }
});

// 权限检查方法
Vue.prototype.$_has = function (value) {
    let isExist = false
    let storageFunctions = sessionStorage.getItem('functions')
    if(storageFunctions){
        let functions = JSON.parse(storageFunctions)
        for (let key in functions) {
            if (key == value) {
                isExist = true
                break
            }
        }
    }
    if (!isExist) {
        let menuNamesString = sessionStorage.getItem('menuNames')
        if (menuNamesString) {
            // 如果在功能权限中每找到，则再在菜单权限中找找
            let menuNames = JSON.parse(menuNamesString)
            if (menuNames && menuNames.length > 0) {
                for (let i = 0; i < menuNames.length; i++) {
                    if (menuNames[i] == value) {
                        isExist = true
                        break
                    }
                }
            }
        }
    }
    return isExist
};
