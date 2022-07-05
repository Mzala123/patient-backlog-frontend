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
          
          <template #[`item.actions`]="{item}">
                <v-icon
                    small
                    class="mr-2"
                    @click="addHealthRecord(item._id)"
                    >
                    mdi-plus-box
                    </v-icon>
                    <v-icon
                    small
                    @click="viewHealthRecord(item._id)"
                    >
                    mdi-eye
               </v-icon>
        
      </template> 
          
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

            <!-- Add health record dialog box!-->

      <v-dialog
            v-model="dialog"
            max-width="600px"
          >
            <v-card>
         
              <v-system-bar
                      dark
                      color="secondary"
                      style="color: white; font-weight:bold; height:40px"
                      
                  >
                     Add health record
                </v-system-bar>
            <v-form
                  lazy-validation
             >
                
               <v-card-text>
                 <v-text-field
                  class="mr-3 ml-3 pt-1 mt-3"
                  dense
                  outlined
                  label="Weight(kgs)"
                  v-model="weight"
                  required
                  >
                 </v-text-field>

                 <v-text-field
                  class="mr-3 ml-3 pt-1"
                  dense
                  outlined
                  label="Height(metres)"
                  v-model="height"
                  required
                  >
                 </v-text-field>

                 <v-text-field
                  class="mr-3 ml-3 pt-1"
                  dense
                  outlined
                  label="Temperature reading"
                  v-model="temperature"
                  required
                  >
                 </v-text-field>

                   <v-select
                    class="mr-3 ml-3 pt-1"
                    dense
                    outlined
                    :items="diagnosisList"
                    v-model="diagnosis"
                    label="Diagnosis"
                    required 
                  >
                  </v-select>
              </v-card-text>
              
                <v-card-actions>
                  <v-spacer></v-spacer>
            
                 <v-btn
                  class="mr-2 ml-4 mb-1"
                  color="error"
                  outlined
                  @click="close"
                >
                  Close
                </v-btn>

                 <v-btn
                  class="mr-5 mb-1"
                  color="primary"
                  outlined
                  @click="createHealthRecord"
                >
                  Save
                </v-btn>

                </v-card-actions>
            </v-form>
             
            </v-card>
          </v-dialog>

        <!--end of  Add health record dialog box!-->
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
      ],
      dialog: false,
      weight: null,
      height: null,
      temperature: null,
      diagnosis: null,
      patientId: null,
      diagnosisList: [
        {
          text: 'Certain infectious and parasitic diseases',
          value:'A00-B99|Certain infectious and parasitic diseases'
        },
        {
          text: 'Neoplasms',
          value:'C00-D49|Neoplasms'
        },
        {
          text:'Diseases of the blood and blood-forming organs and certain disorders involving the immune mechanism',
          value:'D50-D89|Diseases of the blood and blood-forming organs and certain disorders involving the immune mechanism'
        },

        {
          text:'Endocrine, nutritional and metabolic diseases',
          value: 'E00-E89|Endocrine, nutritional and metabolic diseases'
        },
      {
        text:'Mental, Behavioral and Neurodevelopmental disorders',
        value:'F01-F99|Mental, Behavioral and Neurodevelopmental disorders'
      },
      {
        text:'Diseases of the nervous system',
        value:'G00-G99|Diseases of the nervous system'
      },
      {
        text:'Diseases of the eye and adnexa',
        value:'H00-H59|Diseases of the eye and adnexa'
      },
      {
       text:'Diseases of the ear and mastoid process',
       value:'H60-H95|Diseases of the ear and mastoid process'
      },
      {   text:'Diseases of the circulatory system',
          value:'I00-I99|Diseases of the circulatory system'
      },
     {
       text:'Diseases of the respiratory system',
       value:'J00-J99|Diseases of the respiratory system'
     },

     {
      text:'Diseases of the digestive system',
      value:'K00-K95|Diseases of the digestive system'
     },
    {
      text:'Diseases of the skin and subcutaneous tissue',
      value:'L00-L99|Diseases of the skin and subcutaneous tissue'
    },
    {
    text:'Diseases of the musculoskeletal system and connective tissue',
    value:'M00-M99|Diseases of the musculoskeletal system and connective tissue'
    },

    {
      text:'Diseases of the genitourinary system',
      value:'N00-N99|Diseases of the genitourinary system'
    },

    {
      text:'Pregnancy, childbirth and the puerperium',
      value:'O00-O9A|Pregnancy, childbirth and the puerperium'
    },
    {
      text:'Certain conditions originating in the perinatal period',
      value:'P00-P96|Certain conditions originating in the perinatal period'
    },
    {
      text:'Congenital malformations, deformations and chromosomal abnormalities',
      value:'Q00-Q99|Congenital malformations, deformations and chromosomal abnormalities'
    },
    {
       text:'Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified',
       value:'R00-R99|Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified'
    },
    {
      text:'Injury, poisoning and certain other consequences of external causes',
      value:'S00-T88|Injury, poisoning and certain other consequences of external causes'
    },
    {
      text:'Codes for special purposes',
      value:'U00-U85|Codes for special purposes'
    },
    {
      text:'External causes of morbidity',
      value:'V00-Y99|External causes of morbidity'
      },
    {
      text:'Factors influencing health status and contact with health services',
      value:'Z00-Z99|Factors influencing health status and contact with health services'
    }
      ]
    }
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

    addHealthRecord(patient_id){
      console.log(patient_id)
      this.patientId = patient_id
      this.dialog = true

    },

    viewHealthRecord(patient_id){
      console.log(patient_id)
    },

    createHealthRecord(){
        console.log("ee tandigwileni "+this.patientId)
        if(!this.weight || !this.height || !this.temperature || !this.diagnosis){
             swal({
                  title:'Warning',
                  text: "Please fill in all required fields!",
                  icon: "warning",
                })
        }else{
                  axios
          .post(`${config.API_URL}/patient/`+this.patientId+'/add_patient_diagnosis',
          {
               weight:this.weight,
               height:this.height,
               temperature:this.temperature,
               diagnosis:this.diagnosis
          }
          ).then((response)=>{
            if(response.status === 201){
                swal({
                    title:"Information",
                    text: "Health record added",
                    icon: "success"
                }).then((ok)=>{
                  if(ok){
                      this.weight = null
                      this.height = null
                      this.temperature = null,
                      this.diagnosis= null
                  }
                })
            }
          }).catch((error)=>{
             const{status} = error.response
             if(status === 400){
                swal({
                        text: "Failed to add health record ",
                        icon: "error",
                        dangerMode: true
                      });
             }else{
                   swal({
                        text: "Check your internet connection!",
                        icon: "error",
                        dangerMode: true
                      });
             }
          })
        }

    },

    close () {
      this.dialog = false
    },


  },

  mounted() {
    this.get_patient_list();
  },
};
</script>