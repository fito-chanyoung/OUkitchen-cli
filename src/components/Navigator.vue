<template>
  <v-container fluid class="px-10">
    <v-row>
      <v-col>
        <v-toolbar text depressed flat class="">
          <v-flex>
            <v-toolbar-title class="align-center justify-center">
              <v-btn text depressed to="/">
                OUkitchen
              </v-btn>
            </v-toolbar-title>
          </v-flex>
          <v-spacer></v-spacer>
          <v-toolbar-items class="align-center justify-center">
            <v-flex flat depressed>
              <v-btn
                v-for="(menu, i) in menus"
                :key="i"
                :to="menu.link"
                text
                depressed
                :ripple="false"
                class="align-center justify-center"
              >
                {{ menu.title }}
              </v-btn>
            </v-flex>
          </v-toolbar-items>
        </v-toolbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'navigator',
  data: () => ({
    drawer: null,

    menus: [
      {
        link: '/map',
        title: '주방 찾기',
      },
      {
        link: '/property',
        title: '주방 공유하기',
      },
      {
        link: '/login',
        title: '로그인',
      },
    ],
  }),
};
</script>
<style scoped>
.theme--light.v-btn--active:hover::before,
.theme--light.v-btn--active::before {
  opacity: 0 !important;
}
</style>
