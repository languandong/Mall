<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <!--头像-->
      <slot name="user-icon">
        <svg class="privateImage-svg left">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
        </svg>
      </slot>
      <!--登录信息-->
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>

        <div class="phone">
          <span>
            <svg data-v-735ff1be="" fill="#fff" class="icon-mobile">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
            </svg>
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <!--右箭头-->
      <svg data-v-735ff1be="" fill="#fff" class="arrow-svg right">
        <use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
      </svg>

    </a>
  </div>
</template>

<script>
export default {
  name: "UserInfo"
}
</script>

<style scoped>
 #user-info{
   background-color: var(--color-tint);
   padding: 15px;
   margin-top: -5px;
 }

 .privateImage-svg {
   width: 60px;
   height: 60px;
   background-color: #fff;
   border-radius: 30px;
 }

 .arrow-svg{
   width: 11px;
   height: 22px;
   margin-top: 18px;
 }

 .login-info{
   color: #ffffff;
   margin: 10px 0 0 10px ;
 }

 .phone{
   position: relative;

   font-size: 13px;
   margin-top: 5px;
   margin-left: 15px;
   font-weight: 300;
 }

 .icon-mobile{
   width: 12px;
   height: 18px;
   position: absolute;
   left: -15px;
   top: 0;
 }
</style>