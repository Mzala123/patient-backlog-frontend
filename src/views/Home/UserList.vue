<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col class="col-md-12 sm-12">
        <v-card elevation="1">
          <v-card-title>
            User List
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
            :items="users"
            :search="search"
          >
            
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
import config from "@/config";
export default {
  name: "UserList",
  data() {
    return {
      search: "",
      isloading: false,
      users: [],

      headers: [
        {text:"Username", value:"name"},
        {text:"Email", value:"email"}
      ]
    };
  },

  methods: {
    get_userlist() {
      this.isloading = true;
      axios
        .get(`${config.API_URL}/list_of_users`)
        .then((response) => {
          if (response.status === 200) {
            this.users = response.data;
            this.isloading = false;
            console.log(this.users);
          }
        })
        .catch((error) => {
          const { status } = error.response;
          if (status === 404) {
            this.isloading = false;
            swal({
              text: "An error occured while retrieving data!",
              icon: "warning",
              dangerMode: true,
            });
          } else {
            this.isloading = false;
            swal({
              text: "Check your network connection!",
              icon: "warning",
              dangerMode: true,
            });
          }
        });
    }
  },

  mounted(){
    this.get_userlist()
  }
};
</script>