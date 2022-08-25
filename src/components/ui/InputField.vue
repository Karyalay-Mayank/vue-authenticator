<template>
	<div>
		<label>{{labelText}}</label>
		<input
			:class="inputBox"
			:value="modelValue"
			v-bind="$attrs"
			:type="type"
			:placeholder="placeholder"
			@input="$emit('update:modelValue',$event.target.value)"
		/>
	</div>
</template>
<script>
	/* eslint-disable */
	export default {
		name: "InputField",

		props: {
			labelText: {
				type: String,
				required: false
			},
			inputBox: {
				type: String,
				required: false
			},
			modelValue: {
				type: String,
				default: "",
				required: true
			},
			type: {
				type: String,
				default: "text",
				required: true
			},
			placeholder: {
				type: String,
				default: "",
				required: false
			}
		},
		emits: ['update:modelValue'],
	}
</script>