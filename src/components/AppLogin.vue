<template>
	<LoginHeader loginHeaderClass="headerContainer" loginHeader="Welcome Back!!"></LoginHeader>
	<div class="form-container">
		<form @submit.prevent="submit">
			<div class="input-div">
				<InputField type="text" v-model="userID" placeholder="User name" labelText="Username" inputBox="inputBox" />
			</div>
			<div class="input-div">
				<InputField type="password" v-model="password" placeholder="Password" labelText="Password" inputBox="inputBox" />
			</div>
			
			<ButtonField type="submit" btnText="Submit" buttonContainer="buttonContainer" btnPrimary="btnPrimary" :disabled="isFormEmpty" />
		</form>
	</div>
</template>

<script>
	/* eslint-disable */
	import { mapGetters } from 'vuex';
	import InputField from './ui/InputField.vue'
	import ButtonField from './ui/Button.vue'
	import LoginHeader from './ui/LoginHeader.vue'
	export default {
		name: "AppLogin",
		components: { LoginHeader, InputField, ButtonField },
		props:{
		  loginHeader:{
		    type: String,
		    required: true,
		    default: null
		  }
		},
		data() {
			return {
				userID: '',
				password: '',
			};
		},

		computed: {
		  isFormEmpty () {
		    if((this.userID && this.password) === '') {
		    	return true;
		    } return false;
		  }
		},

		methods: {

			submit(){
				let data = {
					userID: this.userID,
					password: this.password
				};
				console.log("Data Value", data)
				this.$store.dispatch('login', data).then(() => {
					this.$router.push('/dashboard');
				}).catch((err) => {
					console.log(err)
				})
			}	
		}
	};
</script>

<style scoped>
	.headerContainer {
		margin: 0;
		padding: 0.5rem 1rem;
		background: linear-gradient(to top right,#330732 50%,#d04b11);
		color: #fff;
		text-align: left;
		border-radius: 5px 5px 0px 0px;
		box-shadow: 0 1px 4px 0 rgb(0 0 0 / 30%);
	}

	form {
		align-items: center;
	}

	.input-div{
		display: flex;
		flex-direction: column;
		margin: 2rem 0rem;
		padding: 0rem 1.5rem;
	}

	.input-div>div /deep/ .inputBox {
		border: 2px solid #bbb;
		border-radius:  5px;
		padding: 10px 15px;
		font-size: 16px;
	}

	.buttonContainer {
		display: flex;
		justify-content: space-around;
		margin: 1rem 0rem 1rem 0rem;
	}

	form /deep/ .btnPrimary {
		cursor: pointer;
		background: #fff;
		border: 2px solid #330732;
		padding: 0.5rem 2rem;
		border-radius:  15px;
		color: #000;
		font-size: 16px;
		text-decoration: none;
		text-transform: none;
		outline: none;
	}
</style>