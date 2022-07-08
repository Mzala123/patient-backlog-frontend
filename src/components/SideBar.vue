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

          <v-menu   
          
          v-model="menu"
          bottom
          right
          rounded  
          offset-y
          transition="scale-transition"
          origin="top left"
        >
          <template v-slot:activator="{ on }">
            <v-chip
              pill
              v-on="on"
            >
              <v-badge
              bordered
              bottom
              color="green accent-5"
              dot
              offset-x="10"
              offset-y="10"
            >
                  <v-icon left>
                mdi-account-circle-outline
              </v-icon>
            </v-badge>

               {{username}}
            </v-chip>
            
          </template>
          <v-card width="300">

            <v-list>
            
            <v-list-item>
                <v-list-item-avatar>
                   <v-badge
                    bordered   
                    bottom
                    color="green accent-5"
                    dot
                    offset-x="10"
                    offset-y="10"
                  >
                  <v-icon left>
                    mdi-account-circle-outline
                  </v-icon>
                  </v-badge>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title> {{username}}</v-list-item-title>
                  <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    icon
                    @click="menu = false"
                  >
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
             <v-divider></v-divider>
            <v-list>
              <v-list-item @click="signOut">
                <v-list-item-action class="">
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-action>
                <v-list-item-subtitle>Sign-out</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>

       

  </v-app-bar>
      <router-view></router-view>
  </v-app>
</template>

<script>
export default {
    data(){
        return {
           username: null,
           email: null,
           drawer: true,
           menu:false,
           selectedItem: 0,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', name:'home-dashboard'},
      { title: 'Add Patients', icon: 'mdi-human-male-female', name:'add-patient'},
      { title: 'Patients List', icon: 'mdi-human-male-female', name:'patients-list'},
      { title: 'User List', icon: 'mdi-table-of-contents', name: 'users-list'}
     
    ],   
    mini: true,

        }
    },
    methods: {
       signOut(){
        this.$router.push({path:'/'})
       }
    },

    mounted(){
       this.username = JSON.parse(sessionStorage.getItem("username"))
       console.log(this.username)
       this.email = JSON.parse(sessionStorage.getItem("email"))
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