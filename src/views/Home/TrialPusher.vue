<template>
  <v-container>
    <v-card>
      <div></div>
      <v-form>
        <div v-if="!joined">
          <v-text-field
            class="mr-5 ml-5 pt-4 mb-2"
            outlined
            dense
            v-model="current_user"
            label="Join"
          >
          </v-text-field>
          <v-btn
            color="primary"
            class="mr-5 ml-5 pt-1 mb-4"
            elevation="1"
            @click="vote"
          >
            Join
          </v-btn>
        </div>
        <div v-if="joined">
          <div>
            <v-textarea  class="mr-5 ml-5 pt-4 mb-2"
             v-on:keyup.enter="sendMessage"
             v-model="text"
             filled name="input-7-4" label="Filled textarea">
            </v-textarea>
          </div>
        </div>
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
      joined: false,
      current_user: null,
      text:""
    };
  },

  methods: {
    vote() {
      console.log(this.current_user);
      this.joined = true;
      // this.socket = io('http://localhost:3000')
    },
    sendMessage(){
      console.log(this.text)
      //this.$socket
    }
  },

  created() {},
};
</script>