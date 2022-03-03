<template>
    
    <v-card
       elevation="1"
      :loading="loading"
      class="mx-auto my-14"
      max-width="350"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
  
      <v-img
        height="100"
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      ></v-img>
  
      <v-card-title>Patient Account</v-card-title>
      <v-divider class="mx-4"></v-divider>
  
     <v-card-text>
            <v-text-field
              label="Fullname"
              outlined
            ></v-text-field>
            <v-text-field 
              height="25"
              label="Useremail"
              outlined
            ></v-text-field>  
         <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            label="Password"
          ></v-text-field>
        
     </v-card-text>
    </v-card>
 
</template>