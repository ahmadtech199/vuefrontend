<template>
  <v-app-bar app flat>
    <v-toolbar-title>
      <v-btn to="/" class="ma-2" tile large color="teal" icon>
        <v-icon color="black">mdi-vuetify</v-icon>
      </v-btn>
      <span>Vuetify</span>
      <span class="grey--text font-weight-light">MATERIAL</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/">
      <span class="mr-2">Home</span>
    </v-btn>
    <v-btn text to="/profile">
      <span class="mr-2">Profile</span>
    </v-btn>
    <v-btn text v-for="(menu,index) in menus" :key="index" :to="{name:menu.route}">{{menu.name}}</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    token: null,
    menus: [],
    noAuthMenu: [
      { name: "Register", route: "register" },
      { name: "Login", route: "login" }
    ],
    authMenu: [{ name: "Logout", route: "logout" }]
  }),

  methods: {
    onLoggedIn() {
      this.menus = this.authMenu;
    },
    onLogout() {
      this.menus = this.noAuthMenu;
    }
  },
  mounted() {
    // check User Status;
    if (token) {
      this.onLoggedIn();
    }
  },
  created() {
    this.menus = this.noAuthMenu;
    Bus.$on("loggedIn", () => {
      this.onLoggedIn();
    });

    Bus.$on("logout", () => {
      this.onLogout();
    });
  }
};
</script>

<style>
</style>