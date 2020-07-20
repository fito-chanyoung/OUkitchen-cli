<template>
  <v-app id="app">
    <v-main>
      <navigator v-bind:isLogin="isLogin" v-on:logout="onLogOut" />

      <router-view v-on:login="onLogin" v-bind:isLogin="isLogin" v-bind:email="email" />
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
      renderMap: false
    };
  },
  components: {
    navigator
  },
  mounted() {
    let script = document.createElement("script");

    script.setAttribute(
      "src",
      `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_KAKAO_KEY}&libraries=services,clusterer,drawing`
    );
    document.head.appendChild(script);

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
    handleClicked: function(flag) {
      console.log(flag);
      if (flag) this.renderMap = true;
      else this.renderMap = false;
    },
    onLogin: function(email) {
      sessionStorage.setItem("login", email);
      this.email = email;
      this.isLogin = true;
    },
    onLogOut: function() {
      alert("logout");
      sessionStorage.removeItem("login");
      this.isLogin = false;
    }
  },
  watch: {
    $route(to) {
      if (to.path.indexOf("map") !== -1) this.renderMap = true;
      else this.renderMap = false;
    }
  }
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
