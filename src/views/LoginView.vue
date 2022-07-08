<template>
  <v-container fluid class="my-application mt-10">
   <v-row align-content="center" justify="center" class="ml-10 mr-10">
             <v-col  class="col-md-4 sm-12 xs-12">
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
                              <h1 class="text-center #1DA1F2 --text text">
                                   FHIR HealthCare                       
                                 </h1>
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
                                   
                                     <v-form>
                            
                                   <v-text-field
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
                                    type="password"
                                    v-model="password"
                                    prepend-inner-icon="lock"
                                    color="#1DA1F2"
                                    @keypress.enter="signIn"
                                  ></v-text-field>

                                      <div class="text-center mb-4">
                                        <v-btn v-on:click="signIn" color='#1DA1F2' block dark>
                                              Login
                                        </v-btn>
                                      </div>
                                      <v-divider class="mb-3"></v-divider>
                                       <h4 class="text-center mt-1 mb-2"> 
                                         Don't have an account? 
                                           <router-link v-bind:to="'/register'">
                                             Sign Up
                                           </router-link>
                            
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
import axios from 'axios'
import config from '@/config'
import swal from 'sweetalert';

export default{
      name: 'LoginView',
      data(){
        return{
            show1:false,
            user: [],
            username: null,
            email: null,
            password:null,
            loading: false,
            res: null,
        }

      },

      methods:{
           signIn(){
              if(!this.email || !this.password){
                swal({
                    text: "Please fill in all required fields!",
                    icon: "warning",
                    dangerMode: true,
                })
              }else{
                this.loading = true
                axios
                   .post(`${config.API_URL}/login`,{
                       email: this.email,
                       password: this.password
                   }
                   ).then((response)=>{
                     if(response.status === 200){
                                sessionStorage.setItem("Authorization", response.data.token)
                                sessionStorage.setItem("username", JSON.stringify(response.data.name))
                                // console.log(sessionStorage.getItem("username"))
                                sessionStorage.setItem("email", JSON.stringify(response.data.email))
                                this.loading = false
                                this.$router.push({path:"/home_dashboard"})        
                     }
                     
                   }).catch((error)=>{
                           const{status} = error.response
                           if(status === 401){
                             this.loading = false
                             swal({
                                text: "Incorrect credentials!",
                                icon: "warning",
                                dangerMode: true,
                             })
                           }else{
                            this.loading = false
                            swal({
                                text: "Check your network connection!",
                                icon: "warning",
                                dangerMode: true,
                             })
                           }
                   })
              }
           }
      }
}
</script>

