<template>
  <v-container fluid>
    <v-row>
   
         <v-col cols="12" md="6">
         <v-alert elevation="1" border="left" colored-border color="success accent-4">
          <v-row>
            <v-col cols="12" md="3" class="pl-4">
              <v-icon icon="mdi-lock" x-large color="blue" class="mt-2">mdi-account-multiple</v-icon>
            </v-col>
            <v-col cols="12" md="9">
               <div style="font-size:12px;" class="pl-1">Number of users</div>
              <h2>{{ users }}</h2>
            </v-col>
          </v-row>
         </v-alert>
        </v-col>


     <v-col cols="12" md="6">
         <v-alert elevation="1" border="left" colored-border color="primary accent-4">
          <v-row>
            <v-col cols="12" md="3" class="pl-4">
              <v-icon icon="mdi-lock" x-large color="blue" class="mt-2">mdi-human-male-female-child </v-icon>
            </v-col>
            <v-col cols="12" md="9">
               <div style="font-size:12px;" class="pl-1">Number of Patients</div>
              <h2>{{ patients }}</h2>
            </v-col>
          </v-row>
         </v-alert>
        </v-col>
    </v-row>
    
     <v-row class="ma-0 pa-0">
              <v-col cols="12" md="6" sm="6"
          >
          <v-card>
          <div id="chart">
              <apexchart 
              type="pie" width="400" 
              :options="chartOptions" 
              :series="series"></apexchart> 
          </div>  
          </v-card>   
        </v-col>
         </v-row>
   
  </v-container>
</template>

<script>
import axios from "axios";
import config from "@/config";
//import apexchart from 'vue-apexcharts'
import VueApexCharts from 'vue-apexcharts'


export default {
  name: "DashboardView",
  components:{
  apexchart: VueApexCharts
  },

  data() {
    return {
      users: null,
      patients: null,
      patient: [],
      series: [],
      count: 0,

      chartOptions: {
            chart: {
              width: 380,
              height: 400,
              type: 'pie',
            },
            labels: [],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }],
            }
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
    },

    get_count_by_gender(){
        axios
          .get(`${config.API_URL}/patients_count_by_gender`)
          .then((response)=>{
            if(response.status == 200){
                this.patient = response.data
                console.log(this.patient)
                for(this.count=0; this.count<this.patient.length; this.count++){
                    this.chartOptions.labels.push(this.patient[this.count]._id)
                    this.series.push(this.patient[this.count].patientCount)
                }

            }
          })
    }

  },

  mounted() {
    this.get_count_users()
    this.get_count_patients()
    this.get_count_by_gender()
  },
};
</script>