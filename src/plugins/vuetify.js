import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
     icons:{
        iconfont: 'md' | 'fa'
     },
     theme:{
        themes: {
            background: '#D7DFDF'
            // font-family: "Poppins" ,
            // font-size: 12px;
        }
     },
     font:{
        font: "Poppins" 
        //fontsize
     }
});
