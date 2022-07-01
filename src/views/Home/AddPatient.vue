<template>
     <v-container fluid>

        <v-row justify="center" >
           <v-col  class="col-md-8 sm-8">
                  <v-card class="mt-10" elevation="1">
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
                            required
                            ></v-text-field>

                             <v-text-field
                            class="mr-5 ml-5 pt-1 mt-1"
                            dense
                            outlined
                            label="Lastname"
                            required
                            ></v-text-field>

                              <v-select
                               
                                dense
                                outlined
                                class="mr-5 ml-5 pt-1 mt-1"
                                :items="genderOptions"
                                label="Gender(mandotory)"
                                required
                                append-icon="mdi-menu-down-outline"
                                ></v-select>


                           <v-btn
                            color="primary"
                            class="mr-5 ml-5 pt-1 mt-4 mb-5"
                            elevation="1"
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
export default {
    name: 'AddPatient',
  
    data(){
        return{
             genderOptions: ['Male', 'Female']
            
        }
    }
}
</script>