<template>
 <v-app id="inspire">
   <v-navigation-drawer
        v-model="drawer"
        app
      >

    <v-card
      class="mx-auto"
      max-width="260"
      height="100%"
      tile
     
    >
      <v-list dense nav>
         <v-subheader  class="text-center mx-auto mt-2 mb-2 ml-2">
        <v-avatar  size="80">
              <!-- <v-img
              src="@/assets/lin_logo.png"
              max-height ="30px"
              max-width = "30px"
              alt="logo"
              class="me-1"
          > 
          </v-img> -->
          <h3 class="mr-2">FHIR int.</h3> 
        </v-avatar>
        </v-subheader>
        <v-divider class="mb-2"></v-divider>
        <v-list-item-group
          v-model="selectedItem"
           color="#1DA1F2"
           id="list"
           active-class="border"
     
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="{name: item.name}"
          >
            <v-list-item-icon>
              <v-icon  v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
   </v-navigation-drawer>

    <v-app-bar app 
       color="white"
       flat elevation="1">
        <v-app-bar-nav-icon  v-on:click="drawer = !drawer">
          <v-icon>mdi-menu</v-icon>
        </v-app-bar-nav-icon> 
         <v-toolbar-title>Fhir Health Care</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
  
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

  </v-app-bar>
      <router-view></router-view>
  </v-app>
</template>

<script>
export default {
    data(){
        return {
           drawer: true,
           selectedItem: 0,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', name:'home-dashboard'},
      { title: 'Add Patients', icon: 'mdi-human-male-female', name:'add-patient'},
      { title: 'Patients List', icon: 'mdi-human-male-female', name:'patients-list'},
      { title: 'User List', icon: 'mdi-table-of-contents', name: 'users-list'}
      //{ title: 'Sign Out', icon: 'logout', name: 'sign-out'}*/
    ],   
    mini: true,
        }
    },
    methods: {
       
    }
   
}
</script>

<style>
#navbar-card{
    height: 100%;
}
.border{
  margin: 0 1px ;
}

#inspire{
     font-family: "Poppins" !important;
     font-size: 14px;
}

.border {
 border-left: 2px solid #1DA1F2; 
}

</style>