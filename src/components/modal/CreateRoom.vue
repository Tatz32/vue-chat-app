<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            New Chatroom
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">New Chatroom</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Room Name*"
                    v-model="name"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="onSubmit"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import {
  collection,
  addDoc,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
export default {
  data: () => ({
    dialog: false,
    name: "",
  }),
  methods: {
    async onSubmit() {
      const db = getFirestore();
  const docRef =  addDoc(collection(db, "rooms"), {
  name: this.name,
  createdAt : Timestamp.now(),
});
console.log("Document written with ID: ", docRef.name);
this.dialog = false
    },
  },
};
</script>