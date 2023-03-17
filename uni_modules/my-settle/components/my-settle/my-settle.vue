<template>
  <view class="my-settle-container">
      <view class="allBoxRadio">
        <radio color="#C00000" :checked="isAllGoodsChecked" @click="radioChangeHandler">
          <view class="allBoxSelect">
            全选
          </view>
        </radio>
      </view>
      <view class="totalPrice">
        合计：<text class="text">￥ {{getTotalPrice}}</text>
      </view>
      <view class="pay">
        <view class="payInfo" @click="payForGoods">结算({{getCheckedTotal}})</view>
      </view>
  </view>
</template>
<script>
  import {mapGetters,mapMutations,mapState} from 'vuex'
  export default {
    computed:{
      ...mapGetters('m_cart',['isAllGoodsChecked','getCheckedTotal','getTotal','getTotalPrice']),
      ...mapGetters('m_user',['getAllAddress']),
      ...mapState('m_user',['token']),
      ...mapState('m_cart',['cart'])
    },
    data() {
      return {
        time:3,//自动跳转的秒数
        timer:null,//定时器名字
      }
    },
    methods:{
      ...mapMutations('m_cart',['updateAllChecked']),
      ...mapMutations('m_user',['updateRedirectInfo']),
      //结算未登录时提示
      showTips(n) {
        uni.showToast({
          icon:'none',
          title:'请登录后再结算'+n+'秒后自动跳转',
          mask:true,
          duration:1500
        })
      },
      //修改n秒跳转的函数
      reduceTime() {
        this.showTips(this.time)
        this.timer = setInterval(() => {
          this.time--
          if(this.time<=0) {
            clearInterval(this.timer)
            uni.switchTab({
              url:'/pages/my/my', 
              success:() => {
                this.updateRedirectInfo({
                  openType:'switchTab',
                  from:'/pages/car/car'
                })
              }
            })
            this.time = 3
            return 
          }
          this.showTips(this.time)
          },1000)
      },
      //全选按钮的回调
      radioChangeHandler() {
        this.updateAllChecked(!this.isAllGoodsChecked)
      },
      //结算按钮的回调
      payForGoods() {
      if(!this.getCheckedTotal) uni.$showMsg('请选择结算的商品！')
      if(!this.getAllAddress) uni.$showMsg('请选择收获地址！')
      if(!this.token) this.reduceTime()
      //发起微信支付请求
      this.payOrder()
      },
      //发起支付请求的回调
      async payOrder() {
         // 1. 创建订单
          // 1.1 组织订单的信息对象
        const good = this.cart.filter(x => x.goods_isChacked) //获取选中的商品
        const info = good.map(x => {
          return {
          goods_id:x.goods_id,
          goods_number:x.goods_count,
          goods_price:x.goods_price
          }
        })
          const payInfo = {
            // order_price:this.getCheckedTotal,
            order_price:0.01,
            consignee_addr:this.getAllAddress,
            goods:info
          }
          // 1.2 发起请求创建订单
        const {data} =await uni.$http.post('/my/orders/create',payInfo)
        if(data.meta.status == 200) {
          // 1.3 得到服务器响应的“订单编号”
          const orderNumber = data.message.order_number
           // 2. 订单预支付
            // 2.1 发起请求获取订单的支付信息
          const result = await  uni.$http.post('/my/orders/req_unifiedorder',{ order_number: orderNumber })  
          //请求成功
          if(result.meta.status == 200) {
            const payInfoM = result.data.message.pay 
             // 3. 发起微信支付
               // 3.1 调用 uni.requestPayment() 发起微信支付
               const [err, succ] = await uni.requestPayment(payInfo)
               // 3.2 未完成支付
               if (err) return uni.$showMsg('订单未支付！')
               // 3.3 完成了支付，进一步查询支付的结果
               const { data: res3 } = await uni.$http.post('/my/orders/chkOrder', { order_number: orderNumber })
               // 3.4 检测到订单未支付
               if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
               // 3.5 检测到订单支付完成
               uni.showToast({
                 title: '支付完成！',
                 icon: 'success'
               })
          }else{
            uni.$showMsg('预付订单生成失败！')
          }
        }else {
          uni.$showMsg('发起结算请求失败！')
        }
      }
    },
     
  }
</script> 
<style lang="scss">
  .my-settle-container {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    background-color: #fff;
    border: 1px solid #efefef;
    .totalPrice {
      .text {
        color: red;
      }
    }
    .pay {
      padding-right: 5px;
      .payInfo {
        background-color: red;
        text-align: center;
        height: 50px;
        color:white;
        padding: 0 10px;
        line-height: 50px;
        min-width: 100px;
      }
    }
  }
</style>
