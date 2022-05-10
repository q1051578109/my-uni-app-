import {mapGetters} from 'vuex'

export default {
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	watch: {
		total(){
			this.setBadge()
		}
	},
	onShow() {
		this.setBadge()
	},
	methods: {
		setBadge() {
			// 设置徽标
			uni.setTabBarBadge({
				index: 2,
				// 徽标内容必须是字符串
				text: this.total + ''
			})
		}
	}
}
