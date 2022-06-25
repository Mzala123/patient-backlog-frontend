<template>
  <v-container fluid class="my-application mt-10">
   <v-row align-content="center" justify="center" class="ml-10 mr-10">
             <v-col cols="12" sm="5" md="5">
               <v-card class="elevation-1" id="auth-inner" :loading="loading">
                  <template slot="progress">
                <v-progress-linear color="#1DA1F2"
                  height="4"
                  indeterminate
                ></v-progress-linear>
              </template>
                       <v-row>
                          <v-col cols="12" sm="12" md="12">
                             <v-card-text class="mt-8">
                              <h3 class="text-center display-1 #1DA1F2 --text text">
                                   Create Account                          
                                 </h3>
                                     <v-card-title class="d-flex align-center justify-center">
                                       <!-- src="@/assets/lin_logo.png" -->
                                   <v-img
                                    
                                     max-height ="60px"
                                     max-width = "60px"
                                     alt="logo"
                                     class="me-1"
                                   > 
                                   </v-img>
                                  </v-card-title>
                                    <h4 class="text-center  mb-4" >
                                      Ensure Your email for registration
                                    </h4>
                                     <v-form>
                              
                                   <v-text-field
                                    dense
                                    outlined
                                    label="Username"
                                    v-model="username"
                                    prepend-inner-icon="person"
                                    color="#1DA1F2"
                                  ></v-text-field>


                                   <v-text-field
                                    @keyup="check_email_available"
                                    v-model="email"
                                    dense
                                    outlined
                                    label="Email"
                                    
                                    prepend-inner-icon="email"
                                    color="#1DA1F2"
                                  ></v-text-field>

                                      <v-text-field
                                    dense
                                    outlined
                                    label="Password"
                                    v-model="password"
                                    prepend-inner-icon="lock"
                                    color="#1DA1F2"
                                  ></v-text-field>

                                      <div class="text-center mb-4">
                                        <v-btn v-on:click="signUp" color='#1DA1F2' block dark>
                                              SIGN UP
                                        </v-btn>
                                      </div>
                                      <v-divider class="mb-3"></v-divider>
                                       <h4 class="text-center mt-1 mb-2"> 
                                         Already have an account? 
                                            <v-btn  x-small outlined="" color='#1DA1F2' dense dark @click="step++">
                                             Sign In
                                           </v-btn>
                                       </h4>
                                 </v-form>

                               </v-card-text> 
                               <div class="text-center">
                                   
                               </div>

                          </v-col> 
                       </v-row>
               </v-card>

             </v-col>
               
           </v-row>
 </v-container>
</template>

<script>
import axios  from 'axios'
import config from '@/config';
export default{
    name: "registerView",
    data(){
        return {
            show1:false,
            user: [],
            username: null,
            email: null,
            password:null,
            loading: false,
       rules: {
        required: value => !!value || 'Required.',
        emailMatch: () => (`The email and password you entered don't match`),
      },
        }
    },
    methods:{

        check_email_available(){
             axios
               .post(`${config.API_URL}/read_one_user`,{
                email: this.email
               }).then((response)=>{
                if(response.data.status === 200){  
                   console.log("Email already in use with another account!")
                }
               })
        },

        signUp(){
          if(!this.name || !this.email || !this.password){
             alert("Please fill in all fields");
          }else{
               this.loading = true
                axios
                .post(`${config.API_URL}/register`,{
                    name: this.name,
                    email: this.email,
                    password: this.password
                }).then((response)=>{
                    if(response.data.status === 200){
                        alert("Account created successfully")
                    }else if(response.data.status === 400){
                        alert("There was an error creating a user account");
                    }    
                }).catch((err)=>{
                   alert("error creating an account", err)
                   console.log(err)
                })
          }
      
        },

        
    },
    mounted() {

    }
      
    
}
</script>
