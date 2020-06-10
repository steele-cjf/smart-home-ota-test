import _Config from '@/common/lib/config.js'
import _Util from '@/common/lib/util.js'

export default {
	state: {
		user: false
	},
	mutations: {},
	actions: {
		login({ state, dispatch }, user) {
			state.user = user
			_Util.setStorage('token', user.accessToken)
			_Util.setStorage('user', JSON.stringify(user))
		},
		logout({ stage }) {
			// 清除登录状态
			state.user = false
			// 清除本地存储数据
			_Util.removeStorage('token');
			_Util.removeStorage('user');
			// 跳转到登录页
			uni.reLaunch({
				url:"/pages/login/login.vue"
			})
		}
	}
}