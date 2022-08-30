<template>
  <div class="login-container" v-if="!isAuthenticated">
    <AppLogin/>
  </div>
</template>

<script>
  import AppLogin from '@/components/AppLogin.vue'
  import { mapGetters } from 'vuex';
  export default {
    name: 'HomeView',

    components: {
      AppLogin
    },

    computed: {
      ...mapGetters(["isAuthenticated"])
    },

    mounted() {
      if(this.isAuthenticated) {
        this.$router.push('/dashboard');
      }
    }
  }
</script>

<style scoped>
  .login-container {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 30%);
    border-radius: 5px;
  }
</style>