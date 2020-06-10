import _Config from './config.js'
import _Util from './util.js'
import _Store from '@/store/index.js'

export default {
	// 全局配置
	common: {
		baseUrl: _Config.baseUrl,
		header: {
			'Content-Type': 'application/json;charset=UTF-8'
		},
		data: {},
		method: 'GET',
		dataType: 'json',
		token: true
	},
	request(options = {}) {
		options.url = this.common.baseUrl + options.url
		options.header = options.header || this.common.header
		options.data = options.data || this.common.data
		options.method = options.methods || this.common.method
		options.dataType = options.dataType || this.common.dataType
		options.token = options.token === false ? false : this.common.token
		
		if(options.token) {
			let token = _Util.getStorage('token')
			// 二次验证
			if(!token) {
				uni.showToast({title: '请登录', icon: 'none'});
				return uni.reLaunch({
					url: '/pages/login/login.vue'
				})
			}
			// 往header头中添加token
			options.header.token = token
		}
		// 请求
		return new Promise((res, rej) => {
			uni.request({
				...options,
				success: (result) => {
					// 服务端失败
					if(result.statusCode !== 200){
						if (options.toast !== false) {
							uni.showToast({
								title: result.data.data || '服务端失败',
								icon: 'none'
							});
						}
				    // token不合法，直接退出登录
		        if(result.data.data === 'Token 令牌不合法!'){
			         $store.dispatch('logout')
		        }
							return rej(result.data) 
					}
					// 其他验证...
					// 成功
					let data = result.data.data
					res(data)
				},
				fail: (error) => {
						uni.showToast({ title: error.errMsg || '请求失败', icon: 'none' });
						return rej(error)
				}
			})
		})
	},
	// get请求
	get(url,data = {},options = {}){
			options.url = url
			options.data = data
			options.method = 'GET'
			return this.request(options)
	},
	// post请求
	post(url,data = {},options = {}){
			options.url = url
			options.data = data
			options.method = 'POST'
			console.log(options)
			return this.request(options)
	},
	// delete请求
	del(url,data = {},options = {}){
			options.url = url
			options.data = data
			options.method = 'DELETE'
			return this.request(options)
	}
}