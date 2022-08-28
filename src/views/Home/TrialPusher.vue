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

        <div class="list-container">
        <div v-for="message in messages" :key="message.id">
           <b>
             {{message.user}}
           </b>
            : {{message.text}} 
           </div>
        </div>
          <div class="text-input-container">
            <v-textarea
             rows="3"
              class="text-message"
              v-on:keyup.enter="sendMessage"
              v-model="text"
              filled
              dense
        
              label="Filled textarea"
            >
            </v-textarea>
          </div>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import io from 'socket.io-client'
export default {
  data() {
    return {
      socket: null,
      joined: false,
      current_user: null,
      text: "",
      messages: []
    };
  },

  methods: {
    vote() {
      console.log(this.current_user);
      this.joined = true;
      this.socket = io('http://localhost:3000')
      this.socket.on('message:received', (data)=>{
        this.messages = this.messages.concat(data)
      })
    },
    sendMessage() {
      console.log(this.text);
       this.addMessage()
       this.text =""
    },

    addMessage(){
      const message = {
        id: new Date().getTime(),
        text: this.text,
        user: this.current_user
      }

      this.messages = this.messages.concat(message)
      this.socket = io('http://localhost:3000')
      this.socket.emit("message", message)
    }
  },

  created() {},
};
</script>

<style scoped>
.text-input-container {
  height: 50vh;
}
.text-message {
  width: 100%;
  position: absolute;
  /* height: 30px; */
  padding: 10px;
  bottom: 0px;
  box-sizing: border-box;
}
</style>