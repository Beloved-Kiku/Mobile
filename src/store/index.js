import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        PicPd: true,
        PicSrc: 'https://pic.imgdb.cn/item/62bc73be1d64b07066f3d5d2.jpg'
    },
    getters: {},
    mutations: {
        //将默认图片显示与否的判断存储与Vuex中
        Pic(state, value) {
            value = false
            state.PicPd = value
        },
        SendPic(state, value) {
            state.PicSrc = value
        }
    },
    actions: {},
    modules: {

    }
})