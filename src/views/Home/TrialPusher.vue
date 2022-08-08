<template>
  <v-container>
    <v-card>
      <div></div>
      <v-form>
        <div class="ml-5 pt-3">
          <p>
            <input type="radio" v-model="os" id="windows" value="Windows" />
            <label for="windows"> Windows</label>
          </p>
          <p>
            <input type="radio" v-model="os" id="linux" value="Linux" />
            <label for="linux"> Linux</label>
          </p>

          <p>
            <input type="radio" v-model="os" id="ubuntu" value="Ubuntu" />
            <label for="ubuntu"> Ubuntu</label>
          </p>
        </div>
        <v-btn
          color="primary"
          class="mr-5 ml-5 pt-1 mb-4"
          elevation="1"
          @click="vote"
        >
          Vote
        </v-btn>
      </v-form>

      <div class="ml-5 pb-4 pt-1">Os {{ os }}</div>

      <div id="chart">
        <apexchart
          type="bar"
          height="350"
          width="400"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>

    </v-card>
  </v-container>
</template>

<script>
// import axios from "axios";
// import config from "@/config";
import io from 'vue-socket.io'
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },

  data() {
    return {
      os: null,
      socket: null,
      count: 0,
      series: [{ data: [0, 0, 0]}],
      chartOptions: {
        chart: {
          type: "bar",
          height: 300,
        },

        dataLabels: {
          enabled: false,
        },
         xaxis: {
              categories: ['Windows', 'Linux', 'Ubuntu']
            }
      },
    };
  },

  created(){
     this.socket = io()
  },

  methods: {
    vote() {

    },
  },
};
</script>