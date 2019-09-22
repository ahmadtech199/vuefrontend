<template>
  <v-container>
    <v-card flat class="white mx-auto mt-5 pb-1" width="900">
      <div>
        <v-alert
          v-model="alert"
          prominent
          type="warning"
          dismissible
          v-if="error"
        >{{error}}</v-alert>
      </div>

      <v-form>
        <v-card-title>
          <h1 class="grey--text display-1">Login</h1>
        </v-card-title>
        <v-card-text>
          <v-text-field label="email" type="text" v-model="email" prepend-icon="person">{{email}}</v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            prepend-icon="lock"
          >{{password}}</v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn
            depressed
            color="info ml-3"
            @click.prevent="preformLogin"
            :loading="loading"
          >Login</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    email: "",
    password: "",
    error: "",
    loading: false,
    alert: false
  }),

  methods: {
    preformLogin: function() {
      this.loading = true;
      this.alert = true
      axios
        .post("/login", {
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
          const email = localStorage.setItem("email", response.data.user.email);

          this.loading = false;

          window.isSignedIn = true;
          Bus.$emit("loggedIn");
          this.$router.push("/profile");
          this.loading = false;

          // store user and token in localstorge
        })
        .catch(error => {
          this.error = error.message;
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
</style>