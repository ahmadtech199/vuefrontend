<template>
  <v-container>
    <div></div>

    <v-card flat class="white mx-auto mt-5 pb-1" width="900">
      <div>
        <v-alert
          v-model="alert"
          prominent
          :dismissible="dismissible ? dismissible : ''"
          type="success"
          v-if="msgupdate"
        >{{ msgupdate }}</v-alert>
      </div>
      <v-card-title>
        <h1 class="grey--text display-1">Profile</h1>
      </v-card-title>

      <v-form>
        <v-card-text>
          <v-text-field label="name" type="text" prepend-icon="person" v-model="name"></v-text-field>
          <v-text-field label="email" type="text" prepend-icon="email" v-model="email"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn
            depressed
            color="info ml-3"
            @click.prevent="preformUpdate"
            :loading="loading"
          >Update</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  // props: {user},
  data: () => ({
    name: "",
    email: "",
    msgupdate: "",
    loading: false,
    dismissible: true,
    token: "",
    alert: false
  }),
  created() {
    // show user and token in localstorge

    this.token = localStorage.getItem("token");
    this.name = localStorage.getItem("name");
    this.email = localStorage.getItem("email");

  },

  methods: {
    preformUpdate: function() {
      this.loading = true;
      this.msgupdate = "Updated your profile";

      this.alert = true;
      axios
        .patch("/profile", {
          email: this.email,
          name: this.name
        })
        .then(response => {
          this.name = localStorage.setItem("name", response.data.user.name);
          this.email = localStorage.setItem("email", response.data.user.email);
          this.name = localStorage.getItem("name");
          this.email = localStorage.getItem("email");
          this.loading = false;
        })
        .catch(error => {
          // console.log(error);
          this.error = error.message;
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
</style>