<template>
  <v-container class="container">
    <v-form>
      <v-row class="left">
        <v-col cols="12" sm="3"><v-subheader>이메일 *</v-subheader></v-col>
        <v-col cols="12" sm="9">
          <v-text-field v-model="email" :rules="emailRules" required outlined class="left">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="left">
        <v-col cols="12" sm="3"><v-subheader class="left">비밀번호 *</v-subheader></v-col>
        <v-col cols="12" sm="9">
          <v-text-field v-model="password" :rules="passwordRules" required outlined> </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-divider></v-divider>
      </v-row>
      <v-row class="left align-center justify-center">
        <v-col cols="12" sm="8">
          <v-subheader class="justify-self-start align-self-start left"
            >아직 회원이 아니신가요?</v-subheader
          >
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn
            class="right"
            to="/signin"
            dark
            color="rgba(0,153,255,0.7"
            :ripple="false"
            v-model="valid"
            >회원가입</v-btn
          >
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn
            class="right"
            @click="submit"
            dark
            color="rgba(0,153,255,0.7"
            :ripple="false"
            v-model="valid"
            >로그인</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'login',
  data: () => ({
    valid: false,

    firstname: '',
  }),
  methods: {
    submit: () => {
      alert(this.firstname, this.email, this.password);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
}
.right {
  float: right !important;
}
.left {
  text-align: left;
}
</style>
