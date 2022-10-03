<template>


  <q-page class="flex flex-center">
    <TestComponent :text="data.quote"/>

    <q-no-ssr>
     <ChartDeneme/>
    </q-no-ssr>

    <h5>
      {{data.quote  }} {{value}} 
    </h5>
    
    <q-btn color="primary" @click="deleteCookie">Çıkış</q-btn>

  </q-page>

</template>

<script>
import axios from 'axios'

export default {


  preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {

    return new Promise((resolve, reject) => {

      axios.get("https://animechan.vercel.app/api/random").then((res) => {
        resolve(store.commit('moduleExample/getData', res.data))
      })
      // store.dispatch('moduleExample/fetchItem')
      // setTimeout(() => {
      //   resolve()
      // }, 2000)

    })


  }
}

</script>

<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';
import ChartDeneme from '../components/ChartDeneme.vue'
import TestComponent from 'src/components/TestComponent.vue';
import { useQuasar } from 'quasar'

const $q = useQuasar()
let value=ref('')
if($q.cookies.has('token')){
   value = ref($q.cookies.get('token'))
  console.log('cookie',value.value);
}

const deleteCookie=()=>{
  $q.cookies.remove('token')
  window.location.reload();
}

const store = useStore()
const data = ref(store.state.moduleExample.deneme)
console.log(data.value);



const option = ref({
  title: {
    text: "Traffic Sources",
    left: "center"
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"]
  },
  series: [
    {
      name: "Traffic Sources",
      type: "pie",
      radius: "55%",
      center: ["50%", "60%"],
      data: [
        { value: 335, name: "Direct" },
        { value: 310, name: "Email" },
        { value: 234, name: "Ad Networks" },
        { value: 135, name: "Video Ads" },
        { value: 1548, name: "Search Engines" }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
});


</script>

<style>
.chart {
  height: 500px
}
</style>
