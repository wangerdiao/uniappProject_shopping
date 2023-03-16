 import {mapGetters} from 'vuex'
 export default {
   computed:{
     ...mapGetters('m_cart',['getTotal'])
   },
   watch:{
     getTotal() {
       this.getCartNumber()
     }
   },
   methods:{
     //获取数字徽标的回调
     getCartNumber() {
       uni.setTabBarBadge({
         index:2,
         text:this.getTotal+'',//text值要为字符串
       })
     }
   },
   onShow() {
     if(this.getTotal!=0) {
       this.getCartNumber()
     }
   },
 }