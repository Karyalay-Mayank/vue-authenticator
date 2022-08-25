<template>
	<h1 :class="loginHeaderClass">
		{{loginHeader}}
	</h1>
</template>

<script>
	export default {
		name: "LoginHeader",

		props: {
			loginHeader: {
				type: String,
				required: false
			},
			loginHeaderClass: {
				type: String,
				required: false
			},
		}
	};
</script>