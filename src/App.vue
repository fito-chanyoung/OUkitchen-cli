<template>
  <v-app id="app">
    <v-main>
      <navigator v-bind:isLogin="isLogin" v-on:logout="onLogOut" />
      <router-view
        v-on:login="onLogin"
        v-bind:isLogin="isLogin"
        v-bind:email="email"
      />
    </v-main>
  </v-app>
</template>
<script>
import navigator from "./components/Navigator.vue";

export default {
  data: function() {
    return {
      isLogin: false,
      email: null,
    };
  },
  components: {
    navigator,
  },
  mounted() {
    try {
      let email = sessionStorage.getItem("login");

      if (email) {
        this.isLogin = true;
        this.email = email;
      }
    } catch {
      this.isLogin = false;
    }
  },
  methods: {
    onLogin: function(email) {
      sessionStorage.setItem("login", email);
      this.email = email;
      this.isLogin = true;
    },
    onLogOut: function() {
      alert("logout");
      sessionStorage.removeItem("login");
      this.isLogin = false;
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
