<template>
  <div class="animation-earth-container">
    <div class="earth-circle-bg">
      <div class="small-circle">

      </div>
    </div>
    <div class="earth-batholite"></div>
    <div class="earth-bling">
      <img src="./img/earth-bling.png" />
    </div>
    <div class="balloon-icons">
      <div class="eye-balloon-icon">
        <div class="small-icon">
          <img src="./img/police-icon.png">
        </div>
        <img src="./img/balloon_icon.png" >
      </div>
      <div class="eye-balloon-icon">
        <div class="small-icon">
          <img src="./img/security-icon.png">
        </div>
        <img src="./img/balloon_icon.png" >
      </div>
      <div class="eye-balloon-icon">
        <div class="small-icon">
          <img src="./img/earth-icon.png">
        </div>
        <img src="./img/balloon_icon.png" >
      </div>
      <div class="eye-balloon-icon">
        <div class="small-icon">
          <img src="./img/eye-icon.png">
        </div>
        <img src="./img/balloon_icon.png" >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnimationEarth'
}
</script>

<style lang="scss" scoped>
  .animation-earth-container {
    position: absolute;
    width: 921px;
    height: 864px;
    .balloon-icons {
      .eye-balloon-icon {
        position: absolute;
        animation: balloon 8s infinite;
        .small-icon {
          position: absolute;
          width: 86px;
          height: 86px;
          display: flex;
          flex-wrap: nowrap;
          align-content: center;
          justify-content: center;
          flex-direction: row;
          align-items: center;
        }

        &:nth-child(1){
          right: 211px;
          top: 363px;
          animation-duration: 7s;
        }
        &:nth-child(2){
          right: 763px;
          top: 417px;
          animation-duration: 9s;
        }
        &:nth-child(3){
          right: 661px;
          top: 333px;
          animation-duration: 10s;
        }
        &:nth-child(4){
          right: 54px;
          top: 409px;
          animation-duration: 5s;
        }
      }
    }
    .earth-circle-bg {
      position: absolute;
      left: 70px;
      background-image: url("./img/earth-cicle-bg.png");
      background-position: -4px 57px;
      width: 760px;
      height: 760px;
      background-repeat: no-repeat;
      mix-blend-mode: color-dodge;
      animation: earth 50s linear infinite;

      // border: 1px solid red;
      border-radius: 760px;

      display: flex;
      justify-content: center;
      align-items: center;

      // 小圆参考线
      .small-circle {
        border: 1px solid #f8e9b3;
        width: 200px;
        height: 200px;
        border-radius: 200px;
        display: none;
      }

    }
    .earth-batholite {
      background-image: url("./img/earth-batholite-bg.png");
      mix-blend-mode: color-dodge;
      width: 857px;
      height: 355px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: absolute;
      bottom: 94px;
      left: 19px;
    }
    .earth-bling {
      position: absolute;
      left: 361px;
      top: 289px;
    }

  }

  @keyframes earth {
    0% {
      transform: rotateZ(0deg);
    }
    50% {
      transform: rotateZ(180deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }

  @keyframes balloon {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-50px);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>
