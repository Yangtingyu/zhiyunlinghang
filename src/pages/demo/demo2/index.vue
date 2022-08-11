<template>
    <d2-container>
        <div class="sec_banner clearfix">
            <h6 class="rightArr arrone"></h6>
            <div class="sec_bannerL fl">
                <h3></h3>
            </div>
            <div class="sec_bannerR fl">
                <div class="sec_anvaIntro">
                    <h3></h3>
                    <h4>ANVA官网</h4>
                    <div class="secIntroL" style="width:82px;">
                        <span></span>
                    </div>
                    <p>ANVA为“Anti Network-Virus Alliance of China”缩写，译为“中国互联网协会反网络病毒联盟”。ANVA官网下包括四个子平台，分别为：应用互联网自律白名单发布平台、网络安全威胁信息共享平台、移动APP预置与分发渠道安全检测平台、移动互联网应用程序开发者数字证书管理平台。</p>
                </div>
            </div>
        </div>
        <div class="sec_con">
            <div class="sec_mbox">
                <ul class="g_virList">
                    <li class="clearfix">
                        <div class="g_virImg fl">
                            <img src="image/anva/g_virImg02.png">
                        </div>
                        <div class="fr g_virCon">
                            <h3 style="background-image:url(image/anva/g_virCon02.png);">网络安全威胁信息共享平台</h3>
                            <p>网络安全威胁信息共享平台由中国互联网协会反网络病毒联盟（ANVA）主持并建设，以方便企业共享威胁信息为出发点，以建立网络安全纵深防御体系为目标，汇总基础电信运营企业、网络安全企业等各渠道提供的恶意程序、恶意地址、恶意手机号、恶意邮箱等网络安全威胁信息数据，建立公开透明、公平公正的信息评价体系，利于各企业获得想要的数据，激励企业贡献有价值的数据，促进信息共享的发展，遏制威胁信息在网络中的泛滥。</p>
                        </div>
                    </li>
                    <li class="clearfix">
                        <div class="g_virImg fl">
                            <img src="image/anva/g_virImg04.png">
                        </div>
                        <div class="fr g_virCon">
                            <h3 style="background-image:url(image/anva/g_virCon04.png);">移动APP预置与分发渠道安全检测平台</h3>
                            <p>为贯彻中华人民共和国工业和信息化部《移动智能终端应用软件预置和分发管理暂行规定》，ANVA为移动APP预置与分发渠道提供APP安全检测服务，具体包括应用商店、网盘、广告平台等APP分发渠道。截至2017年，ANVA已接入百余家分发渠道进行APP安全检测工作。根据属地化管理要求，CNCERT及各CNCERT分中心对应用商店中出现的恶意程序进行通知下架处理。
                            </p>
                        </div>
                    </li>
                    <li class="clearfix">
                        <div class="g_virImg fl">
                            <img src="image/anva/g_virImg01.png">
                        </div>
                        <div class="fr g_virCon">
                            <h3 style="background-image:url(image/anva/g_virCon01.png);">移动互联网应用自律白名单发布平台</h3>
                            <p>为保障终端用户避免安装移动恶意程序，ANVA发布了信誉良好且不包含《移动互联网恶意程序描述格式》（YD/T 2439-2012）中所描述恶意行为的白名单，采用数字证书作为白名单的实体。ANVA组织11家安全企业组成“白名单工作组”，对白名单申请者进行安全检测和评审。对于带有ANVA白名单数字证书的APP，应用商店和终端安全软件会向用户醒目标示，提醒用户可以放心使用。</p>
                        </div>
                    </li>
                    <li class="clearfix">
                        <div class="g_virImg fl">
                            <img src="image/anva/g_virImg03.png">
                        </div>
                        <div class="fr g_virCon">
                            <h3 style="background-image:url(image/anva/g_virCon03.png);">移动互联网应用程序开发者数字证书管理</h3>
                            <p>为贯彻中华人民共和国工业和信息化部《移动智能终端营业软件预置和分发管理暂行规定》，ANVA建立了数字证书管理平台，接入国内数字认证机构和应用商店，为Android应用程序开发者提供便利的数字证书申请渠道。通过利用本平台的接口，CA机构和应用商店可以方便地接入平台，为开发者提供证书申请和开发者信息识别等服务。</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </d2-container>
</template>

<script>
    export default {
        name: "demo-demo2"
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/anva/base";
    @import "~@/assets/style/anva/style";
</style>