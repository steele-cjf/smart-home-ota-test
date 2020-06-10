export default {
	getStorage(key) {
		return uni.getStorageSync(key)
	},
	
	setStorage(key, data) {
		return uni.setStorageSync(key, data)
	},
	
	removeStorage(key) {
		return uni.removeStorageSync(key)
	}
}