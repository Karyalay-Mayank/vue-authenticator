<template>
	<div :class="buttonContainer">
		<button
			:class="btnPrimary"
			:type="type"
		>{{btnText}}</button>
	</div>
</template>
<script>
	/* eslint-disable */
	export default {
		name: "ButtonField",

		props: {
			btnPrimary: {
				type: String,
				required: false
			},
			type: {
				type: String,
				default: "text",
				required: true
			},
			btnText: {
				type: String,
				default: "",
				required: false
			},
			buttonContainer: {
				type: String,
				required: false
			}
		}
	}
</script>