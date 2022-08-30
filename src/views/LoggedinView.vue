<template>
	<div v-if="isAuthenticated">
		<AuthenticatedHeader headerText="Vue Authenticator" headerTextClass="header" />
		<h1>Welcome, {{user.first_name}} {{user.last_name}}</h1>
	</div>
</template>

<script>
	/* eslint-disable */
	import AuthenticatedHeader from '../components/ui/Header.vue'
	import { mapGetters } from 'vuex'
	export default {
	  name: 'LoggedinView',

	  components: {
	    AuthenticatedHeader
	  },

	  computed: {
	    ...mapGetters(["isAuthenticated", "user"]),
	  },

	  mounted() {
	  	if(!this.isAuthenticated) {
	  		this.$router.push('/');
	  	}
	  }
	}
</script>

<style scoped>
	div /deep/ .header {
		display: flex;
		justify-content: space-between;
		padding: 0.1rem 2rem;
		background: linear-gradient(to top right,#330732 50%,#d04b11);
		color: #fff;/*#2c3e50*/
	}
</style>