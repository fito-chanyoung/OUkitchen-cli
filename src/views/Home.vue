<template>
  <v-container min-height="100%" class="container home">
    <v-carousel max-width="100%" class="align-self-center">
      <v-carousel-item eager>
        <v-img> </v-img>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'App',
  components: {},
  methods: {},
  mounted() {
    this.$loadScript('https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js')
      .then(() => {
        // Script is loaded, do something
        // eslint-disable-next-line
        const naverLogin = new naver.LoginWithNaverId({
          clientId: 'SOZDf5zOJC5AR1Fgllv5',
          callbackUrl: 'http://localhost:8080/#/call_back',
          isPopup: false,
          loginButton: {
            color: 'green',
            type: 3,
            height: 60,
          },
        });
        naverLogin.init();
        // eslint-disable-next-line
        console.log(naverLogin);
      })
      .catch(() => {
        // Failed to fetch script
      });
  },
};
</script>

<style scoped>
.container {
  max-width: 1140px;
}
.home {
  border: 1px solid black;
}
</style>
