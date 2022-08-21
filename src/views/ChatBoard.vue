<template>
  <v-app id="inspire">
    <SideBar />
    <v-main>  
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <v-subheader>{{ card }}</v-subheader>
              <v-list two-line>
                <template v-for="(data, index) in messages">
                  <v-list-item :key="index">
                    <v-list-item-avatar color="grey darken-1">
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-subtitle class="msg">
                        {{ data.message }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    v-if="index !== 8"
                    :key="`divider-${index}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
        <br />
        <v-textarea
          append-icon="mdi-comment"
          class="mx-2"
          label="What's Up?"
          rows="2"
          auto-grow
          v-model="content"
        ></v-textarea>
        <v-btn class="mr-4" type="submit" :disabled="invalid" @click="submit">
          submit
        </v-btn>
        <v-btn @click="clear"> clear </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import db from "../firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  getFirestore,

} from "firebase/firestore";
import SideBar from "../components/layouts/SideBar.vue";

export default {
  components: {
    SideBar,
  },
  data: () => ({
    messages: [],
    content: "",
    cards: ["Today"],
    roomId: "",
   
  }),

  async created() {
   const db = getFirestore();
   console.log(db)
    this.roomId = this.$route.query.room_id;
    console.log(this.roomId);
    
    const roomRef = await getDocs(collection(db, "rooms"));
    roomRef.forEach(async(doc) => {
      const room = await doc.data();
      console.log(room);

      const messages = await getDocs(collection(db, "messages"));
      messages.forEach(async(doc)=>{
        const msg = await doc.data()
        console.log(msg);

    const snapshot = await getDocs(collection("rooms"));
    snapshot.forEach(async doc => {
      // console.log(`${doc.data().message}`);
       this.messages.push(doc.data());

      })
      
    /*
if (docSnap.exists()) {
  // Convert to City object
  const city = docSnap.data();
  // Use a City instance method
  console.log(city.toString());
} else {
  console.log("No such document!");
}*/

    /* const roomRef = await getDocs(collection(db, "rooms"))
    console.log(roomRef)
    roomRef.forEach((doc) => {
      // console.log(`${doc.data().message}`);
      this.messages.push(doc.data());
    });*/
    /*
       const getData = collection(db, "chats");
       await getDocs(getData).then(value=>{
        console.log(value.docs.map((doc)=>({...doc.data()})))
       })
*/
 
    });
  },
  )},
  computed: {
    invalid() {
      if (!this.content) {
        return true;
      }
      return false;
    },
  },
  methods: {
    clear() {
      console.log("Clear");
      this.content = "";
    },
    submit() {
      try {
        const docRef = addDoc(collection(db, "chats"), {
          message: this.content,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
  },
};
</script>


<style scoped>
.msg {
  text-align: left;
}
</style>