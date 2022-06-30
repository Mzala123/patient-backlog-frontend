<template>
     <v-container fluid>

     </v-container>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import swal from 'sweetalert'
export default {
    name:'PatientList',
    data(){
        return{
            patients: [],
        }
    },

    methods: {
        get_patient_list(){
            axios
              .get(`${config.API_URL}/patient`)
              .then((response)=>{
                if(response.status === 200){
                    this.patients = response.data
                    console.log(this.patients)
                }
              }).catch((error)=>{
                  const{status} =error.response
                  if(status === 404){
                        swal({
                                text: "An error occured while retrieving data!",
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
          
    },

    mounted(){
        this.get_patient_list()
    }
}
</script>