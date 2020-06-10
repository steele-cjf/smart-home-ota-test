<template>
	<view>
		<view class="content flex flex-column">
		  <image class="logo" src="/static/logo.png"></image>
		  <view class=".uni-center">
			  <text class="font-md text-info font-weight-bolder font-italic">SMART HOME</text>
		  </view>
	  </view>
		<view  class="px-3">
			<input type="number" class="font border-bottom" placeholder="请输入手机号" style="height: 100rpx;" v-model="username"/>
			<view class="flex align-center border-bottom">
				<input type="password" placeholder="请输入短信验证码" style="height: 100rpx; flex: 1" v-model="registerCode"/>
				<button type="default" class="button-text" :disabled="isMobile" @tap="getMsgCode">获取验证码</button>
			</view>
			<input type="password" class="font border-bottom" placeholder="请输入密码" style="height: 100rpx;" v-model="password"/>
			<input type="password" class="font border-bottom" placeholder="再次确认密码" style="height: 100rpx;" v-model="rePassword"/>
			<view class="pt-5">
				<view class="main-bg-color rounded p-1 text-center"
				hover-class="main-bg-hover-color">
					<text class="text-white font-md" @tap="bindRegister">注册</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
  import _Request from '@/common/lib/request.js'

	export default {
		data() {
			return {
				username: '',
				registerCode: '',
				password: '',
				rePassword: '',
				isMobile: false
			}
		},
		methods: {
			//校验手机格式
			checkMobile(mobile){
				return RegExp(/^1[34578]\d{9}$/).test(mobile);
			},
			getMsgCode() {
				if (!this.username.length) {
					uni.showToast({title: '请输入手机号',icon: 'none'});
					return;
				}
				if (!this.checkMobile(this.username)){
					uni.showToast({title: '手机号格式错误',icon: 'none'});
					return;
				}
				const data = {
					mobile: this.username
				}
				uni.request({
				    url: 'http:10.10.11.244:9700/auth/sendRegistrationSms',
						method:'POST',
				    data: data,
				    header: {
				      'Content-Type': 'application/json;charset=UTF-8'
				    },
				    success: (res) => {
							console.log(res.data)
							this.isMobile = true
							uni.showToast({
								icon: 'none',
								title: '验证码已发送，请注意查收！'
							})
							setTimeout(function(){
								this.isMobile = false
							}, 60000)
				    }
				});
			},
			bindRegister() {
				if (!this.registerCode.length) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				if (this.password !== this.rePassword) {
					uni.showToast({
						icon: 'none',
						title: '输入密码不一致'
					});
					return;
				}
				const data = {
					username: this.username,
					password: this.password,
					registerCode: this.registerCode
				}
				uni.request({
				    url: 'http:10.10.11.244:9700/auth/register',
						method:'POST',
				    data: data,
				    header: {
				      'Content-Type': 'application/json;charset=UTF-8'
				    },
				    success: (res) => {
				        console.log(res.data);
				    }
				});
				// /auth/sendRegistrationSms  mobile  code
				// _Request.post('/auth/login', data, {})
				// .then(res => {
				// 	this.$store.dispatch('login', res)
				// 	uni.showToast({
				// 		title: '登录成功',
				// 		icon: 'none'
				// 	});
				// 	return uni.switchTab({
				// 		url:"/pages/tabbar/index/index"
				// 	})
				// })
			}
		},
		onReady() {
			
		}
	}
</script>

<style>
.content {
	align-items: center;
	margin-top: 120rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}
.logo {
	width: 121rpx;
	height: 121rpx;
}
.title {
	font-size: 18px;
	color: #707070;
}
.button-text {
	background-color: #FFFFFF;
	color: #0084ff;
  padding-right: 10px;
	font-size: 16px;
}
.button-text[disabled] {
	background-color: #fff;
}
.button-text:after {
	border: none;
}
</style>
