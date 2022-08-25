<template>
	<div :class="headerTextClass">
		<h3>{{headerText}}</h3>
		<div class="header-link">
			<ButtonField type="button" btnText="Logout" buttonContainer="buttonContainer" btnPrimary="btnPrimary" @click="logout" />
		</div>
	</div>
</template>

<script>
	/* eslint-disable */
	import ButtonField from './Button.vue' 
	export default {
		name: "AuthenticatedHeader",

		components: {
			ButtonField
		},

		props: {
			headerText: {
				type: String,
				required: false
			},
			headerTextClass: {
				type: String,
				required: false
			}
		},
		methods: {
		  logout () {
		    this.$store.dispatch('logout')
		      .then(() => {
		      	console.log('Sign Out')
		        this.$router.push('/')
		    }).catch((err) => {
		    	console.log(err)
		    })
		  }
		}
	};
</script>

<style scoped>
	.buttonContainer {
		display: flex;
		justify-content: space-around;
		margin: 1rem 0rem 1rem 0rem;
	}
	.header-link /deep/ .btnPrimary {
		cursor: pointer;
		background: #fff;
		border: 2px solid #330732;
		padding: 0.5rem 1rem;
		border-radius:  15px;
		color: #000;
		font-size: 16px;
		text-decoration: none;
		text-transform: none;
		outline: none;
	}
</style>