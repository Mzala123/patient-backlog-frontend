<template>
    
         <v-container fluid>

        <v-row justify="center" >
           <v-col  class="col-md-8 sm-8">
                  <v-card class="mt-10" elevation="1" outlined>
                    <v-system-bar
                        class="mr-5 ml-3 pt-1"
                        dark
                        color="white"
                        style="color: black; font-weight:semi-bold; height:40px; font-size: 16px;"
                        
                     >
                     <!-- <v-icon
                        small
                        color="grey"
                    >
                        mdi-note-text
                    </v-icon> -->
                        
                        Update user details
                      </v-system-bar>
                       
                       <v-divider class="mr-5 ml-5 pt-1 ">

                       </v-divider>
                      <v-form
                          
                            lazy-validation
                        >
                           <v-text-field
                            class="mr-5 ml-5 pt-1 mt-5"
                            dense
                            outlined
                            label="username"
                            v-model="user.name"
                            required
                            ></v-text-field>

                           <v-btn
                            color="primary"
                            class="mr-5 ml-5 pt-1 mt-4 mb-5"
                            elevation="1"
                            @click="update_user"
                          >
                            Save
                          </v-btn>

                      </v-form>

                 </v-card>
           </v-col>
         </v-row>

     </v-container>

</template>

<script>
import axios from 'axios'
import config from '@/config'
import swal from 'sweetalert'
import store from '@/store'

export default{
   name:"settingsView",
   data(){
    return{
         
         user: {
            name: null,
         },
         
    }
   },
   methods: {
      update_user(){
          var userId = this.user._id
          console.log("The store is "+this.username)
          axios
            .put(`${config.API_URL}/update_one_user/${userId}`,
            {
              name: this.user.name
            }).then((response)=>{
               if(response.status === 200){
                    
                    store.commit("setUser", this.user.name)
                    console.log(this.user.name)
                   swal({
                          title:"Information",
                          text: "User Created Successfully!",
                          icon: "success",
                       })
               }
            })
            
      },
     set_user_details(){
        let userId = JSON.parse(sessionStorage.getItem("_id"))
        console.log(userId)
        axios
          .get(`${config.API_URL}/read_user_by_id/`+userId)
          .then((response)=>{
              if(response.status === 200){
                    this.user = response.data
              }
          })
     }
   },
   mounted(){
       this.set_user_details()
   }
}

</script>