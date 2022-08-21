<template>
  <v-app id="inspire">
    <SideBar />
    <v-app-bar app shrink-on-scroll>
      <v-toolbar-title>User List</v-toolbar-title>
      
      <v-spacer></v-spacer>
     <!-- <v-alert dense text type="success" class="successMsg" v-if="message">
        {{ message }}
      </v-alert>-->
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col v-for="n in 24" :key="n" cols="4">
            <router-link :to="{ path: '/chatboard', query: { user_id: n } }">
              <v-avatar color="primary" size="93"> </v-avatar>
            </router-link>
            <p>User Id : {{ n }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "../components/layouts/SideBar.vue";
export default {
  components: {
    SideBar,
  },
  data() {
    return {
     // message: "",
    };
  },
 //mounted() {
   // if (localStorage.msg) {
     // this.message = localStorage.msg;
      //localStorage.msg = "";
    //}
  //},
};
</script>
<style scoped>
.successMsg {
  padding: 10px 100px 10px 100px;
  margin-top: 30px;
}
</style>