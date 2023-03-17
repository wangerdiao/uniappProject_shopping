<template>
  <view class="container">
    <view class="loginContainer">
      <view >
        <uni-icons type="contact-filled" size="100" color="#AFAFAF" @click="test"></uni-icons>
      </view>
      <view class="login">
        <button class="btn" @click="getUserInfo">一键登录</button>
      </view>
      <view class="bottom">
        <view class="text">
          登录后尽享更多权益
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  import {mapMutations,mapState} from 'vuex'
  export default {
    computed:{
      ...mapState('m_user',['redirectInfo'])
    },
    methods:{
      ...mapMutations('m_user',['updateUserInfo','updateToken','updateRedirectInfo']),
       getUserInfo(e){
        const that = this //存储this指向
        uni.getUserProfile({
           desc:'完善个人资料',
           success:function(e)  {
             that.updateUserInfo(e.userInfo)
             that.getToken(e)
             },
           fail(e) { 
             return uni.$showMsg('您取消了登录授权！')
           }
           
       })
    },
    //获取token的回调
    async getToken(info) {
      const data = await uni.login().catch(err => err)
      const {code,errMsg} = data[1]
      if(errMsg!='login:ok') uni.$showMsg('登录失败')
      //整理请求参数
      const query = {
        encryptedData:info.encryptedData,
        iv:info.iv,
        rawData:info.rawData,
        signature:info.signature,
        code
      }
      //之后调用接口发起请求，由于接口失效，就自己定义一个token
      // const result = await uni.$http.post('/users/wxlogin',query)
      // if(result.meta.status == 200) {
      // this.updateToken(result.token)
      // }else {
      //   return uni.$showMsg()
      // }
      const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
      this.updateToken(token)
      this.getBack()
    },
    //跳转到先前页面的回调
    getBack() {
      if(this.redirectInfo && this.redirectInfo.openType=='switchTab') {
        uni.switchTab({
          url:this.redirectInfo.from,
          complete:() => {
            this.updateRedirectInfo(null)
          }
        })
      }
    }
  },
}
</script>
<style lang="scss">
  .loginContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 25%;
    .login {
      width: 300px;
      height: 50px;
      margin: 10px 0;
      .btn {
        background-color: #b61830;
        border-radius: 60px;
        color: white;
      }
    }
    .bottom {
      .text {
        font-size: 12px;
        color: #d1d1d1;
      }
    }
  }
</style>
