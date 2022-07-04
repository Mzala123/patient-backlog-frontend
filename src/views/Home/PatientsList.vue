<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col class="col-md-12 sm-12">
        <v-card elevation="1">
          <v-card-title>
            Patient List
            <v-spacer></v-spacer>
            <v-text-field
              dense
              outlined
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-divider></v-divider>
          <v-data-table
            :loading="isloading"
            loading-text="Fetching... Please wait"
            :headers="headers"
            :items="patients"
            :search="search"
          
          >
          
          <template #[`item.actions`]="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="addHealthRecord(item)"
                    >
                    mdi-plus-box
                    </v-icon>
                    <v-icon
                    small
                    @click="viewHealthRecord(item)"
                    >
                    mdi-eye
               </v-icon>
        
      </template> 
          
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import config from "@/config";
import swal from "sweetalert";
export default {
  name: "PatientList",
  data() {
    return {
      patients: [],
      search: "",
      isloading: false,
      headers: [
        {text:"Firstname", value: 'firstname'},
        {text:"Lastname", value: 'lastname'},
        {text:"Gender", value: 'gender'},
        {text:"Occupation", value: 'occupation'},
        {text:"Home District", value: 'district'},
        {text:"Village", value: 'village'},
        { text: 'Actions', value: 'actions', sortable: false },
      ]
    };
  },

  methods: {
    get_patient_list() {
      this.isloading = true
      axios
        .get(`${config.API_URL}/patient`)
        .then((response) => {
          if (response.status === 200) {
            this.patients = response.data;
            this.isloading = false
            console.log(this.patients);
          }
        })
        .catch((error) => {
          const { status } = error.response;
          if (status === 404) {
            this.isloading = false
            swal({
              text: "An error occured while retrieving data!",
              icon: "warning",
              dangerMode: true,
            });
            
          } else {
            this.isloading = false
            swal({
              text: "Check your network connection!",
              icon: "warning",
              dangerMode: true,
            });
            
          }
        });
    },
  },

  mounted() {
    this.get_patient_list();
  },
};
</script>