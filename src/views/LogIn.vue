<template>
  <v-app>
    <div class="loginbox">
      <v-card id="loginForm">
        <v-card-title class="logintitle"> <h2>Log In Form</h2></v-card-title>
        <p>
          <v-card-subtitle><h3>Fill in the form</h3></v-card-subtitle>
        </p>

        <v-form ref="form" v-model="valid" lazy-validation>
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
            @click="successSubmit"
          >
            Log In
          </v-btn>

          <v-btn color="primary" :style="{ width: '150px' }"> Clear </v-btn>

          <template>
            <v-row justify="center" class="vRow">
              <v-btn color="red" text to="signup"
                >sign up from here</v-btn
              ></v-row
            ></template
          >

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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  data: () => ({
    valid: true,
    email: "",
    errorMsg: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
  }),
  methods: {
    successSubmit() {
      console.log("Hi");
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          console.log("Success", userCredential);
          const auth = {
            displayName : userCredential.user.displayName,
            emai: userCredential.user.email,
            uid : userCredential.user.uid,
            refreshToken : userCredential.user.refreshToken,
            photoURL : userCredential.user.photoURL
          };
          console.log(auth.displayName);
          sessionStorage.setItem("user", JSON.stringify(auth));
          this.$router.push("/welcome", () => {});
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          this.errorMsg = "Failed to log in ";
        });
    },
  },
  computed: {
    isValid() {
      //console.log(this.valid)
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