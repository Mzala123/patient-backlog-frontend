<template>
  <div class="home">
   <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld message="Welcome to Your Vue.js App"/>
    <p> welcome to homepage </p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
