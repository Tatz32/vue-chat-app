<template>
  <v-app id="inspire">
    <SideBar />
    <v-app-bar app shrink-on-scroll>
      <v-toolbar-title>Room List</v-toolbar-title>
      <CreateRoom/>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
             <v-col v-for="room in rooms" :key="room.id" cols="4">
            <router-link :to="{ path: '/chatboard', query: { room_id: room.id } }">
    <v-avatar size="100">
      <img
        src="https://cdn.vuetifyjs.com/images/john.jpg"
        alt="John"
      >
    </v-avatar>
            </router-link>
            <h3>  {{ room.name }}</h3>
          </v-col>
          <!--<v-col v-for="n in 24" :key="n" cols="4">
            <router-link :to="{ path: '/chatboard', query: { user_id: n } }">
              <v-avatar color="primary" size="93"> </v-avatar>
            </router-link>
            <p>User Id : {{ n }}</p>
          </v-col>-->
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "../components/layouts/SideBar.vue";
import { getDocs, getFirestore, collection, query } from "firebase/firestore";
import CreateRoom from "../components/modal/CreateRoom.vue"

export default {
  components: {
    SideBar,
    CreateRoom
  },
  mounted() {
    this.getRooms();
  },
  data() {
    return {
        rooms: [],
    };
  },
  methods: {
    async getRooms() {
        this.rooms= [];
      const db = getFirestore();
      const q = query(collection(db, "rooms"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
       /* const data = {
            name: doc.data().name,
            createdAt : doc.data().createdAt
        }*/
        const data = {...doc.data()}
        data.id = doc.id
        console.log(data);
        this.rooms.push(data);
      });
    },
  },
};
</script>

<style scoped>
.successMsg {
  padding: 10px 100px 10px 100px;
  margin-top: 30px;
}
</style>