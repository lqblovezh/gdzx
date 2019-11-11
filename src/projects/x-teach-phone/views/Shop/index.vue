<script>
import {mapState,mapMutations} from 'vuex'
import loadmoreMixin from '@/mixins/loadmore'
export default {
	mixins: [loadmoreMixin],
	data() {
		return {
			shopItems: [], // 商品列表
			selectedItems: [], // 选中的商品
			isSelectAll: false // 是否全部选中
		}
	},
	mounted() {
		window.sessionStorage.setItem('cart', [])
		this.fetch()
	},
	computed: {
		selectedItemsLen() {
			return this.selectedItems.length
		},
		totalPrice () {
			const arr = this.clone_list.filter(item => this.selectedItems.indexOf(item.id) > -1)
			let sum = 0
			for (let i of arr) {
				sum += Number(i.course_info.price)
			}
			return sum === 0 ? 0 : sum.toFixed(2)
		},
		clone_list () {
			return this.list.map(item => ({...item, btns: [{action: 'clear', text: '删除', color: 'red'}] }))
		}
	},
	watch: {
		selectedItems(val) {
			this.isSelectAll = val.length==this.clone_list.length?true:false
		}
	},
	methods: {
		...mapMutations('common', ['setOrderInfo']),
		queryList (params) {
			return this.$service.cart.getCart({...params})
		},
		selectOne(itemId) {
			let idIdx = this.selectedItems.indexOf(itemId)
			if (idIdx >= 0) {
				this.selectedItems.splice(idIdx, 1)
			} else {
				this.selectedItems.push(itemId)
			}
		},
		selectAll() {
			this.isSelectAll = !this.isSelectAll
			if (this.isSelectAll) {
				this.selectedItems = []
				this.clone_list.forEach(item => {
					this.selectedItems.push(item.id)
				}, this)
			} else {
				this.selectedItems = []
			}
		},
		afford() {
			const goods = this.getSelectedItem()
			if (goods.length < 1) {
				return
			}
			window.sessionStorage.setItem('cart', JSON.stringify(goods))
			this.setOrderInfo(goods)
			this.$router.push({name: 'order'})
		},
		getSelectedItem () {
			return this.clone_list.filter(item => {
				return this.selectedItems.indexOf(item.id) !== -1
			})
		},
		del(btn, index) {
			this.$MessageBox.confirm('是否删除？').then(action=> {
				const {goods_id} = this.clone_list[index]
				this.$service.cart.del({
					ids: goods_id
				}).then(res => {
					// 
				}).catch(console.error)
			})
		}
	}
}
</script>
<template lang="pug">
v-wrapper(title="购物车" class="page-of-cart" :main-type="3" )
	.empty-shop.f14.text-center(v-if="!clone_list || clone_list.length === 0")
		.img-shop_bg
		p.c-9 购物车是空的~
		button.circle(@click="$router.push({path: 'home'})") 去逛逛
	.cart-content(v-else)
		cube-scroll(
			ref="scroll"
			class="cart-list"
			:options="options"
		)
			cube-swipe
				transition-group(name="swipe" tag="ul")
					li.swipe-item-wrapper(
						v-for="(item,index) in clone_list"
						:key="index"
					)
						cube-swipe-item(
							ref="swipeitem"
							:btns="item.btns"
							:index="index"
							@btn-click="del"
						)
							.item-inner
								.radio-box
									input(type="checkbox" :checked="selectedItems.indexOf(item.id) >= 0" @click="selectOne(item.id)")
									label
								img(:src="item.course_info.img" @click="$goByName('course', {params: {course_id: item.course_info.id}})")
								.text
									h2.f14.c-4.ell {{item.course_info.course_name}}
									p.ell ￥{{item.course_info.price}}
	.shop-afford.c-bg-f(v-show="list && list.length > 0")
		.radio-box
			input(type="checkbox" :checked="isSelectAll" @click="selectAll")
			label
		span.select-all 全选
		p.st-total 合计:
			span.st-total__price ￥{{totalPrice}}
			span.st-tips (可获得积分{{parseInt(totalPrice)}})
		button(@click="afford") 结算({{selectedItemsLen}})
</template>
<style lang="stylus" scoped>
.page-of-cart
	.cart-content
		padding-bottom 1.2rem
		height 100%
		box-sizing border-box
		.item-inner
			display flex
			margin 0 0.3rem
			padding 0.3rem 0
			align-items center
			border-bottom 1px solid #e9eef0
			.radio-box
				width 0.3rem
				height 0.3rem
				border-radius 50%
			img
				margin 0 0.18rem 0 0.12rem
				width 1.4rem
				height 1.4rem
			.text
				h2
					margin 0.1rem 0 0.54rem
				p
					color #ff5d16

.empty-shop
	margin-top 2.8rem
	.img-wrap
		width 3.2rem
		height 2.8rem
	>p
		margin-top 0.2rem
		margin-bottom 0.58rem
	>button
		width 4.4rem
		height 0.6rem
		line-height 0.6rem
		border none
		color #FFF
		background-color #3496e1
		padding 0
.shop-afford
	position absolute
	bottom 0
	display flex
	align-items center
	width 100%
	height 1rem
	padding-left 0.3rem
	font-size 14px
	z-index 10
	&:before
		position absolute
		top -0.2rem
		content ''
		display block
		height 0.2rem
		width 100%
		margin-left -0.3rem
		background-color #F4F5F7
	.radio-box
		input[type="checkbox"]
			margin 0
			margin-right 10px
	.select-all
		margin-right 0.3rem
	.st-total
		flex 1
		.st-total__price
			color #ff5d16
		.st-tips
			font-size 12px
			color #999999
	button
		width 1.8rem
		height 100%
		padding 0
		font-size 16px
		border none
		outline none
		color #FFF
		text-align center
		background-color #ff5d16
.radio-box
	position relative
	label
		display inline-block
		position absolute
		top 0
		left 0
	input
		position relative
		opacity 0
		z-index 9
</style>
