<template>
    
    <v-card
       elevation="1"
      :loading="loading"
      class="mx-auto my-14"
      max-width="350"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
  
      <!--<v-img
        height="100"
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      ></v-img> -->
  
      <v-card-title>Patient Account</v-card-title>
      <v-divider class="mx-4"></v-divider>
     <form ref="form" v-on:submit.prevent="signUp" enctype="multipart/form-data">
     <v-card-text>
            <v-text-field v-model="name" height="25" label="Fullname" outlined dense></v-text-field>
            <v-text-field v-model="email" height="25" label="Useremail" outlined dense></v-text-field> 
            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              @click:append="show1 = !show1"
            ></v-text-field>
        
         <v-btn small color="primary" width="320" :loading="loading" type="submit">
              Register
            </v-btn>
     </v-card-text>
     </form>
    </v-card>
 
</template>

<script>
import axios  from 'axios'
/*import variables from '../views/variables.js'*/
export default{
    name: "registerView",
    data(){
        return {
            show1:false,
            user: [],
            name: "",
            email: "",
            password:"",
            loading: false,
       rules: {
        required: value => !!value || 'Required.',
       /* min: v => v.length >= 8 || 'Min 8 characters',*/
        emailMatch: () => (`The email and password you entered don't match`),
      },
        }
    },
    methods:{
        signUp(){
          if(!this.name || !this.email || !this.password){
             alert("Please fill in all fields");
          }else{
               this.loading = true
                axios
                .post("http://localhost:3000/api/register",{
                    name: this.name,
                    email: this.email,
                    password: this.password
                }).then((response)=>{
                    if(response.data.status === 200){
                        alert("Account created successfully")
                    }else if(response.data.status === 400){
                        alert("There was an error creating a user account");
                    }    
                }).catch()
          }
      
        }
    },
    mounted() {

    }
      
    
}
</script>
