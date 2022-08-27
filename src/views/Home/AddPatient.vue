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
                        
                        Add patient details
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
                            label="Firstname"
                            v-model="firstname"
                            required
                            ></v-text-field>

                             <v-text-field
                            class="mr-5 ml-5 pt-1 mt-1"
                            v-model="lastname"
                            dense
                            outlined
                            label="Lastname"
                            required
                            ></v-text-field>

                              <v-select
                                v-model="gender"
                                dense
                                outlined
                                class="mr-5 ml-5 pt-1 mt-1"
                                :items="genderOptions"
                                label="Gender"
                                required
                                
                                ></v-select>
                            
                            <v-text-field
                            class="mr-5 ml-5 pt-1 mt-1"
                            v-model="district"
                            dense
                            outlined
                            label="Home district"
                            required
                            ></v-text-field>

                            <v-text-field
                            class="mr-5 ml-5 pt-1 mt-1"
                            dense
                            outlined
                            v-model="village"
                            label="Home village"
                            required
                            ></v-text-field>

                               <v-select
                               v-model="occupation"
                                dense
                                outlined
                                class="mr-5 ml-5 pt-1 mt-1"
                                :items="occupationOptions"
                                label="Occupation"
                                required
                               
                                ></v-select>

                              <v-text-field
                            v-model="birthdate"
                            class="mr-5 ml-5 pt-1 mt-1"
                            dense
                            outlined
                            label="Date of birth"
                            type="date"
                            required
                            ></v-text-field>

                           <v-btn
                            color="primary"
                            class="mr-5 ml-5 pt-1 mt-4 mb-5"
                            elevation="1"
                            @click="create_patient_record"
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


export default {
    name: 'AddPatient',
  
    data(){
        return{
             genderOptions: ['Male', 'Female'],
             occupationOptions: ["Doctor","Accountant",
             "Software Developer","Midwife-Nurse",
             "Human Resource Manager", "Economist", 
             "Data Analyst","Systems Analyst", 
             "Plumber", "Carpenter"],

             firstname:null,
             lastname: null,
             gender: null,
             district: null,
             village: null,
             occupation: null,
             birthdate: null //(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            
        }
    },
    methods: {
          create_patient_record(){
            if(!this.firstname || !this.lastname || !this.gender){
                   swal({
                    text: "Please fill in all required fields!",
                    icon: "warning",
                    dangerMode: true,
                   })
            }else{
              axios
               .post(`${config.API_URL}/patient`,
                {
                    firstname:this.firstname,
                    lastname: this.lastname,
                    gender: this.gender,
                    district: this.district,
                    village: this.village,
                    occupation: this.occupation,
                    birthdate: this.birthdate
                } 
               ).then((response)=>{
                      if(response.status === 201){
                          //this.loading = false
                          swal({
                                title:"Information",
                                text: "User Created Successfully!",
                                icon: "success",
                             })
                             .then((ok=>{
                              if(ok){
                                 this.$router.push({path:"/list_patient"})
                              }      
                             }))
                      }
               }).catch((error)=>{
                    const{status} = error.response
                    if(status === 404){
                       swal({
                                text: "Failed to create patient record!",
                                icon: "warning",
                                dangerMode: true,
                             })
                    }else{
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