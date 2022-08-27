<template>
  <v-container>
    <v-card>
      <div></div>
      <v-form>
        <v-btn
          color="primary"
          class="mr-5 ml-5 pt-1 mb-4"
          elevation="1"
          @click="vote"
        >
          Vote
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script> 
//import io from 'socket.io-client'
export default {
  data() {
    return {
      socket: null,
      joined: false
    }
  },
  
  methods: {
    vote() {
      this.joined = true
     // this.socket = io('http://localhost:3000')
    },
    
  },

  created(){

  }
};
</script>