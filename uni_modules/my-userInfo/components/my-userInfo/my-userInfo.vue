<template>
  <view class="userInfoContainer">
    <!-- 头像和昵称区域 -->
    <view class="userInfoHead">
      <image :src="userInfo.avatarUrl" mode="widthFix"></image>
      <view class="userName">{{userInfo.nickName}}</view>
    </view>
    <!-- 头像下的面板区域 -->
      <!-- 第一个店铺商品面板 -->
      <view class="first">
        <view class="firstItem">
          <view class="number">8</view>
          <view class="name">收藏的店铺</view>
        </view>
        <view class="firstItem">
          <view class="number">14</view>
          <view class="name">收藏的商品</view>
        </view>
        <view class="firstItem">
          <view class="number">18</view>
          <view class="name">关注的商品</view>
        </view>
        <view class="firstItem">
          <view class="number">89</view>
          <view class="name">足迹</view>
        </view>
      </view>
      <!-- 第二个我的订单面板 -->
      <view class="myPay">
        <view class="head">我的订单</view>
        <view class="iconAndText">
          <view class="item">
            <image src="../../../../static/my-icons/icon1.png" mode=""></image>
            <view class="text">待付款</view>
          </view>
          <view class="item">
            <image src="../../../../static/my-icons/icon2.png" mode="widthFix"></image>
            <view class="text">待收获</view>
          </view>
          <view class="item">
            <image src="../../../../static/my-icons/icon3.png" mode="widthFix"></image>
            <view class="text">退款/退货</view>
          </view>
          <view class="item">
            <image src="../../../../static/my-icons/icon4.png" mode="widthFix"></image>
            <view class="text">全部订单</view>
          </view>
        </view>
      </view>
      <!-- 第三个模板 -->
      <view class="three">
        <view class="threeItem">
          <view class="item">收获地址</view>
          <uni-icons type="forward"></uni-icons>
        </view>
        <view class="threeItem">
          <view class="item">联系客服</view>
          <uni-icons type="forward"></uni-icons>
        </view>
        <view class="threeItem" @click="logOut">
          <view class="item">退出登录</view>
          <uni-icons type="forward"></uni-icons>
        </view>
      </view>
  </view>
</template>
<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    computed:{
      ...mapState('m_user',['userInfo'])
    },
    methods:{
      ...mapMutations('m_user',['updateAddress','updateUserInfo','updateToken']),
      //退出登录
      async logOut() {
        const data = await uni.showModal({
          title:'提示',
          content:'确认要退出登录吗'
        }).catch(err => err)
        const {cancel,confirm} = data[1]
        if(confirm) {
          this.updateToken('')
          this.updateAddress({})
          this.updateUserInfo({})
        }
      }
    }
  }
</script>
<style lang="scss">
  .userInfoContainer {
    height: 100%;
    background-color: #efefef;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 0;
    left: 0;
  }
  .userInfoHead {
    height: 190px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #C00000;
    image {
      width: 90px;
      border-radius: 50%;
      border: 3px solid white;
    }
    .userName {
      color: white;
      margin-top: 10px;
    }
  }
  .first {
    width: 90%;
    background-color: white;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 7px;
    position: relative;
    top: -15px;
    .firstItem {
      font-size: 14px;
      text-align: center;
      font-weight: 500;
    }
  }
  .myPay {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 110px;
    background-color: white;
    border-radius: 7px;
    .head {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 8px;
      padding: 5px 5px;
      border-bottom: 1px solid #efefef;
    }
    .iconAndText {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
       image {
         width: 40px;
         height: 40px;
       }
       .text {
         font-size: 14px;
         font-weight: 500;
         text-align: center;
       }
      }
    }
  }
  .three {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 130px;
    background-color: white;
    width: 90%;
    border-radius: 7px;
    .threeItem {
      display: flex;
      justify-content: space-between;
      padding: 5px 5px;
      .item {
        font-size: 16px;
        font-weight: 500;
        text-align: center;
      }
    }
  }
</style>
