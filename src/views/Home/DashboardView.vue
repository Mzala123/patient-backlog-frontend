<template>
  <v-container fluid>
    <v-row>
   
        <v-col cols="12" md="4">
         <v-card elevation="1" class="mt-3">
          <v-row>
            <v-col cols="12" md="3" class="pl-4">
              <v-icon icon="mdi-lock" x-large color="blue" class="mt-2"> mdi-account-multiple </v-icon>
            </v-col>
            <v-col cols="12" md="9">
               <div style="font-size:12px;" class="pl-1">Number of users</div>
              <h1>{{ users }}</h1>
            </v-col>
          </v-row>
           </v-card>
        </v-col>

     <v-col cols="12" md="4">
         <v-alert elevation="1" border="left" colored-border="deep-purple" color="deep-purple">
          <v-row>
            <v-col cols="12" md="3" class="pl-4">
              <v-icon icon="mdi-lock" x-large color="blue" class="mt-2">mdi-human-male-female-child </v-icon>
            </v-col>
            <v-col cols="12" md="9">
               <div style="font-size:12px;" class="pl-1">Number of Patients</div>
              <h1>{{ patients }}</h1>
            </v-col>
          </v-row>
         </v-alert>
        </v-col>

      
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import config from "@/config";

export default {
  name: "DashboardView",
  data() {
    return {
      users: null,
      patients: null
    };
  },
  methods: {
    get_count_users() {
      axios.get(`${config.API_URL}/count_of_users`).then((response) => {
        if (response.status === 200) {
          this.users = response.data;
          console.log(this.users);
        }
      });
    },

    get_count_patients(){
        axios
          .get(`${config.API_URL}/count_all_patients`)
          .then((response)=>{
            if(response.status === 200){
                this.patients = response.data
                console.log(this.patients)
            }
          })
    }
  },

  mounted() {
    this.get_count_users()
    this.get_count_patients()
  },
};
</script>