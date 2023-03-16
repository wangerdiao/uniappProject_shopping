export default {
  namespaced:true,//开启命名空间
  state:{
    //每个商品对象包含如下6个属性
    //{goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state,goods_isChacked}
    cart:JSON.parse(uni.getStorageSync('cart') || '[]'), //购物车的数据用来存储购物车的数据
  },
  mutations:{
    //加入购物车的回调
    addToCart(state,goods) {
      //根据提交的商品的id，查询购物车是否有这件商品
      //如果不存在返回undefined，否则就是查找到的商品对象
      const findResult = state.cart.find(x => x.goods_id===goods.goods_id) 
      if(!findResult) {
        state.cart.push(goods)
      }else {
        findResult.goods_count++
      }
      this.commit('m_cart/saveTostorage')
    },
    //持久化存储
    saveTostorage(state) {
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    //修改复选框goods_isChacked状态的回调
    setGoods_isChacked(state,goods) {
      const {goods_id,goods_isChacked} = goods
      const findResult = state.cart.find(x => x.goods_id === goods_id)
      if(findResult) {
        findResult.goods_isChacked = goods_isChacked
        this.commit('m_cart/saveTostorage')
      }
    },
    //修改商品的选择数量
    updateGoodsCount(state,goods) {
      const {goods_id,goods_count} = goods
      const findResult = state.cart.find(x => x.goods_id === goods_id)
      if(findResult) {
        findResult.goods_count = goods_count
        this.commit('m_cart/saveTostorage')
      }
    },
    //删除购物车商品的回调
    deleteGoods(state,goods) {
      const {goods_id} = goods
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      this.commit('m_cart/saveTostorage')
    },
    //复选框全选按钮
    updateAllChecked(state,value) {
      state.cart.forEach(item => item.goods_isChacked = value)
      this.commit('m_cart/saveTostorage')
    }
  },
  getters:{
    //获取商品数量
    getTotal(state) {
      return state.cart.reduce((total,item) => total += item.goods_count,0)
      return sum
    },
    //获取勾选商品的数量
    getCheckedTotal(state) {
      //选中的商品的数量
       const checkedGoods = state.cart.filter(x => x.goods_isChacked === true)
       let sum = 0
       checkedGoods.forEach(item => sum+=item.goods_count)
       return sum
    },
    //判断商品是否全部选中
    isAllGoodsChecked(state) {
      const checkedGoods = state.cart.filter(x => x.goods_isChacked === true)
      return checkedGoods.length===state.cart.length
    },
    //获取选中商品的价格
    getTotalPrice(state) {
          //得到选中的商品
      const checkedGoods = state.cart.filter(x => x.goods_isChacked === true)
      const price = checkedGoods.reduce((total,item) => 
        total += item.goods_count * item.goods_price,0
      )
      return price.toFixed(2)
    }
  }
}
