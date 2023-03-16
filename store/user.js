export default {
  namespaced:true,
  state:{
    address:JSON.parse(uni.getStorageSync('address') || '{}')
  },
  mutations:{
    //更新收获地址
    updateAddress(state,value) {
      state.address = value
      this.commit('m_user/setStorageAddress')
    },
    //持久化存储
    setStorageAddress(state) {
      uni.setStorageSync('address',JSON.stringify(state.address))
    }
  },
  getters:{
   getAllAddress(state) {
     if(!state.address.provinceName) return ''
      return  state.address.provinceName +state.address.cityName + state.address.countyName +state.address.detailInfo
   }
  }
}