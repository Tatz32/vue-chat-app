<template>
  <v-app>
    <div class="loginbox">
      <v-card id="loginForm">
        <v-card-title class="logintitle"> <h2>Sign Up Form</h2></v-card-title>
        <p>
          <v-card-subtitle><h3>Fill in the form</h3></v-card-subtitle>
        </p>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="username"
            :rules="userName"
            label="Username"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            required
          >
          </v-text-field>

          <v-btn
            color="success"
            class="loginbtn"
            :disabled="isValid"
            :style="{ width: '150px' }"
            @click="submit"
          >
            Sign Up
          </v-btn>

          <v-btn color="primary" :style="{ width: '150px' }"> Clear </v-btn>
          <v-row justify="center" class="vRow">
            <v-btn class="vBtn" color="blue" text to="login"
              >Log In from here</v-btn
            >
          </v-row>
          <v-row justify="center">
            <v-alert dense outlined type="error" v-if="errorMsg">{{
              errorMsg
            }}</v-alert>
          </v-row>
        </v-form>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
export default {
  data: () => ({
    valid: true,
    email: "",
    username: "",
    errorMsg: "",
    userName: [
      (v) => !!v || "Username is required",
      (v) => (v && v.length <= 15) || "This username is too long",
    ],

    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
  }),
  methods: {
    submit() {
      console.log("Okay");
      const auth = getAuth();
      createUserWithEmailAndPassword(
        auth,
        this.email,
        this.password,
        this.username
      )
        .then(async (userCredential) => {
          console.log("Perfect", userCredential);
          await updateProfile(auth.currentUser, {
            displayName: this.username,
          });
          localStorage.msg = "Welcome to this App!!" 
          await this.$router.push("/welcome", () => {});
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          this.errorMsg = "Failed to register ";
        });
    },
  },
  computed: {
    isValid() {
      //console.log(this.valid);
      return !this.valid;
    },
  },
};
</script>
<style scoped>
#loginForm {
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;
  margin-top: 130px;
  margin-left: 100px;
  margin-right: 100px;
}
.loginbox {
  width: 70%;
  margin: 0px auto;
}
.logintitle {
  display: inline-block;
}
.loginbtn {
  margin-right: 20px;
}
.vRow {
  margin-top: 20px;
}
</style>