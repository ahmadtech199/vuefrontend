<template>
  <v-container>
    <v-card flat class="white mx-auto mt-5 pb-1" width="900">
      <div>
        <v-alert
          prominent
          type="warning"
          dismissible
          v-model="alert"
          v-if="rightLogin"
        >{{rightLogin}}</v-alert>
      </div>
      <v-card-title>
        <h1 class="grey--text display-1">Register</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="name" type="text" prepend-icon="person" v-model="name">{{name}}</v-text-field>
          <v-text-field label="email" type="text" prepend-icon="email" v-model="email">{{email}}</v-text-field>
          <v-text-field
            label="Password"
            type="password"
            prepend-icon="lock"
            v-model="password"
          >{{password}}</v-text-field>
          <v-text-field
            label="Confirm Password"
            type="password"
            prepend-icon="lock"
            v-model="confirm"
          >{{confirm}}</v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          depressed
          color="info ml-3"
          @click.prevent="preformRegister"
          :loading="loading"
        >Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
    rightLogin: "",
    loading: false,
  }),
  methods: {
    preformRegister() {
      this.loading = true;

      if (this.confirm == this.password) {
        // (this.name = name), (this.email = email), (this.password = password);
        console.log(
          `hello ${this.name} and ${this.email} and  ${this.password}`
        );
        axios
          .post("/register", {
            name: this.name,
            email: this.email,
            password: this.password
          })
          .then(response => {
            console.log(response.data);
            const token = localStorage.setItem(
              "token",
              response.data.access_token
            );
            const user = localStorage.setItem("user", response.data.user);
            const name = localStorage.setItem("name", response.data.user.name);
            const email = localStorage.setItem(
              "email",
              response.data.user.email
            );

            Bus.$emit("loggedIn");
            window.isSignedIn = true;
            this.$router.push("/profile");
            this.loading = false;

            // store user and token in localstorge
          })
          .catch(error => {
            // console.log(error);
            this.error = error.message;
          });
      } else {
        this.rightLogin = "This confirm password not equal password ";
      }
    }
  }
};
</script>

<style scoped>
/* .background {
  background-color: #eeeeee;
} */
</style>