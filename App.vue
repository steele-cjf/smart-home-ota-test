<script>
	import _Util from '@/common/lib/util.js'
	
	export default {
		onLaunch: function() {
			console.log('App Launch');
			this.loadExecution()
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			loadExecution: function(){
				/**
				 * 获取本地存储中launchFlag的值
				 * 若存在，说明不是首次启动，直接进入首页；
				 * 若不存在，说明是首次启动，进入引导页；
				 */
				try {
					// 获取本地存储中launchFlag标识
					const value = uni.getStorage('launchFlag');
					const token = _Util.getStorage('token')
					console.log(token)
					// const value = false;
					if (value) {
						// launchFlag=true直接跳转到首页
						if(!token){
							// 用户未登录
							uni.showToast({ title: '请先登录', icon: 'none' });
							uni.reLaunch({
							  url: '/pages/login/login'
							})
						} else {
							uni.switchTab({
								url: '/pages/tabbar/index/index'
							});
						}
					} else {
						// launchFlag!=true显示引导页
						uni.reLaunch({
						  url: '/pages/guide/guide'
						});
					}
				} catch(e) { 
					// error 
					uni.setStorage({ 
						key: 'launchFlag', 
						data: true, 
						success: function () {
							console.log('error时存储launchFlag');
						} 
					});
				}
			}
		}
	}
</script>

<style>
  @import './common/common.css';
</style>
