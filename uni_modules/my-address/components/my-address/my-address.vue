<template>
    <view class="container">
      <!-- 选择收获地址按钮 -->
     <view class="addressChoose" v-if="JSON.stringify(address)==='{}'">
        <button type="primary" class="chooseAdressBox" size="mini" @click="chooseAddress">请选择收获地址+</button>
      </view>
      <!-- 收获地址的详细信息 -->
      <view class="addressInfo" v-else @click="chooseAddress">
        <view class="row1">
          <view class="row1-left">
            <view class="userName">收货人：{{address.userName}}</view>
          </view>
          <view class="row1-right">
            <view class="phone">
              电话：{{address.telNumber}}
              <uni-icons type="forward" size="16"></uni-icons>
            </view>
          </view>
        </view>
        <view class="row2">
          <view class="address">
            收获地址：{{getAllAddress}}
          </view>
        </view>
      </view>
      <!-- 底部的边框线 -->
      <image src="@/static/cart_border@2x.png" class="addressBorder"></image>
    </view>
</template>
<script>
  import {mapState,mapMutations,mapGetters} from 'vuex'
  export default {
    data() {
      return {
      }
    },
    methods:{
      ...mapMutations('m_user',['updateAddress']),
      //用户添加地址的回调
      async chooseAddress() {
        const [err,succ] = await uni.chooseAddress().catch(err => err)
        //用户成功选择了收获地址
        if(err === null && succ.errMsg === 'chooseAddress:ok') {
          console.log(succ);
          this.updateAddress(succ)
        }
      }
    },
    computed:{
      ...mapState('m_user',['address']),
      ...mapGetters('m_user',['getAllAddress'])
    }
  }
</script>
<style lang="scss">
  .addressChoose {
    height: 100px;
    display: flex;
    align-items: center;
    .chooseAdressBox {
      width: fit-content;
    }
  }
  .addressInfo {
    background-color: #fff;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px 5px;
    .row1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      font-weight: 600;
    }
    .row2 {
      margin-top: 5px;
      font-size: 14px;
      font-weight: 600;
    }
  }
  .addressBorder {
    display: block;
    width: 100%;
    height: 5px;
  }
</style>
