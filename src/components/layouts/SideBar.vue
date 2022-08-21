<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-sheet color="grey lighten-4" class="pa-4">
      <v-avatar color="indigo">
        <input
          type="file"
          @change="uploadIcon"
          ref="fileInput"
          style="display: none"
        />
        <v-icon dark @click="changeIcon" v-if="!photoUrl"> mdi-account-circle </v-icon>
        <img :src="photoUrl" v-if="photoUrl" @click="changeIcon">
      </v-avatar>

      <h3 class="username">{{ auth && auth.displayName }}</h3>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="[icon, text, to] in links" :key="icon" :to="to" link>
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="signout">
        <v-list-item-icon>
          <v-icon> mdi-logout </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title> Logout </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  mounted() {
    this.auth = JSON.parse(sessionStorage.getItem('key','user'));
    this.photoUrl = this.auth.photoURL
    //console.log(this.auth)
    //console.log(this.photoURL)
  },

  data: () => {
    return {
      drawer: null,
      links: [
        ["mdi-inbox-arrow-down", "Inbox", "/"],
        ["mdi-send", "Send", "/about"],
        ["mdi-delete", "Trash", "/about"],
        ["mdi-alert-octagon", "Spam", "/"],
      ],
      auth: 0,
      photoUrl: ""
    };
  },
  methods: {
    signout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("Signout is done");
          this.$router.push("/login");
          console.log(auth.currentUser, {
            displayName: this.username,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeIcon() {
      this.$refs.fileInput.click();
    },
    uploadIcon() {
      const user = this.getAuth();
      if (!user) {
        sessionStorage.removeItem('key',"user");
        this.$router.push("/", () => {});
      }

      const file = this.$refs.fileInput.files[0];
      const filePath = `/user/${file.name}`;
      console.log(file);
      const storage = getStorage();
      const storageRef = ref(storage, filePath);
      uploadBytes(storageRef, file).then(async (snapshot) => {
        console.log(snapshot);
        const storage = getStorage();
        await getDownloadURL(ref(storage, filePath)).then((photoUrl) => {
          
          console.log(photoUrl);
          const auth = getAuth();
          updateProfile(auth.currentUser, {
            photoURL: photoUrl,
          }).then((photoUrl)=>{
            this.auth.photoURL = photoUrl,
          sessionStorage.setItem("user", JSON.stringify(this.auth));
          this.photoUrl= photoUrl
          console.log(this.photoUrl)
          })
         
          
        });
      });
    },
    getAuth() {
      const auth = getAuth();
      return onAuthStateChanged(auth, (user) => {
        console.log(user);
        return user;
      });
    },
  },
};
</script>