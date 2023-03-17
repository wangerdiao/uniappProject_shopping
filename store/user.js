// 这个token可以成功创建订单 太长我分成两截了 Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
export default {
  namespaced:true,
  state:{
    address:JSON.parse(uni.getStorageSync('address') || '{}'),
    token:uni.getStorageSync('token') || '',
    userInfo:JSON.parse(uni.getStorageSync('userInfo') || "{}"),
    redirectInfo:null,
  },
  mutations:{
    //更新收获地址
    updateAddress(state,value) {
      state.address = value
      this.commit('m_user/setStorageAddress')
    },
    //持久化存储address
    setStorageAddress(state) {
      uni.setStorageSync('address',JSON.stringify(state.address))
    },
    updateUserInfo(state,value) {
      state.userInfo = value
      this.commit('m_user/setStorageUserInfo')
    },
     //持久化存储userInfo
     setStorageUserInfo(state) {
       uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
     },
     //修改token
     updateToken(state,value) {
       state.token = value
       this.commit('m_user/setStorageToken')
     },
     //持久化存储token
     setStorageToken(state) {
       if(state.token) {
         uni.setStorageSync('token',JSON.stringify(state.token))
       }else {
         uni.setStorageSync('token',"")
       }
     },
     updateRedirectInfo(state,value) {
       console.log(value);
       state.redirectInfo = value
     }
  },
  getters:{
    //完整的收获地址
   getAllAddress(state) {
     if(!state.address.provinceName) return ''
      return  state.address.provinceName +state.address.cityName + state.address.countyName +state.address.detailInfo
   }
  }
}