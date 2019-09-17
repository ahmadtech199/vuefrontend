<template>
  <v-app>
    <Navbar />
    <v-content class="backgroundapp">
      <router-view></router-view>
      <!-- <HelloWorld/> -->
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  },
  data: () => ({
    //
  })
};
</script>
<style scoped>
.backgroundapp {
  background-color: #eeeeee;
}
</style>